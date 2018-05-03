<?php

namespace IDCI\Bundle\TaskBundle\Monolog\Processor;

use IDCI\Bundle\TaskBundle\Document\Task;

class TaskLogProcessor
{
    /**
     * @var Task
     */
    protected  $task;

    /**
     * Set task.
     *
     * @param Task $task
     *
     * @return $this
     */
    public function setTask(Task $task)
    {
        $this->task = $task;
    }

    /**
     * Get task.
     *
     * @return Task
     */
    public function getTask()
    {
        return $this->task;
    }

    public function processRecord(array $record)
    {
        if (null !== $this->task) {
            $record['context']['task_id'] = $this->getTask()->getId();
            $record['context']['action_name'] = $this->getTask()->getCurrentAction()->getName();
        }

        return $record;
    }
}
