<?php

namespace IDCI\Bundle\TaskBundle\Handler;

use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Doctrine\ODM\MongoDB\DocumentManager;
use IDCI\Bundle\TaskBundle\Document\Task;
use IDCI\Bundle\TaskBundle\Event\TaskEvent;
use IDCI\Bundle\TaskBundle\Factory\TaskFactory;

class TaskHandler
{
    /**
     * @var TaskFactory
     */
    protected $taskFactory;

    /**
     * @var Task
     */
    protected $task;

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
        $this->taskFactory = $taskFactory;
        $this->documentManager = $documentManager;
        $this->dispatcher = $dispatcher;
    }

    /**
     * Handle a task.
     *
     * @param array $options
     */
    public function execute($options)
    {
        $this->task = $this->taskFactory->create($options);

        $this->saveTask();

        $this->dispatchCreatedTaskEvent();
    }

    private function dispatchCreatedTaskEvent()
    {
        // Dispatch event with created task.
        $this->dispatcher->dispatch(
            Task::CREATED,
            new TaskEvent($this->task)
        );
    }

    private function saveTask()
    {
        $this->documentManager->persist($this->task);
        $this->flushAndClearDocumentManager();
    }

    private function flushAndClearDocumentManager()
    {
        $this->documentManager->flush();
        $this->documentManager->clear(Task::class);
    }
}
