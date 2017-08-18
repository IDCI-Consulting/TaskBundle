<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Exception;

class UndefinedExtractRuleException extends \Exception
{
    /**
     * The constructor.
     *
     * @param string $name
     */
    public function __construct($name)
    {
        parent::__construct(sprintf(
            'The extract rule %s is not defined',
            $name
        ));
    }
}
