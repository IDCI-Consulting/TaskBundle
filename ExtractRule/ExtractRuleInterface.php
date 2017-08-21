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
}
