<?php

namespace IDCI\Bundle\TaskBundle\Event;

use Symfony\Component\EventDispatcher\Event;
use IDCI\Bundle\TaskBundle\Document\Task;

class TaskEvent extends Event
{
    /**
     * @var Task $task
     */
    protected $task;

    /**
     * Constructor.
     *
     * @param Task $task
     */
    public function __construct(Task $task)
    {
        $this->task = $task;
    }

    /**
     * Get the task.
     *
     * @return Task
     */
    public function getTask()
    {
        return $this->task;
    }
}
