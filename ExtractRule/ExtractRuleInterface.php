<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\ExtractRule;

interface ExtractRuleInterface
{
    /**
     * Extract data according to extract rule logic.
     *
     * @param int $offset
     *
     * @return array
     */
    public function extract(array $parameters, $offset);
}
