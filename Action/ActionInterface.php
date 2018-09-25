<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Action;

use Psr\Log\LoggerInterface;
use IDCI\Bundle\TaskBundle\Exception\InvalidActionDataException;
use IDCI\Bundle\TaskBundle\Document\Task;
use IDCI\Bundle\TaskBundle\Monolog\Processor\TaskLogProcessor;

interface ActionInterface
{
    /**
     * Extract data according to Task extract rule.
     *
     * @param Task  $task
     * @param array $parameters
     *
     * @return array
     */
    public function execute(Task $task, array $parameters);

    /**
     * Set the logger.
     *
     * @return ActionInterface
     */
    public function setLogger(LoggerInterface $logger);

    /**
     * Get the logger.
     *
     * @return LoggerInterface
     */
    public function getLogger();

    /**
     * Set TaskLogProcessor.
     *
     * @return ActionInterface
     */
    public function setTaskLogProcessor(TaskLogProcessor $taskLogProcessor);

    /**
     * Get TaskLogProcessor.
     *
     * @return TaskLogProcessor
     */
    public function getTaskLogProcessor();
}
