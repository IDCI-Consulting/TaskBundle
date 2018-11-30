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
     * Find not ended tasks by process key query builder.
     *
     * @param string $processKey
     *
     * @return AggregationBuilder
     */
    public function getEndedTaskCountByProcessKeyAggregationBuilder($processKey)
    {
        $builder = $this->createAggregationBuilder();
        $builder
            ->match()
                ->field('endedAt')->exists(true)
                ->field('processKey')->equals($processKey)
            ->group()
                ->field('id')
                ->expression(null)
                ->field('task_count')
                ->sum(1);

        return $builder;
    }

    /**
     * Find not ended tasks by process.
     *
     * @param string $processKey
     *
     * @return array
     */
    public function getEndedTaskCountByProcessKey($processKey)
    {
        return $this
            ->getDocumentManager()
            ->getDocumentCollection($this->getClassName())
            ->aggregate($this->getEndedTaskCountByProcessKeyAggregationBuilder($processKey)->getPipeline());
    }

    public function countTaskWithConfigurationSlugAndStatus($taskConfigurationSlug, $status)
    {
        if (is_array($status)) {
            $qb = $this
                ->createQueryBuilder()
                ->field('taskConfigurationSlug')->equals($taskConfigurationSlug)
                ->field('status')->in($status)
                ->getQuery()
                ->execute()
                ->count()
            ;

            return $qb;
        }

        $qb = $this
            ->createQueryBuilder()
            ->field('taskConfigurationSlug')->equals($taskConfigurationSlug)
            ->field('status')->equals($status)
            ->getQuery()
            ->execute()
            ->count()
        ;

        return $qb;
    }
}
