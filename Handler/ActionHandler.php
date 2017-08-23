<?php

/**
 * @author Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Handler;

use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use OldSound\RabbitMqBundle\RabbitMq\ProducerInterface;
use Psr\Log\LoggerInterface;
use IDCI\Bundle\TaskBundle\Action\ActionRegistry;
use IDCI\Bundle\TaskBundle\Document\Task;
use IDCI\Bundle\TaskBundle\Event\TaskEvent;
use IDCI\Bundle\TaskBundle\Event\TaskEvents;
use IDCI\Bundle\TaskBundle\Monolog\Processor\TaskLogProcessor;

/**
 * Class ActionHandler.
 *
 * This class execute an action.
 */
class ActionHandler
{
    /** @var ActionRegistry */
    protected $registry;

    /** @var EventDispatcherInterface */
    protected $dispatcher;

    /** @var \Twig_Environment */
    protected $merger;

    /** @var ProducerInterface */
    protected $actionProducer;

    /** @var WorkflowHandler */
    protected $workflowHandler;

    /** @var LoggerInterface */
    protected $logger;

    /** @var TaskLogProcessor */
    protected $taskLogProcessor;

    /**
     * Constructor.
     *
     * @param ProducerInterface $actionProducer
     * @param ActionRegistry    $registry
     * @param \Twig_Environment $merger
     * @param ProducerInterface $actionProducer
     * @param WorkflowHandler   $workflowHandler
     * @param LoggerInterface   $logger
     * @param TaskLogProcessor  $taskLogProcessor
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
        $currentAction = $task->getConfiguration()->getAction($task->getCurrentAction()->getName());

        // Merge the data with action configuration
        $parameters = $this->merge(
            $currentAction['parameters'],
            $task->getData()->getExtractedData(),
            $task->getData()->getActionData()
        );

        // Task running event.
        $this->dispatcher->dispatch(
            TaskEvents::RUNNING,
            new TaskEvent($task)
        );

        try {
            $currentActionData = $this->registry->getAction($currentAction['action'])->execute($task, $parameters);
        } catch(\Exception $e) {
            $this->taskLogProcessor->setTask($task);
            $this->logger->error($e->getMessage());

            $this->dispatcher->dispatch(
                TaskEvents::ERROR,
                new TaskEvent($task)
            );

            return;
        }


        // Add new action data
        $actionData = array_merge(
            $task->getData()->getActionData(),
            array($currentAction['name'] => $currentActionData)
        );
        $task->getData()->setActionData($actionData);

        $this->dispatcher->dispatch(
            TaskEvents::PASSED,
            new TaskEvent($task)
        );

        if (!$this->workflowHandler->isTaskFinished($task)) {
            $nextAction = $this->workflowHandler->getNextAction($task);
            $task->addAction($nextAction);

            $this->dispatcher->dispatch(
                TaskEvents::PENDING,
                new TaskEvent($task)
            );

            $this->actionProducer->publish(serialize(array('task_id' => $task->getId())));
        }
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
