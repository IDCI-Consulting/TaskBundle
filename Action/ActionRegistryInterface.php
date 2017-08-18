<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Action;

interface ActionRegistryInterface
{
    /**
     * Set action.
     *
     * @param string          $alias
     * @param ActionInterface $action
     *
     * @return ActionRegistryInterface
     */
    public function setAction($alias, ActionInterface $action);

    /**
     * Get actions.
     *
     * @return ActionInterface[]
     */
    public function getActions();

    /**
     * Get action.
     *
     * @param string $alias
     *
     * @return ActionInterface
     *
     * @throws \IDCI\Bundle\TaskBundle\Exception\UnexpectedTypeException if the passed alias is not a string
     * @throws \InvalidArgumentException                                 if the type can not be retrieved
     */
    public function getAction($alias);

    /**
     * Has action.
     *
     * @param string $alias
     *
     * @return bool
     */
    public function hasAction($alias);
}
