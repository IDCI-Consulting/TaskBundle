<?php

namespace IDCI\Bundle\TaskBundle\Event\Subscriber;

use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use OldSound\RabbitMqBundle\RabbitMq\ProducerInterface;
use Ramsey\Uuid\Uuid;
use IDCI\Bundle\TaskBundle\Event\DataExtractedEvent;

class ExtractedDataSubscriber implements EventSubscriberInterface
{
    /**
     * @var ProducerInterface
     */
    protected $taskProducer;

    /**
     * @var string
     */
    protected $applicationName;

    /**
     * Constructor.
     *
     * @param ProducerInterface $taskProducer
     * @param string            $applicationName
     */
    public function __construct(ProducerInterface $taskProducer, $applicationName)
    {
        $this->taskProducer = $taskProducer;
        $this->applicationName = $applicationName;
    }

    /**
     * {@inheritdoc}
     */
    public static function getSubscribedEvents()
    {
        return array(
            DataExtractedEvent::NAME => array(
                array('startTasks'),
            ),
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
            : array(json_decode(json_encode($dataExtractedEvent->getData()), true));

        $processKey = Uuid::uuid1()->toString();
        $taskCount = sizeof($extractedData);

        foreach ($extractedData as $data) {
            $this->taskProducer->publish(
                serialize(array(
                    'data' => array('extracted_data' => $data),
                    'task_configuration' => $dataExtractedEvent->getTaskConfiguration(),
                    'process_key' => $processKey,
                    'task_count' => $taskCount,
                )),
                $this->applicationName
            );
        }
    }
}
