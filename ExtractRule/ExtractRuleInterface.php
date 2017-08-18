<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\ExtractRule;

interface ExtractRuleInterface
{
    /**
     * Extract data according to Task extract rule.
     *
     * @param array $parameters
     *
     * @return array
     */
    public function extract(array $parameters);

    /**
     * Get the action parameters.
     *
     * @param array $parameters.
     *
     * @return ExtractRuleInterface
     */
    public function setExtractRuleParameters(array $parameters = array());

    /**
     * Get the action parameters.
     *
     * @return array
     */
    public function getExtractRuleParameters();

    /**
     * Set the parent extract rule.
     *
     * @param ExtractRuleInterface $parent
     *
     * @return ExtractRuleInterface
     */
    public function setParent(ExtractRuleInterface $parent);

    /**
    * Get the parent extract rule.
    *
    * @return ExtractRuleInterface
    */
    public function getParent();
}
