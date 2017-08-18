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
     * Set the action parameters.
     *
     * @param array $parameters
     *
     * @return ActionInterface
     */
    public function setActionParameters(array $parameters = array());

    /**
     * Get the action parameters.
     *
     * @return array
     */
    public function getActionParameters();

    /**
     * Set the parent action.
     *
     * @param ActionInterface $parent
     *
     * @return ActionInterface
     */
    public function setParent(ActionInterface $parent);

    /**
    * Get the parent extract rule.
    *
    * @return ActionInterface
    */
    public function getParent();

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
