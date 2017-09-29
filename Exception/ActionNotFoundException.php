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
     * @param int $taskConfigurationId
     */
    public function __construct($name, $taskConfigurationId)
    {
        parent::__construct(sprintf(
            'The action "%s" is not found in the task configuration "%s"',
            $name,
            $taskConfigurationId
        ));
    }
}
