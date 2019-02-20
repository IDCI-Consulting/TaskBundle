<?php

namespace IDCI\Bundle\TaskBundle\Handler;

use Doctrine\ODM\MongoDB\DocumentManager;
use IDCI\Bundle\TaskBundle\Document\Task;
use IDCI\Bundle\TaskBundle\Document\Action;
use IDCI\Bundle\TaskBundle\Action\ActionRegistry;

class WorkflowHandler
{
    /**
     * @var \Twig_Environment
     */
    protected $merger;

    /**
     * @var DocumentManager
     */
    protected $documentManager;

    /**
     * @var ActionRegistry
     */
    protected $registry;


    /**
     * Workflow constructor.
     *
     * @param \Twig_Environment $merger
     * @param DocumentManager   $documentManager
     */
    public function __construct(
        \Twig_Environment $merger,
        DocumentManager   $documentManager,
        ActionRegistry    $registry
    ) {
        $this->merger = $merger;
        $this->documentManager = $documentManager;
        $this->registry = $registry;
    }

    /**
     * Get the next action from workflow.
     *
     * @param Task $task
     *
     * @return Action
     */
    public function getNextAction(Task $task)
    {
        $nextAction = new Action();
        $currentActionName = $task->getCurrentAction()->getName();
        $workflow = $task->getConfiguration()->getWorkflow();
        $nextDestinations = array();

        if (isset($workflow['flows'][$currentActionName]['next'])) {
            $nextDestinations = $workflow['flows'][$currentActionName]['next'];
        }

        foreach ($nextDestinations as $nextDestination) {
            $template = $this->merger->createTemplate($nextDestination['condition']);
            $isNextAction = $template->render(array(
                'extracted_data' => $task->getData()->getExtractedData(),
                'action_data' => $task->getData()->getActionData(),
            ));

            if ($this->isTrue($isNextAction)) {
                $nextAction->setName($nextDestination['name']);

                return $nextAction;
            }
        }

        $nextAction->setName($workflow['flows'][$currentActionName]['default_next']);

        return $nextAction;
    }

    /**
     * Check if the configuration has sequential actions.
     *
     * @param Task $task
     *
     * @return boolean
     */
    public function hasSequentialAction(Task $task)
    {
        if (!$task->getConfiguration()) {
            return false;
        }

        $sequentialActions = array_filter($task->getConfiguration()->getActions(), function ($action) {
            return $this->registry->getAction($action['service'])->isSequential();
        });

        return sizeof($sequentialActions) > 0;
    }

    /**
     * Is task finished.
     *
     * @param Task $task
     *
     * @return boolean
     */
    public function isTaskFinished(Task $task)
    {
        if (!$task->getConfiguration()) {
            return true;
        }

        $workflow = $task->getConfiguration()->getWorkflow();
        $currentActionName = $task->getCurrentAction()->getName();

        return !isset($workflow['flows'][$currentActionName]);
    }

    /**
     * Is process finished.
     *
     * @param string $processKey
     * @param string $taskCount
     *
     * @return boolean
     */
    public function isProcessFinished($processKey, $taskCount)
    {
        $result = $this->documentManager->getRepository(Task::class)->getEndedTaskCountByProcessKey($processKey);

        return intval($taskCount) === $result[0]['task_count'];
    }

    /**
     * Is post action.
     *
     * @param Task $task
     *
     * @return bool
     */
    public function isPostAction(Task $task)
    {
        if (null === $task->getConfiguration()) {
            return true;
        }

        return in_array($task->getCurrentAction()->getName(), $task->getConfiguration()->getPostActions());
    }

    /**
     * Check if the given condition is true
     *
     * @mixed $condition
     * @mixed $returnNull
     *
     * @return bool
     */
    public function isTrue($condition, $returnNull = false){
        $boolval = is_string($condition)
            ? filter_var($condition, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE)
            : (bool)$condition
        ;

        return null === $boolval && !$returnNull ? false : $boolval;
    }
}
