<?php

namespace IDCI\Bundle\TaskBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use IDCI\Bundle\TaskBundle\Exception\ActionNotFoundException;

/**
 * @ODM\EmbeddedDocument
 */
class Configuration
{
    /**
     * @var array
     *
     * @ODM\Field(type="hash", name="workflow")
     */
    private $workflow= array();

    /**
     * @var array
     *
     * @ODM\Field(type="hash", name="actions")
     */
    private $actions = array();

    /**
     * Set workflow
     *
     * @param hash $workflow
     * @return $this
     */
    public function setWorkflow($workflow)
    {
        $this->workflow = $workflow;

        return $this;
    }

    /**
     * Get workflow
     *
     * @return hash $workflow
     */
    public function getWorkflow()
    {
        return $this->workflow;
    }

    /**
     * Set actions
     *
     * @param hash $actions
     * @return $this
     */
    public function setActions($actions)
    {
        $this->actions = $actions;

        return $this;
    }

    /**
     * Get actions
     *
     * @return hash $actions
     */
    public function getActions()
    {
        return $this->actions;
    }

    /**
     * Get first action from workflow
     *
     * @return string
     */
    public function getFirstAction()
    {
        return $this->workflow['first_action_name'];
    }

    /**
     * Return the action by name
     *
     * @param string $name
     *
     * @return array
     * @throws ActionNotFoundException
     */
    public function getAction($name)
    {
        foreach ($this->actions as $action) {
            if ($name === $action['name']) {
                return $action;
            }
        }

        throw new ActionNotFoundException($name, $this->workflow['name']);
    }
}
