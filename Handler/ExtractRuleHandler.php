<?php

namespace IDCI\Bundle\TaskBundle\Handler;

use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use OldSound\RabbitMqBundle\RabbitMq\ProducerInterface;
use Ramsey\Uuid\Uuid;
use IDCI\Bundle\TaskBundle\Model\AbstractTaskConfiguration;
use IDCI\Bundle\TaskBundle\Event\DataExtractedEvent;
use IDCI\Bundle\TaskBundle\ExtractRule\ExtractRuleRegistry;
use IDCI\Bundle\TaskBundle\ExtractRule\ExtractRuleInterface;

class ExtractRuleHandler
{
    /**
     * @var ExtractRuleRegistry
     */
    protected $registry;

    /**
     * @var EventDispatcherInterface
     */
    protected $dispatcher;

    /**
     * @var ProducerInterface
     */
    protected $extractRuleProducer;

    /**
     * @var string
     */
    protected $applicationName;

    /**
     * @var array
     */
    protected $extractedData = array();

    /**
     * @var array
     */
    protected $extractRuleConfiguration = array();

    /**
     * Constructor.
     *
     * @param ExtractRuleRegistry      $registry
     * @param EventDispatcherInterface $dispatcher
     * @param ProducerInterface        $extractRuleProducer
     * @param string                   $applicationName
     */
    public function __construct(
        ExtractRuleRegistry      $registry,
        EventDispatcherInterface $dispatcher,
        ProducerInterface        $extractRuleProducer,
                                 $applicationName
    ) {
        $this->registry = $registry;
        $this->dispatcher = $dispatcher;
        $this->extractRuleProducer = $extractRuleProducer;
        $this->applicationName = $applicationName;
    }

    /**
     * Execute all extract rules and log for each
     *
     * @param AbstractTaskConfiguration $taskConfiguration
     * @param int                       $offset
     * @param string                    $processKey
     */
    public function execute(AbstractTaskConfiguration $taskConfiguration, $offset = 0, $processKey = null)
    {
        $this->extractRuleConfiguration = json_decode($taskConfiguration->getExtractRule(), true);

        $extractRule = $this->registry->getRule($this->extractRuleConfiguration['service']);
        $extractRule->setParameters($this->extractRuleConfiguration['parameters']);

        $totalCount = $extractRule->getTotalCount();

        if (null === $processKey) {
            $processKey = Uuid::uuid1()->toString();
        }

        $offset += $this->processExtraction($extractRule, $offset);
        $this->dispatchDataExtractedEvent($taskConfiguration, $totalCount, $processKey);

        $this->garbageCollect();

        if ($offset < $totalCount) {
            $this->reEnqueue($taskConfiguration, $offset, $processKey);
        }
    }

    /**
     * Process data extraction
     *
     * @param ExtractRuleInterface $extractRule
     * @param int                  $offset
     *
     * @return int                 Count of extracted data.
     */
    public function processExtraction(ExtractRuleInterface $extractRule, $offset)
    {
        $this->extractedData = $extractRule->extract($offset);

        return sizeof($this->extractedData);
    }

    /**
     * Dispatch data extracted event.
     *
     * @param AbstractTaskConfiguration $taskConfiguration
     * @param int                       $totalCount
     * @param string                    $processKey
     */
    private function dispatchDataExtractedEvent(AbstractTaskConfiguration $taskConfiguration, $totalCount, $processKey)
    {
        $this->dispatcher->dispatch(
            DataExtractedEvent::NAME,
            new DataExtractedEvent($taskConfiguration, $this->extractedData, $totalCount, $processKey)
        );
    }

    /**
     * Clear batch data and let GC do the memory job.
     */
    private function garbageCollect()
    {
        unset($this->extractedData);
        unset($this->extractRuleConfiguration);

        if (gc_enabled()) {
            gc_collect_cycles();
        }

        // @see <https://stackoverflow.com/a/13461577/4042587>
        time_nanosleep(0, 10000000);
    }

    /**
     * Dispatch data extracted event.
     *
     * @param AbstractTaskConfiguration $taskConfiguration
     * @param int                       $offset
     * @param string                    $processKey
     */
    private function reEnqueue(AbstractTaskConfiguration $taskConfiguration, $offset, $processKey)
    {
        $this->extractRuleProducer->publish(
            serialize(array(
                'task_configuration' => $taskConfiguration,
                'offset' => $offset,
                'process_key' => $processKey,
            )),
            $this->applicationName
        );
    }
}
