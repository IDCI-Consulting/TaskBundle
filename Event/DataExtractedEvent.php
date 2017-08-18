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

    public function __construct(TaskConfiguration $taskConfiguration, array $data)
    {
        $this->taskConfiguration = $taskConfiguration;
        $this->data = $data;
    }

    public function getTaskConfiguration()
    {
        return $this->taskConfiguration;
    }

    public function getData()
    {
        return $this->data;
    }
}
