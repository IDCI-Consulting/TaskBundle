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
        $qb = $this
            ->createQueryBuilder()
            ->field('taskConfigurationSlug')->equals($taskConfigurationSlug)
            ->field('status')
        ;

        if (is_array($status)) {
           $qb->in($status);
        } else {
           $qb->equals($status);
        }

        return $qb
            ->getQuery()
            ->execute()
            ->count()
        ;
    }

    /**
     * Remove tasks less than given date
     *
     * @param \DateTime $from
     * @return array
     */
    public function removeFromDate(\DateTime $from)
    {
        return $this
            ->createQueryBuilder()
            ->remove()
            ->field('created_at')
            ->lte($from)
            ->getQuery()
            ->execute()
        ;
    }

    /**
     * Find all tasks that are not in the given configuration slugs
     *
     * @param array $slugs
     * @return array
     */
    public function removeExceptBySlug(array $slugs)
    {
        return $this
            ->createQueryBuilder()
            ->remove()
            ->field('task_configuration_slug')
            ->notIn($slugs)
            ->notEqual(null) // Avoid unconfigured task remove
            ->getQuery()
            ->execute()
        ;
    }
}
