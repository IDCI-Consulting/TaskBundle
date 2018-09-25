<?php

namespace IDCI\Bundle\TaskBundle\Handler;

use IDCI\Bundle\TaskBundle\Event\DataExtractedEvent;
use IDCI\Bundle\TaskBundle\ExtractRule\ExtractRuleInterface;
use IDCI\Bundle\TaskBundle\ExtractRule\ExtractRuleRegistry;
use IDCI\Bundle\TaskBundle\Model\AbstractTaskConfiguration;
use OldSound\RabbitMqBundle\RabbitMq\ProducerInterface;
use Ramsey\Uuid\Uuid;
use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

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
     * @param bool                      $reQueue
     * @param int                       $offset
     * @param string                    $processKey
     */
    public function execute(
        AbstractTaskConfiguration $taskConfiguration,
        $reEnqueue,
        $offset = 0,
        $processKey = null,
        $totalCount = 0
    ) {
        $this->extractRuleConfiguration = json_decode($taskConfiguration->getExtractRule(), true);

        $extractRule = $this->registry->getRule($this->extractRuleConfiguration['service']);

        $resolver = new OptionsResolver();
        $extractRule->configureParameters($resolver);
        $parameters = $resolver->resolve($this->extractRuleConfiguration['parameters']);

        if (null === $processKey) {
            $processKey = Uuid::uuid1()->toString();
        }

        if (!$extractRule->isSynchronous() && !$reEnqueue) {
            $this->processBatch($taskConfiguration, $extractRule, $parameters, $processKey);

            return;
        }

        if (0 === $totalCount) {
            $totalCount = $extractRule->getTotalCount($parameters);
        }

        $this->extractedData = $extractRule->extract($parameters, $offset);
        $this->dispatchDataExtractedEvent($taskConfiguration, $totalCount, $processKey);
        $this->garbageCollect();
    }

    /**
     * Process data extraction
     *
     * @param ExtractRuleInterface $extractRule
     * @param int                  $offset
     *
     * @return int                 Count of extracted data.
     */
    public function processExtraction(ExtractRuleInterface $extractRule, array $parameters, $offset = 0)
    {
        $this->extractedData = $extractRule->extract($parameters, $offset);
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

        // @see <https://stackoverflow.com/a/13461577/4042587>
        time_nanosleep(0, 10000000);

        if (gc_enabled()) {
            gc_collect_cycles();
        }
    }

    private function processBatch($taskConfiguration, $extractRule, $parameters, $processKey)
    {
        $offset = 0;
        $totalCount = $extractRule->getTotalCount($parameters);
        $batchSize = $extractRule->getBatchSize();

        $batchCount = ceil($totalCount / $batchSize);

        for ($i = 0; $i < $batchCount; $i++) {
            $this->reEnqueue($taskConfiguration, $offset, $processKey, $totalCount);

            $offset += $batchSize;
        }
    }

    /**
     * Dispatch data extracted event.
     *
     * @param AbstractTaskConfiguration $taskConfiguration
     * @param int                       $offset
     * @param string                    $processKey
     */
    private function reEnqueue(AbstractTaskConfiguration $taskConfiguration, $offset, $processKey, $totalCount)
    {
        $this->extractRuleProducer->publish(
            serialize(array(
                'task_configuration' => $taskConfiguration,
                'offset' => $offset,
                'process_key' => $processKey,
                're_enqueue' => true,
                'total_count' => $totalCount,
            )),
            $this->applicationName
        );
    }
}
