<?php

namespace IDCI\Bundle\TaskBundle\Processor;

class DefaultProcessor implements ProcessorInterface
{
    /**
     * {@inheritdoc}
     */
    public function start(Task $task)
    {
        // Todo: Execute tasks in sync mode.
    }

    /**
     * {@inheritdoc}
     */
    public function resume(Task $task)
    {
        // Todo: Execute tasks in direct mode.
    }
}
