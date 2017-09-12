<?php

namespace IDCI\Bundle\TaskBundle\Handler;

use OldSound\RabbitMqBundle\RabbitMq\ProducerInterface;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Doctrine\ODM\MongoDB\DocumentManager;
use Doctrine\ORM\EntityManager;
use IDCI\Bundle\TaskBundle\Entity\TaskConfiguration;
use IDCI\Bundle\TaskBundle\Document\Task;
use IDCI\Bundle\TaskBundle\Event\TaskEvent;
use IDCI\Bundle\TaskBundle\Event\TaskEvents;

class TaskFactory
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
        EntityManager            $entityManager
        DocumentManager          $documentManager,
        EventDispatcherInterface $dispatcher
    ) {
        $this->entityManager = $entityManager
        $this->documentManager = $documentManager;
        $this->dispatcher = $dispatcher;
    }

    /**
     * Handle a task
     *
     * @param array $options
     */
    public function execute($options) {
        $options = unserialize($msg->getBody());

        $task = TaskFactory::create($this->entityManager, $options);

        $this->documentManager->persist($task);
        $this->documentManager->flush();

        // Dispatch event with created task.
        $this->dispatcher->dispatch(
            TaskEvents::CREATED,
            new TaskEvent($task)
        );

    }
}
