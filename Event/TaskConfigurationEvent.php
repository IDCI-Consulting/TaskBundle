<?php

namespace IDCI\Bundle\TaskBundle\Event;

use IDCI\Bundle\TaskBundle\Entity\TaskConfiguration;
use Symfony\Component\EventDispatcher\Event;

class TaskConfigurationEvent extends Event
{
    /**
     * @var TaskConfiguration
     */
    protected $taskConfiguration;

    /**
     * Constructor.
     *
     * @param TaskConfiguration $taskConfiguration
     */
    public function __construct(TaskConfiguration $taskConfiguration)
    {
        $this->taskConfiguration = $taskConfiguration;
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
}
