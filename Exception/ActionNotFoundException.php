<?php

/**
 * @author: Brahim  Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Exception;

class ActionNotFoundException extends \Exception
{
    /**
     * The constructor.
     *
     * @param string $name
     * @param int $taskConfigurationSlug
     */
    public function __construct($name)
    {
        parent::__construct(sprintf(
            'The action "%s" was not found',
            $name
        ));
    }
}
