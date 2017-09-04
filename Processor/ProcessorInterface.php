<?php

namespace IDCI\Bundle\TaskBundle\Processor;

use IDCI\Bundle\TaskBundle\Document\Task;
use IDCI\Bundle\TaskBundle\Entity\TaskConfiguration;

interface ProcessorInterface
{
    /**
     * @param TaskConfiguration $taskConfiguration
     */
    public function start(TaskConfiguration $taskConfiguration);

    /**
     * @param Task $task
     */
    public function resume(Task $task);
}
