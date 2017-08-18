<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\ExtractRule;

interface ExtractRuleRegistryInterface
{
    /**
     * Set rule.
     *
     * @param string               $alias
     * @param ExtractRuleInterface $extractRule
     *
     * @return ExtractRuleRegistryInterface
     */
    public function setRule($alias, ExtractRuleInterface $extractRule);

    /**
     * Get rules.
     *
     * @return ExtractRuleInterface[]
     */
    public function getRules();

    /**
     * Get rule.
     *
     * @param string $alias
     *
     * @return ExtractRuleInterface
     *
     * @throws \IDCI\Bundle\TaskBundle\Exception\UnexpectedTypeException if the passed alias is not a string
     * @throws \InvalidArgumentException                                if the type can not be retrieved
     */
    public function getRule($alias);

    /**
     * Has rule.
     *
     * @param string $alias
     *
     * @return bool
     */
    public function hasRule($alias);
}
