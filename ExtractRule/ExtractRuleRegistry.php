<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\ExtractRule;

use IDCI\Bundle\TaskBundle\Exception\UnexpectedTypeException;

class ExtractRuleRegistry implements ExtractRuleRegistryInterface
{
    /** @var array */
    protected $extractRules = array();

    /**
     * {@inheritdoc}
     */
    public function setRule($alias, ExtractRuleInterface $extractRule)
    {
        $this->extractRules[$alias] = $extractRule;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getRules()
    {
        return $this->extractRules;
    }

    /**
     * {@inheritdoc}
     */
    public function getRule($alias)
    {
        if (!is_string($alias)) {
            throw new UnexpectedTypeException($alias, 'string');
        }

        if (!isset($this->extractRules[$alias])) {
            throw new \InvalidArgumentException(sprintf('Could not load extract rule "%s"', $alias));
        }

        return $this->extractRules[$alias];
    }

    /**
     * {@inheritdoc}
     */
    public function hasRule($alias)
    {
        return isset($this->extractRules[$alias]);
    }
}
