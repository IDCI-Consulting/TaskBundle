<?php

namespace IDCI\Bundle\TaskBundle\Handler;

use IDCI\Bundle\TaskBundle\Document\Task;
use IDCI\Bundle\TaskBundle\Factory\TaskFactory;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Doctrine\ODM\MongoDB\DocumentManager;
use Doctrine\ORM\EntityManager;
use IDCI\Bundle\TaskBundle\Event\TaskEvent;

class TaskHandler
{
    /**
     * @var EntityManager
     */
    protected $entityManager;

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
     * @param EntityManager            $entityManager
     * @param DocumentManager          $documentManager
     * @param EventDispatcherInterface $dispatcher
     */
    public function __construct(
        EntityManager            $entityManager,
        DocumentManager          $documentManager,
        EventDispatcherInterface $dispatcher
    ) {
        $this->entityManager = $entityManager;
        $this->documentManager = $documentManager;
        $this->dispatcher = $dispatcher;
    }

    /**
     * Handle a task
     *
     * @param array $options
     */
    public function execute($options) {
        $task = TaskFactory::create($this->entityManager, $options);

        $this->documentManager->persist($task);
        $this->documentManager->flush();

        // Dispatch event with created task.
        $this->dispatcher->dispatch(
            Task::CREATED,
            new TaskEvent($task)
        );
    }
}
