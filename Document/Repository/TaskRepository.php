<?php

namespace IDCI\Bundle\TaskBundle\Document\Repository;

use Doctrine\ODM\MongoDB\DocumentRepository;
use Doctrine\ODM\MongoDB\Query\Builder as QueryBuilder;
use IDCI\Bundle\TaskBundle\Document\ActionStatus;

class TaskRepository extends DocumentRepository
{
    /**
     * Find tasks by status query builder
     *
     * @param string $status
     *
     * @return QueryBuilder
     */
    public function findByStatusQueryBuilder($status)
    {
        if (!ActionStatus::isValid($status)) {
            throw new \InvalidArgumentException(sprintf('Invalid status %s', $status));
        }

        $qb = $this
            ->createQueryBuilder()
            ->field('status')
            ->equals($status);

        return $qb;
    }

    /**
     * Find tasks by status
     *
     * @param string $status
     *
     * @return array
     */
    public function findByStatus($status)
    {
        $q = $this->findByStatusQueryBuilder($status)->getQuery();

        return is_null($q) ? array() : $q->execute();
    }

    /**
     * Find unconfigured tasks status query builder
     *
     * @return QueryBuilder
     */
    public function findUnconfiguredTasksQueryBuilder()
    {
        $qb = $this
            ->createQueryBuilder()
            ->field('configuration')
            ->equals(null);

        return $qb;
    }

    /**
     * Find unconfigured tasks status
     *
     * @return array
     */
    public function findUnconfiguredTasks()
    {
        $q = $this->findUnconfiguredTasksQueryBuilder()->getQuery();

        return is_null($q) ? array() : $q->execute();
    }

    /**
     * Find unconfigured tasks status query builder
     *
     * @param string $processKey
     *
     * @return QueryBuilder
     */
    public function findNotEndedTaskByProcessKeyQueryBuilder($processKey)
    {
        $qb = $this
            ->createQueryBuilder()
            ->field('endedAt')->equals(null)
            ->field('processKey')->equals($processKey);

        return $qb;
    }

    /**
     * Find unconfigured tasks status
     *
     * @param string $processKey
     *
     * @return array
     */
    public function findNotEndedTaskByProcessKey($processKey)
    {
        $q = $this->findUnconfiguredTasksQueryBuilder()->getQuery();

        return is_null($q) ? array() : $q->execute();
    }
}
