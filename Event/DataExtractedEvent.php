<?php

namespace IDCI\Bundle\TaskBundle\Event;

use Symfony\Component\EventDispatcher\Event;
use IDCI\Bundle\TaskBundle\Model\AbstractTaskConfiguration;

class DataExtractedEvent extends Event
{
    const NAME = 'data.extracted';

    /**
     * @var AbstractTaskConfiguration
     */
    protected $taskConfiguration;

    /**
     * @var array
     */
    protected $data;

    /**
     * @var int
     */
    protected $totalCount;

    /**
     * @var int
     */
    protected $processKey;

    /**
     * Constructor.
     *
     * @param AbstractTaskConfiguration $taskConfiguration
     * @param array                     $data
     * @param int                       $totalCount
     * @param int                       $processKey
     */
    public function __construct(AbstractTaskConfiguration $taskConfiguration, $data, $totalCount, $processKey)
    {
        $this->taskConfiguration = $taskConfiguration;
        $this->data = $data;
        $this->totalCount = $totalCount;
        $this->processKey = $processKey;
    }

    /**
     * Get the task configuration.
     *
     * @return AbstractTaskConfiguration
     */
    public function getTaskConfiguration()
    {
        return $this->taskConfiguration;
    }

    /**
     * Get the data.
     *
     * @return array
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * Get the data count.
     *
     * @return int
     */
    public function getTotalCount()
    {
        return $this->totalCount;
    }

    /**
     * Get the process key.
     *
     * @return int
     */
    public function getProcessKey()
    {
        return $this->processKey;
    }
}
