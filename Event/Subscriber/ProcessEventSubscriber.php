<?php

namespace IDCI\Bundle\TaskBundle\Event\Subscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Doctrine\ODM\MongoDB\DocumentManager;
use OldSound\RabbitMqBundle\RabbitMq\ProducerInterface;
use IDCI\Bundle\TaskBundle\Event\PostEvents;
use IDCI\Bundle\TaskBundle\Document\Task;
use IDCI\Bundle\TaskBundle\Document\ActionStatus;
use IDCI\Bundle\TaskBundle\Processor\ProcessorInterface;

class PostEventSubscriber implements EventSubscriberInterface
{
    /**
     * @var ProcessorInterface
     */
    protected $processor;

    /**
     * Constructor
     *
     * @param ProcessorInterface $processor
     */
    public function __construct(
        ProducerInterface $processor
    ) {
        $this->processor = $processor;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return array(
            ProcessEvents::POST => array(
                array('onPostProcessEvent'),
            ),
        );
    }

    /**
     * On post process event.
     *
     * @param PostEvent $event
     */
    public function onPostProcessEvent(PostEvent $event)
    {
        $processKey = $event->getProcessKey();
        $configuration = $event->getConfiguration();

        foreach ($configuration->getPostActions() as $actionName) {
            $action = $configuration->getAction($actionName);

            $this->processor->startTask($action['service'], array_merge(
                $action['parameters'],
                array('process_key' => $event->getProcessKey()),
            ));
        }
    }
}
