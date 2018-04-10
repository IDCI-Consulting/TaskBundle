<?php

namespace IDCI\Bundle\TaskBundle\Event;

use Symfony\Component\EventDispatcher\Event;
use IDCI\Bundle\TaskBundle\Document\Configuration;

class ProcessEvent extends Event
{
    /**
     * @var Configuration
     */
    protected $configuration;

    /**
     * @var string
     */
    protected $processKey;

    /**
     * @var string
     */
    protected $taskConfigurationSlug;

    /**
     * Constructor.
     *
     * @param Configuration $configuration
     * @param string        $processKey
     */
    public function __construct(Configuration $configuration, $processKey, $taskConfigurationSlug)
    {
        $this->configuration = $configuration;
        $this->processKey = $processKey;
        $this->taskConfigurationSlug = $taskConfigurationSlug;
    }

    /**
     * Get the configuration.
     *
     * @return string
     */
    public function getConfiguration()
    {
        return $this->configuration;
    }

    /**
     * Get the process key.
     *
     * @return string
     */
    public function getProcessKey()
    {
        return $this->processKey;
    }

    /**
     * Get task configuration slug.
     *
     * @return string
     */
    public function getTaskConfigurationSlug()
    {
        return $this->taskConfigurationSlug;
    }
}
