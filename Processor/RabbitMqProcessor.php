<?php

namespace IDCI\Bundle\TaskBundle\Processor;

use Doctrine\ORM\EntityManager;
use IDCI\Bundle\TaskBundle\Document\ActionStatus;
use OldSound\RabbitMqBundle\RabbitMq\ProducerInterface;
use Doctrine\ODM\MongoDB\DocumentManager;
use IDCI\Bundle\TaskBundle\Document\Task;
use IDCI\Bundle\TaskBundle\Entity\TaskConfiguration;

class RabbitMqProcessor implements ProcessorInterface
{
    /**
     * @var ProducerInterface
     */
    private $extractRuleProducer;

    /**
     * @var ProducerInterface
     */
    private $taskProducer;

    /**
     * @var ProducerInterface
     */
    private $actionProducer;

    /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * @var string
     */
    private $applicationName;

    /**
     * Constructor
     *
     * @param ProducerInterface $extractRuleProducer
     * @param ProducerInterface $taskProducer
     * @param ProducerInterface $actionProducer
     * @param EntityManager $entityManager
     * @param DocumentManager $documentManager
     * @param string $applicationName
     */
    public function __construct(
        ProducerInterface $extractRuleProducer,
        ProducerInterface $taskProducer,
        ProducerInterface $actionProducer,
        EntityManager     $entityManager,
        DocumentManager   $documentManager,
        $applicationName
    ) {
        $this->extractRuleProducer = $extractRuleProducer;
        $this->taskProducer        = $taskProducer;
        $this->actionProducer      = $actionProducer;
        $this->entityManager       = $entityManager;
        $this->documentManager     = $documentManager;
        $this->applicationName     = $applicationName;
    }

    /**
     * {@inheritdoc}
     */
    public function startTasks(TaskConfiguration $taskConfiguration)
    {
        $this->extractRuleProducer->publish(
            serialize(array('task_configuration_id' => $taskConfiguration->getId())),
            $this->applicationName
        );
    }

    /**
     * {@inheritdoc}
     */
    public function startTask($actionService, $data = array())
    {
        $this->taskProducer->publish(
            serialize(array(
                'action_service' => $actionService,
                'data' => $data
            )),
            $this->applicationName
        );
    }

    /**
     * Resume task
     *
     * @throws
     *
     * @param Task $task
     */
    public function resume(Task $task)
    {
        if ($task->getStatus() !== ActionStatus::ERROR) {
            throw new \Exception('You can only resume a task that failed');
        }

        // If the task is bound to a configuration, reload it in the task in case the configuration was updated
        if ($task->getTaskConfigurationId()) {
            $this->reloadTaskConfiguration($task);
        }

        $task->getCurrentAction()->addStatus(ActionStatus::PENDING);
        $this->documentManager->flush();

        $this->actionProducer->publish(
            serialize(array(
                'task_id' => $task->getId(),
            )),
            $task->getSource()
        );
    }

    private function reloadTaskConfiguration(Task $task)
    {
        $taskConfiguration = $this
            ->entityManager
            ->getRepository('IDCITaskBundle:TaskConfiguration')
            ->find($task->getTaskConfigurationId())
        ;
        $workflow = json_decode($taskConfiguration->getWorkflow(), true);

        if ($workflow['workflow'] !== $task->getConfiguration()->getWorkflow() ||
            $workflow['actions']  !== $task->getConfiguration()->getActions()
        ) {
            $task->getConfiguration()
                ->setWorkflow($workflow['workflow'])
                ->setActions($workflow['actions'])
            ;

            $this->documentManager->flush();
        }
    }
}
