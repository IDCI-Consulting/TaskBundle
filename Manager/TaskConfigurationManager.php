<?php

namespace IDCI\Bundle\TaskBundle\Manager;

use IDCI\Bundle\TasktBundle\Entity\Task;
use IDCI\Bundle\TaskBundle\Event\TaskConfigurationEvent;
use IDCI\Bundle\TaskBundle\Event\TaskConfigurationEvents;

/**
 * Task configuration manager.
 *
 * @author Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */
class TaskConfigurationManager extends AbstractManager
{
    /**
     * {@inheritdoc}
     */
    public function getEntityClass()
    {
        return 'IDCI\Bundle\TaskBundle\Entity\TaskConfiguration';
    }

    /**
     * {@inheritdoc}
     */
    public function add($entity)
    {
        $this->getEventDispatcher()->dispatch(
            TaskConfigurationEvents::PRE_CREATE,
            new TaskConfigurationEvent($entity)
        );

        parent::add($entity);

        $this->getEventDispatcher()->dispatch(
            TaskConfigurationEvents::POST_CREATE,
            new TaskConfigurationEvent($entity)
        );
    }

    /**
     * {@inheritdoc}
     */
    public function update($entity)
    {
        $this->getEventDispatcher()->dispatch(
            TaskConfigurationEvents::PRE_UPDATE,
            new TaskConfigurationEvent($entity)
        );

        parent::update($entity);

        $this->getEventDispatcher()->dispatch(
            TaskConfigurationEvents::POST_UPDATE,
            new TaskConfigurationEvent($entity)
        );
    }

    /**
     * {@inheritdoc}
     */
    public function delete($entity)
    {
        $this->getEventDispatcher()->dispatch(
            TaskConfigurationEvents::PRE_DELETE,
            new TaskConfigurationEvent($entity)
        );

        parent::delete($entity);

        $this->getEventDispatcher()->dispatch(
            TaskConfigurationEvents::POST_DELETE,
            new TaskConfigurationEvent($entity)
        );
    }
}
