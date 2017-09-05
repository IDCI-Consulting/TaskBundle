<?php

namespace IDCI\Bundle\TaskBundle\Event\Subscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\GetResponseForExceptionEvent;
use Symfony\Component\HttpKernel\KernelEvents;
use OldSound\RabbitMqBundle\RabbitMq\ProducerInterface;
use IDCI\Bundle\TaskBundle\Event\DataExtractedEvent;

class ExtractedDataSubscriber implements EventSubscriberInterface
{
    /**
     * @var ProducerInterface
     */
    protected $taskProducer;

    /**
     * Constructor.
     *
     * @param ProducerInterface $taskProducer
     */
    public function __construct(ProducerInterface $taskProducer)
    {
        $this->taskProducer = $taskProducer;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return array(
            DataExtractedEvent::NAME => array(
                array('startTasks'),
            )
        );
    }

    /**
     * Start tasks.
     *
     * @param DataExtractedEvent $dataExtractedEvent
     */
    public function startTasks(DataExtractedEvent $dataExtractedEvent)
    {
        $extractedData = is_array($dataExtractedEvent->getData())
            ? $dataExtractedEvent->getData()
            : array(json_decode(json_encode($dataExtractedEvent->getData()), true))
        ;

        foreach ($extractedData as $data) {
            $this->taskProducer->publish(serialize(array(
                'data' => array('extracted_data' => $data),
                'task_configuration_id' => $dataExtractedEvent->getTaskConfiguration()->getId()
            )));
        }
    }
}
