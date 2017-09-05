<?php

/**
 * @author Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Entity\Repository;

use Doctrine\ORM\Query;
use Doctrine\ORM\QueryBuilder;
use Doctrine\ORM\EntityRepository;
use IDCI\Bundle\RestBundle\Repository\AbstractEntityRepository;
use IDCI\Bundle\TaskBundle\Entity\TaskConfiguration;

/**
 * TaskConfigurationRepository.
 */
class TaskConfigurationRepository extends EntityRepository
{
    /**
     * Find by query builder.
     *
     * @param array      $criteria
     * @param array|null $orderBy
     *
     * @return \Doctrine\ORM\QueryBuilder
     */
    public function findByQueryBuilder(array $criteria, array $orderBy = null)
    {
        $qb = $this->createQueryBuilder('entity');
        if (!is_null($orderBy)) {
            foreach ($orderBy as $field => $order) {
                $qb->addOrderBy(sprintf('entity.%s', $field), $order);
            }
        }
        $this->addCriteria($qb, 'entity', $criteria);

        return $qb;
    }

    /**
     * Find by query.
     *
     * @param array      $criteria
     * @param array|null $orderBy
     *
     * @return \Doctrine\ORM\Query
     */
    public function findByQuery(array $criteria = null, array $orderBy = null)
    {
        return $this->findByQueryBuilder($criteria, $orderBy)->getQuery();
    }

    /**
     * Find all query builder.
     *
     * @param array|null $orderBy
     *
     * @return \Doctrine\ORM\QueryBuilder
     */
    public function findAllQueryBuilder(array $orderBy = null)
    {
        return $this->findByQueryBuilder(array(), $orderBy);
    }

    /**
     * Find all query.
     *
     * @param array|null $orderBy
     *
     * @return \Doctrine\ORM\Query
     */
    public function findAllQuery(array $orderBy = null)
    {
        return $this->findAllQueryBuilder($orderBy)->getQuery();
    }

    /**
     * addCriteria.
     *
     * @param QueryBuilder $qb
     * @param string       $sourceEntity
     * @param array        $criteria
     */
    public function addCriteria(QueryBuilder &$qb, $sourceEntity, array $criteria)
    {
        foreach ($criteria as $field => $value) {
            if (null === $value || (is_array($value) && empty($value))) {
                continue;
            }
            if (is_array($value)) {
                if ($this->getClassMetadata()->hasField($field)) {
                    self::addWhere($qb, $sourceEntity, $field, $value, 'in');
                } else {
                    self::addJoin($qb, $sourceEntity, $field);
                    self::addCriteria($qb, $field, $value);
                }
            } else {
                self::addWhere($qb, $sourceEntity, $field, $value);
            }
        }
    }

    /**
     * addJoin.
     *
     * @param QueryBuilder $qb
     * @param string       $relatedEntity
     * @param string       $sourceEntity
     * @param array        $relatedEntityCriteria
     * @param string       $operation             (default 'eq')
     */
    protected static function addJoin(
        QueryBuilder &$qb,
        $sourceEntity,
        $relatedEntity,
        array $relatedEntityCriteria = array(),
        $operation = 'eq'
    ) {
        $qb->join(sprintf('%s.%s', $sourceEntity, $relatedEntity), $relatedEntity);
        foreach ($relatedEntityCriteria as $field => $value) {
            self::addWhere($qb, $relatedEntity, $field, $value, $operation);
        }
    }

    /**
     * addWhere.
     *
     * @param QueryBuilder $qb
     * @param string       $relatedEntity
     * @param string       $field
     * @param string       $value
     * @param string       $operation     (default 'eq')
     */
    protected static function addWhere(QueryBuilder &$qb, $relatedEntity, $field, $value, $operation = 'eq')
    {
        $qb->andWhere(call_user_func_array(
            array($qb->expr(), $operation),
            array(
                sprintf('%s.%s', $relatedEntity, $field),
                $value,
            )
        ));
    }

    /**
     * Find taskConfigurations Query Builder.
     *
     * @param string   $isActive : 0 | 1
     * @param string   $alias
     *
     * @return QueryBuilder
     */
    public function findTaskConfigurationsQueryBuilder(
        $isActive = null,
        $alias = 'taskConfiguration'
    ) {
        $qb = $this->createQueryBuilder($alias);

        if (null !== $isActive) {
            $isActive ?
                $this->findActiveTaskConfigurationsQueryBuilder($qb, $alias) :
                $this->findNonActiveTaskConfigurationsQueryBuilder($qb, $alias)
            ;
        }

        return $qb;
    }

    /**
     * findActiveTaskConfigurationsQueryBuilder
     *
     * @param QueryBuilder $qb
     * @param string       $alias
     *
     * @return QueryBuilder
     */
    public function findActiveTaskConfigurationsQueryBuilder(QueryBuilder $qb = null, $alias = 'taskConfiguration')
    {
        if (null === $qb) {
            $qb = $this->createQueryBuilder($alias);
        }

        $qb
            ->andWhere($qb->expr()->in(sprintf('%s.enable', $alias), ':active'))
            ->setParameter('active', array(TaskConfiguration::STATE_ENABLE))
        ;

        return $qb;
    }

    /**
     * findNonActiveTaskConfigurationsQueryBuilder
     *
     * @param QueryBuilder $qb
     * @param string       $alias
     *
     * @return QueryBuilder
     */
    public function findNonActiveTaskConfigurationsQueryBuilder(QueryBuilder $qb = null, $alias = 'taskConfiguration')
    {
        if (null === $qb) {
            $qb = $this->createQueryBuilder($alias);
        }

        $qb->andWhere($qb->expr()->in(sprintf('%s.enable', $alias), ':active'))
            ->setParameter('active', array(TaskConfiguration::STATE_DISABLE))
        ;

        return $qb;
    }
}
