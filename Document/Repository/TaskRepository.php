<?php

namespace IDCI\Bundle\TaskBundle\Document\Repository;

use Doctrine\ODM\MongoDB\DocumentRepository;
use IDCI\Bundle\TaskBundle\Event\TaskEvents;

class TaskRepository extends DocumentRepository
{
    /**
     * Find errored tasks.
     *
     * @return array
     */
    public function findErroredTasks()
    {
        return $this
            ->createQueryBuilder()
            ->field("actions.0.statuses.0.status")
            ->equals(TaskEvents::ERROR)
            ->getQuery()
            ->execute()
        ;
    }

    /**
     * Find passed tasks.
     *
     * @return array
     */
    public function findPassedTasks()
    {
        return $this
            ->createQueryBuilder()
            ->field("actions.0.statuses.0.status")
            ->equals(TaskEvents::PASSED)
            ->getQuery()
            ->execute()
        ;
    }
}
