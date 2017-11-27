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
    public function __construct($name, $taskConfigurationSlug)
    {
        parent::__construct(sprintf(
            'The action "%s" is not found in the task configuration "%s"',
            $name,
            $taskConfigurationSlug
        ));
    }
}
