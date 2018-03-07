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
     * Constructor.
     *
     * @param Configuration $configuration
     * @param string        $processKey
     */
    public function __construct(Configuration $configuration, $processKey)
    {
        $this->configuration = $configuration;
        $this->processKey = $processKey;
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
}
