<?php

namespace IDCI\Bundle\TaskBundle\Document\Repository;

use Doctrine\ODM\MongoDB\DocumentRepository;

class TaskLogRepository extends DocumentRepository
{
    /**
     * Find logs by the given task id.
     *
     * @param string $taskId
     *
     * @return QueryBuilder
     */
    public function findByTaskIdQueryBuilder($taskId)
    {
        $qb = $this
            ->createQueryBuilder()
            ->field('context.task_id')
            ->equals($taskId)
            ->sort('_id', 'asc')
        ;

        return $qb;
    }

    /**
     * Find logs by the given task id.
     *
     * @param string $taskId
     *
     * @return Query
     */
    public function findByTaskIdQuery($taskId)
    {
        $qb = $this->findByTaskIdQueryBuilder($taskId);

        return is_null($qb) ? $qb : $qb->getQuery();
    }

    /**
     * Find logs by the given task id.
     *
     * @param string $taskId
     *
     * @return array
     */
    public function findByTaskId($taskId)
    {
        $q = $this->findByTaskIdQuery($taskId);

        return is_null($q) ? array() : $q->execute();
    }
}
