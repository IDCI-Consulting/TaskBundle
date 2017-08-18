<?php

/**
 * @author: Brahim  Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Exception;

class MissingActionParametersDefinitionException extends \Exception
{
    /**
     * The constructor.
     *
     * @param string $name
     */
    public function __construct($name)
    {
        parent::__construct(sprintf(
            'You must create the parameters definition in %s/../Resources/config/actions.yml for the action "%s".',
            __DIR__,
            $name
        ));
    }
}
