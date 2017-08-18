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
     * @param string $workflowName
     */
    public function __construct($name, $workflowName)
    {
        parent::__construct(sprintf(
            'The action "%s" is not found in the workflow "%s"',
            $name,
            $workflowName
        ));
    }
}
