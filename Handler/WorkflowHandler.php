<?php

namespace IDCI\Bundle\TaskBundle\Handler;

use IDCI\Bundle\TaskBundle\Document\Task;
use IDCI\Bundle\TaskBundle\Document\Action;

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
     * Workflow constructor.
     *
     * @param \Twig_Environment $merger
     * @param DocumentManager   $documentManager
     */
    public function __construct(\Twig_Environment $merger, DocumentManager $documentManager)
    {
        $this->merger = $merger;
        $this->documentManager = $documentManager;
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

            if (boolval($isNextAction)) {
                $nextAction->setName($nextDestination['name']);

                return $nextAction;
            }
        }

        $nextAction->setName($workflow['flows'][$currentActionName]['default_next']);

        return $nextAction;
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
     *
     * @return boolean
     */
    public function isProcessFinished($processKey)
    {
        $tasks = $this->documentManager->findNotEndedTaskByProcessKey($processKey);

        return 0 === sizeof($tasks);
    }
}
