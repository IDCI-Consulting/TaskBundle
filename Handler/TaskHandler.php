<?php

namespace IDCI\Bundle\TaskBundle\Handler;

use IDCI\Bundle\TaskBundle\Document\Task;
use IDCI\Bundle\TaskBundle\Factory\TaskFactory;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Doctrine\ODM\MongoDB\DocumentManager;
use IDCI\Bundle\TaskBundle\Event\TaskEvent;

class TaskHandler
{
    /**
     * @var TaskFactory
     */
    protected $taskFactory;

    /**
     * @var DocumentManager
     */
    protected $documentManager;

    /**
     * @var EventDispatcherInterface
     */
    protected $dispatcher;

    /**
     * Constructor.
     *
     * @param TaskFactory              $taskFactory
     * @param DocumentManager          $documentManager
     * @param EventDispatcherInterface $dispatcher
     */
    public function __construct(
        TaskFactory              $taskFactory,
        DocumentManager          $documentManager,
        EventDispatcherInterface $dispatcher
    ) {
        $this->taskFactory     = $taskFactory;
        $this->documentManager = $documentManager;
        $this->dispatcher      = $dispatcher;
    }

    /**
     * Handle a task
     *
     * @param array $options
     */
    public function execute($options) {
        $task = $this->taskFactory->create($options);

        $this->documentManager->persist($task);
        $this->documentManager->flush();

        // Dispatch event with created task.
        $this->dispatcher->dispatch(
            Task::CREATED,
            new TaskEvent($task)
        );
    }
}
