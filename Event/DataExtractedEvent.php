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
     * Constructor.
     *
     * @param AbstractTaskConfiguration $taskConfiguration
     * @param array                     $data
     * @param int                       $totalCount
     */
    public function __construct(AbstractTaskConfiguration $taskConfiguration, $data, $totalCount)
    {
        $this->taskConfiguration = $taskConfiguration;
        $this->data = $data;
        $this->totalCount = $totalCount;
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
     * Get the datai count.
     *
     * @return array
     */
    public function getTotalCount()
    {
        return $this->totalCount;
    }
}
