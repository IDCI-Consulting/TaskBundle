<?php

namespace IDCI\Bundle\TaskBundle\Event;

use Symfony\Component\EventDispatcher\Event;
use IDCI\Bundle\TaskBundle\Entity\AbstractTaskConfiguration;

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
     * Constructor.
     *
     * @param AbstractTaskConfiguration $taskConfiguration
     * @param $data
     */
    public function __construct(AbstractTaskConfiguration $taskConfiguration, $data)
    {
        $this->taskConfiguration = $taskConfiguration;
        $this->data = $data;
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
}
