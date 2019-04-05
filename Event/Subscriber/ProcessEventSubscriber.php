<?php

namespace IDCI\Bundle\TaskBundle\Event\Subscriber;

use IDCI\Bundle\TaskBundle\Event\ProcessEvent;
use IDCI\Bundle\TaskBundle\Event\ProcessEvents;
use IDCI\Bundle\TaskBundle\Processor\ProcessorInterface;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class ProcessEventSubscriber implements EventSubscriberInterface
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
    public function __construct(ProcessorInterface $processor)
    {
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
    public function onPostProcessEvent(ProcessEvent $event)
    {
        $processKey = $event->getProcessKey();
        $configuration = $event->getConfiguration();
        $slug = $event->getTaskConfigurationSlug();
        $source = $event->getSource();

        foreach ($configuration->getPostActions() as $actionName) {
            $action = $configuration->getAction($actionName);

            $this->processor->startTask(
                $action['service'],
                array_merge(
                    $action['parameters'],
                    array('process_key' => $processKey, 'task_configuration_slug' => $slug)
                ),
                $source
            );
        }
    }
}
