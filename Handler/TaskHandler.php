<?php

namespace IDCI\Bundle\TaskBundle\Handler;

use OldSound\RabbitMqBundle\RabbitMq\ProducerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Doctrine\ODM\MongoDB\DocumentManager;
use IDCI\Bundle\TaskBundle\Entity\TaskConfiguration;
use IDCI\Bundle\TaskBundle\Document\Task;
use IDCI\Bundle\TaskBundle\Document\TaskData;
use IDCI\Bundle\TaskBundle\Document\Configuration;
use IDCI\Bundle\TaskBundle\Document\Action;
use IDCI\Bundle\TaskBundle\Document\ActionStatus;
use IDCI\Bundle\TaskBundle\Event\TaskEvent;
use IDCI\Bundle\TaskBundle\Event\TaskEvents;

class TaskHandler
{
    /** @var DocumentManager */
    protected $documentManager;

    /** @var EventDispatcherInterface */
    protected $dispatcher;

    /**
     * Constructor.
     *
     * @param DocumentManager          $documentManager,
     * @param EventDispatcherInterface $dispatcher
     */
    public function __construct(
        DocumentManager          $documentManager,
        EventDispatcherInterface $dispatcher
    ) {
        $this->documentManager = $documentManager;
        $this->dispatcher = $dispatcher;
    }

    /**
     * Execute a task.
     *
     * @param TaskConfiguration $taskConfiguration
     * @param mixed             $extractData
     * @param array             $actionData
     */
    public function execute(
        TaskConfiguration $taskConfiguration,
        $extractedData = array(),
        array $actionData = array()
    ) {
        $task = self::createTask($taskConfiguration, $extractedData, $actionData);

        $this->documentManager->persist($task);
        $this->documentManager->flush();

        // Dispatch event with created task.
        $this->dispatcher->dispatch(
            TaskEvents::CREATED,
            new TaskEvent($task)
        );
    }

    /**
     * Create a task.
     *
     * @param TaskConfiguration $taskConfiguration
     * @param array             $extractData
     * @param array             $actionData
     *
     * @return Task
     */
    public static function createTask(
        TaskConfiguration $taskConfiguration,
        array $extractedData = array(),
        array $actionData = array()
    ) {
        $workflow = json_decode($taskConfiguration->getWorkflow(), true);

        $taskData = new TaskData();
        $taskData
            ->setExtractedData($extractedData)
            ->setActionData($actionData)
        ;


        $configuration = new Configuration();
        $configuration
            ->setWorkflow($workflow['workflow'])
            ->setActions($workflow['actions'])
        ;

        $actionStatus = new ActionStatus();
        $actionStatus
            ->setStatus(TaskEvents::PENDING)
            ->setDate(new \DateTime())
        ;

        $action = new Action();
        $action
            ->setName($configuration->getFirstAction())
            ->addStatus($actionStatus)
        ;

        $task = new Task();
        $task
            ->addAction($action)
            ->setData($taskData)
            ->setConfiguration($configuration)
            ->setTaskConfigurationId($taskConfiguration->getId())
        ;

        return $task;
    }
}
