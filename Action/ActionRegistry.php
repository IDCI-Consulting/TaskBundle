<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Action;

use IDCI\Bundle\TaskBundle\Exception\UnexpectedTypeException;

class ActionRegistry implements ActionRegistryInterface
{
    /** @var array */
    private $actions = array();

    /**
     * {@inheritdoc}
     */
    public function setAction($alias, ActionInterface $action)
    {
        $this->actions[$alias] = $action;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getActions()
    {
        return $this->actions;
    }

    /**
     * {@inheritdoc}
     */
    public function getAction($alias)
    {
        if (!is_string($alias)) {
            throw new UnexpectedTypeException($alias, 'string');
        }

        if (!isset($this->actions[$alias])) {
            throw new \InvalidArgumentException(sprintf('Could not load type "%s"', $alias));
        }

        return $this->actions[$alias];
    }

    /**
     * {@inheritdoc}
     */
    public function hasAction($alias)
    {
        return isset($this->actions[$alias]);
    }
}
