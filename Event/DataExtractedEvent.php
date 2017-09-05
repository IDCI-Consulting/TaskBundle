<?php

namespace IDCI\Bundle\TaskBundle\Event;

use Symfony\Component\EventDispatcher\Event;
use IDCI\Bundle\TaskBundle\Entity\TaskConfiguration;

class DataExtractedEvent extends Event
{
    const NAME = 'data.extracted';

    /**
     * @var TaskConfiguration
     */
    protected $taskConfiguration;

    /**
     * @var array
     */
    protected $data;

    /**
     * Constructor.
     *
     * @param TaskConfiguration $taskConfiguration
     * @param $data
     */
    public function __construct(TaskConfiguration $taskConfiguration, $data)
    {
        $this->taskConfiguration = $taskConfiguration;
        $this->data = $data;
    }

    /**
     * Get the task configuration.
     *
     * @return TaskConfiguration
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
}
