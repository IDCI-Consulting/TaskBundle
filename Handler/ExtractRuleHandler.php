<?php

namespace IDCI\Bundle\TaskBundle\Handler;

use Symfony\Component\EventDispatcher\EventDispatcherInterface;
use IDCI\Bundle\TaskBundle\Entity\TaskConfiguration;
use IDCI\Bundle\TaskBundle\Event\DataExtractedEvent;
use IDCI\Bundle\TaskBundle\ExtractRule\ExtractRuleRegistry;

class ExtractRuleHandler
{
    /** @var ExtractRuleRegistry */
    protected $registry;

    /** @var EventDispatcherInterface */
    protected $dispatcher;

    /**
     * Constructor.
     *
     * @param ExtractRuleRegistry $registry
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
     * @param TaskConfiguration $taskConfiguration
     */
    public function execute(TaskConfiguration $taskConfiguration)
    {
        $extractedData = array();
        $extractRuleConfiguration = json_decode($taskConfiguration->getExtractRule(), true);

        // Extract data
        $extractedData = $this->registry
            ->getRule($extractRuleConfiguration['extract_rule'])
            ->extract($extractRuleConfiguration['parameters'])
        ;

        // Dispatch event with extractData and taskConfiguration
        $this->dispatcher->dispatch(
            DataExtractedEvent::NAME,
            new DataExtractedEvent($taskConfiguration, $extractedData)
        );
    }
}
