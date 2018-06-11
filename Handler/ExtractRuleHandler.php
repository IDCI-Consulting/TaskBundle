<?php

namespace IDCI\Bundle\TaskBundle\Handler;

use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use IDCI\Bundle\TaskBundle\Model\AbstractTaskConfiguration;
use IDCI\Bundle\TaskBundle\Event\DataExtractedEvent;
use IDCI\Bundle\TaskBundle\ExtractRule\ExtractRuleRegistry;

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
     * Constructor.
     *
     * @param ExtractRuleRegistry      $registry
     * @param EventDispatcherInterface $dispatcher
     */
    public function __construct(
        ExtractRuleRegistry      $registry,
        EventDispatcherInterface $dispatcher
    ) {
        $this->registry = $registry;
        $this->dispatcher = $dispatcher;
    }

    /**
     * Execute all extract rules and log for each
     *
     * @param AbstractTaskConfiguration $taskConfiguration
     */
    public function execute(AbstractTaskConfiguration $taskConfiguration)
    {
        $extractRuleConfiguration = json_decode($taskConfiguration->getExtractRule(), true);

        $extractRule = $this->registry->getRule($extractRuleConfiguration['service']);
        $extractRule->setParameters($extractRuleConfiguration['parameters']);

        $offset = 0;
        $totalCount = $extractRule->getTotalCount();
        do {
            $extractedData = $extractRule->extract($offset);

            $offset += sizeof($extractedData);

            // Dispatch event with extractedData and taskConfiguration
            $this->dispatcher->dispatch(
                DataExtractedEvent::NAME,
                new DataExtractedEvent($taskConfiguration, $extractedData, $extractRule->getTotalCount())
            );

            $extractedData = null;
            if (0 === ($offset % $extractRule->getBatchSize())) {
                // Let GC do the memory job
                time_nanosleep(0, 10000000);
            }
        } while ($offset < $totalCount);
    }
}
