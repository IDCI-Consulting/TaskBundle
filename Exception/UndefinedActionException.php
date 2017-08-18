<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Exception;

class UndefinedActionException extends \Exception
{
    /**
     * The constructor.
     *
     * @param string $name
     */
    public function __construct($name)
    {
        parent::__construct(sprintf(
            'The action %s is not defined',
            $name
        ));
    }
}
