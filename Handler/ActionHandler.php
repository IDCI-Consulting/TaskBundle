<?php

/**
 * @author Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Handler;

use IDCI\Bundle\TaskBundle\Document\ActionStatus;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use OldSound\RabbitMqBundle\RabbitMq\ProducerInterface;
use Psr\Log\LoggerInterface;
use IDCI\Bundle\TaskBundle\Action\ActionRegistry;
use IDCI\Bundle\TaskBundle\Document\Task;
use IDCI\Bundle\TaskBundle\Event\ProcessEvents;
use IDCI\Bundle\TaskBundle\Event\ProcessEvent;
use IDCI\Bundle\TaskBundle\Event\TaskEvent;
use IDCI\Bundle\TaskBundle\Monolog\Processor\TaskLogProcessor;

/**
 * Class ActionHandler.
 *
 * This class execute an action.
 */
class ActionHandler
{
    /**
     * @var ActionRegistry
     */
    protected $registry;

    /**
     * @var EventDispatcherInterface
     */
    protected $dispatcher;

    /**
     * @var \Twig_Environment
     */
    protected $merger;

    /**
     * @var ProducerInterface
     */
    protected $actionProducer;

    /**
     * @var WorkflowHandler
     */
    protected $workflowHandler;

    /**
     * @var LoggerInterface
     */
    protected $logger;

    /**
     * @var TaskLogProcessor
     */
    protected $taskLogProcessor;

    /**
     * Constructor
     *
     * @param ActionRegistry           $registry
     * @param EventDispatcherInterface $dispatcher
     * @param \Twig_Environment        $merger
     * @param ProducerInterface        $actionProducer
     * @param WorkflowHandler          $workflowHandler
     * @param LoggerInterface          $logger
     * @param TaskLogProcessor         $taskLogProcessor
     */
    public function __construct(
        ActionRegistry           $registry,
        EventDispatcherInterface $dispatcher,
        \Twig_Environment        $merger,
        ProducerInterface        $actionProducer,
        WorkflowHandler          $workflowHandler,
        LoggerInterface          $logger,
        TaskLogProcessor         $taskLogProcessor
    ) {
        $this->registry = $registry;
        $this->dispatcher = $dispatcher;
        $this->merger = $merger;
        $this->actionProducer = $actionProducer;
        $this->workflowHandler = $workflowHandler;
        $this->logger = $logger;
        $this->taskLogProcessor = $taskLogProcessor;
    }

    /**
     * Execute the current task action.
     *
     * @param Task $task
     */
    public function execute(Task $task)
    {
        if ($task->getConfiguration() === null) {
            $currentAction = array(
                'service'    => $task->getCurrentAction()->getName(),
                'name'       => $task->getCurrentAction()->getName(),
                'parameters' => $task->getData()->getExtractedData(),
            );
        } else {
            $currentAction = $task->getConfiguration()->getAction($task->getCurrentAction()->getName());

            if (!array_key_exists('parameters', $currentAction)) {
                $currentAction['parameters'] = array();
            }

            try {
                // Merge the data with action configuration
                $currentAction['parameters'] = $this->merge(
                    $currentAction['parameters'],
                    $task->getData()->getExtractedData(),
                    $task->getData()->getActionData()
                );
            } catch (\Exception $e) {
                $this->setErroredTask($task, sprintf(
                    "There is a problem in your configuration with the following message:\n %s",
                    $e->getMessage()
                ));

                return;
            }
        }

        // Task running event.
        $this->dispatcher->dispatch(
            ActionStatus::RUNNING,
            new TaskEvent($task)
        );

        try {
            $currentActionData = $this
                ->registry
                ->getAction($currentAction['service'])
                ->execute($task, $currentAction['parameters']);
        } catch(\Exception $e) {
            $this->setErroredTask($task, $e->getMessage());

            return;
        }

        $task->getData()->setActionData(
            array_merge(
                $task->getData()->getActionData(),
                array($currentAction['name'] => $currentActionData)
            )
        );

        $this->dispatcher->dispatch(
            ActionStatus::PASSED,
            new TaskEvent($task)
        );

        if (!$this->workflowHandler->isTaskFinished($task)) {
            $nextAction = $this->workflowHandler->getNextAction($task);
            $task->addAction($nextAction);

            $this->dispatcher->dispatch(
                ActionStatus::PENDING,
                new TaskEvent($task)
            );

            $this->actionProducer->publish(
                serialize(array('task_id' => $task->getId())),
                $task->getSource()
            );

            return;
        }

        $this->dispatcher->dispatch(
            Task::ENDED,
            new TaskEvent($task)
        );

        echo "Check process finish\n";
        if ($this->workflowHandler->isProcessFinished($task->getProcessKey())) {
            echo 'yes the process is finished.'."\n";
            $this->dispatcher->dispatch(
                ProcessEvents::POST,
                new ProcessEvent($task->getConfiguration(), $task->getProcessKey())
            );
        }
    }

    /**
     * Set an errored task.
     *
     * @param Task   $task
     * @param string $errorMessage
     */
    private function setErroredTask(Task $task, $errorMessage = '')
    {
        $this->taskLogProcessor->setTask($task);
        $this->logger->error($errorMessage);

        $this->dispatcher->dispatch(
            ActionStatus::ERROR,
            new TaskEvent($task)
        );
    }

    /**
     * Merge parameters with the SecurityContext (user)
     * the navigation flow data (flow_data)
     * and the session (session).
     *
     * @param array $parameters    the parameters
     * @param array $extractedData the extracted data
     * @param array $actionData    the previous actions data
     *
     * @return array
     */
    public function merge(array $parameters = array(), array $extractedData = array(), array $actionData = array())
    {
        foreach ($parameters as $k => $v) {
            $parameters[$k] = $this->mergeValue($v, array(
                'extracted_data' => $extractedData,
                'action_data' => $actionData,
            ));
        }

        return $parameters;
    }

    /**
     * Merge a value.
     *
     * @param mixed $value the value
     * @param array $vars  the merging vars
     *
     * @return mixed the merged value
     */
    private function mergeValue($value, array $vars = array())
    {
        // Handle array case.
        if (is_array($value)) {
            foreach ($value as $k => $v) {
                $value[$k] = $this->mergeValue($v, $vars);
            }

            // Handle object case.
        } elseif (is_object($value)) {
            $class = new \ReflectionClass($value);
            $properties = $class->getProperties();

            foreach ($properties as $property) {
                $property->setAccessible(true);

                $property->setValue(
                    $value,
                    $this->mergeValue(
                        $property->getValue($value),
                        $vars
                    )
                );
            }

            // Handle string case.
        } elseif (is_string($value)) {
            $template = $this->merger->createTemplate($value);
            $value = $template->render($vars);
        }

        return $value;
    }
}
