<?php

namespace IDCI\Bundle\TaskBundle\Event\Subscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Doctrine\ODM\MongoDB\DocumentManager;
use OldSound\RabbitMqBundle\RabbitMq\ProducerInterface;
use IDCI\Bundle\TaskBundle\Event\TaskEvent;
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
            Task::CREATED => array(
                array('processTask'),
            ),
            Task::ENDED => array(
                array('finishTask'),
            ),
            ActionStatus::PENDING => array(
                array('onPendingEvent')
            ),
            ActionStatus::RUNNING => array(
                array('onRunningEvent')
            ),
            ActionStatus::PASSED => array(
                array('onPassedEvent')
            ),
            ActionStatus::ERROR => array(
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
        $this->actionProducer->publish(
            serialize(array('task_id' => $event->getTask()->getId())),
            $event->getTask()->getSource()
        );
    }

    /**
     * Finish a task.
     *
     * @param Task $task
     */
    public function finishTask(TaskEvent $event)
    {
        $event->getTask()->setEndedAt(new \Datetime('now'));

        $this->documentManager->flush();
    }

    /**
     * On pending event.
     *
     * @param TaskEvent $event
     */
    public function onPendingEvent(TaskEvent $event)
    {
        $this->updateTaskStatus($event->getTask(), ActionStatus::PENDING);
    }

    /**
     * On running event.
     *
     * @param TaskEvent $event
     */
    public function onRunningEvent(TaskEvent $event)
    {
        $this->updateTaskStatus($event->getTask(), ActionStatus::RUNNING);
    }

    /**
     * On passed event.
     *
     * @param TaskEvent $event
     */
    public function onPassedEvent(TaskEvent $event)
    {
        $this->updateTaskStatus($event->getTask(), ActionStatus::PASSED);
    }

    /**
     * On error event.
     *
     * @param TaskEvent $event
     */
    public function onErrorEvent(TaskEvent $event)
    {
        $this->updateTaskStatus($event->getTask(), ActionStatus::ERROR);
    }

    /**
     * Update task status.
     *
     * @param Task   $task
     * @param string $status
     */
    public function updateTaskStatus(Task $task, $status)
    {
        $currentAction = $task->getCurrentAction();
        $currentAction->addStatus($status);

        $this->documentManager->flush();
    }
}
