<?php

namespace IDCI\Bundle\TaskBundle\Processor;

use IDCI\Bundle\TaskBundle\Document\Task;
use IDCI\Bundle\TaskBundle\Entity\AbstractTaskConfiguration;

interface ProcessorInterface
{
    /**
     * @param AbstractTaskConfiguration $taskConfiguration
     */
    public function startTasks(AbstractTaskConfiguration $taskConfiguration);

    /**
     * @param string $actionService
     * @param array $data
     */
    public function startTask($actionService, $data = array());

    /**
     * @param Task $task
     */
    public function resume(Task $task);
}
