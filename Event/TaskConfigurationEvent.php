<?php

namespace IDCI\Bundle\TaskBundle\Event;

use Symfony\Component\EventDispatcher\Event;

class TaskConfigurationEvent extends Event
{
    protected $taskConfiguration;

    public function __construct($taskConfiguration)
    {
        $this->taskConfiguration = $taskConfiguration;
    }

    public function getTaskConfiguration()
    {
        return $this->taskConfiguration;
    }
}
