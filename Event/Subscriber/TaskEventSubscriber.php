<?php

namespace IDCI\Bundle\TaskBundle\Event\Subscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use Doctrine\ODM\MongoDB\DocumentManager;
use OldSound\RabbitMqBundle\RabbitMq\ProducerInterface;
use IDCI\Bundle\TaskBundle\Event\TaskEvent;
use IDCI\Bundle\TaskBundle\Event\TaskEvents;
use IDCI\Bundle\TaskBundle\Document\Task;
use IDCI\Bundle\TaskBundle\Document\ActionStatus;

class TaskEventSubscriber implements EventSubscriberInterface
{
    /**
     * @var ProducerInterface
     */
    protected $actionProducer;

    /**
     * @var DocumentManager
     */
    protected $documentManager;

    /**
     * Constructor
     *
     * @param ProducerInterface $actionProducer
     * @param DocumentManager $documentManager
     */
    public function __construct(ProducerInterface $actionProducer, DocumentManager $documentManager)
    {
        $this->actionProducer = $actionProducer;
        $this->documentManager = $documentManager;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return array(
            TaskEvents::CREATED => array(
                array('processTask'),
            ),
            TaskEvents::PENDING => array(
                array('onPendingEvent')
            ),
            TaskEvents::RUNNING => array(
                array('onRunningEvent')
            ),
            TaskEvents::PASSED => array(
                array('onPassedEvent')
            ),
            TaskEvents::ERROR => array(
                array('onErrorEvent')
            ),
        );
    }

    /**
     * Process a task.
     *
     * @param TaskEvent $event
     */
    public function processTask(TaskEvent $event)
    {
        $this->actionProducer->publish(serialize(array('task_id' => $event->getTask()->getId())));
    }

    /**
     * On pending event.
     *
     * @param TaskEvent $event
     */
    public function onPendingEvent(TaskEvent $event)
    {
        $this->updateTaskStatus($event->getTask(), TaskEvents::PENDING);
    }

    /**
     * On running event.
     *
     * @param TaskEvent $event
     */
    public function onRunningEvent(TaskEvent $event)
    {
        $this->updateTaskStatus($event->getTask(), TaskEvents::RUNNING);
    }

    /**
     * On passed event.
     *
     * @param TaskEvent $event
     */
    public function onPassedEvent(TaskEvent $event)
    {
        $this->updateTaskStatus($event->getTask(), TaskEvents::PASSED);
    }

    /**
     * On error event.
     *
     * @param TaskEvent $event
     */
    public function onErrorEvent(TaskEvent $event)
    {
        $this->updateTaskStatus($event->getTask(), TaskEvents::ERROR);
    }

    /**
     * Update task status.
     *
     * @param Task   $task
     * @param string $status
     */
    public function updateTaskStatus(Task $task, $status)
    {
        $actionStatus = new ActionStatus();
        $actionStatus
            ->setDate(new \DateTime())
            ->setStatus($status)
        ;

        $currentAction = $task->getCurrentAction();

        $currentAction->addStatus($actionStatus);
        $this->documentManager->flush();
    }
}
