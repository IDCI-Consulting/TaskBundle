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
     * Workflow constructor.
     *
     * @param \Twig_Environment $merger
     */
    public function __construct(\Twig_Environment $merger)
    {
        $this->merger = $merger;
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

        if (isset($workflow['flow'][$currentActionName]['next'])) {
            $nextDestinations = $workflow['flow'][$currentActionName]['next'];
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

        $nextAction->setName($workflow['flow'][$currentActionName]['default_next']);

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
        $workflow = $task->getConfiguration()->getWorkflow();
        $currentActionName = $task->getCurrentAction()->getName();

        return !isset($workflow['actions'][$currentActionName]);
    }
}
