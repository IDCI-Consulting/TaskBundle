<?php

/**
 * @author: Brahim  Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Exception;

class InvalidActionDataException extends \Exception
{
    /**
     * The constructor.
     *
     * @param string $class
     */
    public function __construct($class)
    {
        parent::__construct(sprintf(
            'Either key "error" or "data" must be given for returned data of action %s. (An array must be returned)',
            $class
        ));
    }
}
