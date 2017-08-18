<?php

/**
 * @author: Brahim  Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Exception;

class MissingExtractRuleParametersDefinitionException extends \Exception
{
    /**
     * The constructor.
     *
     * @param string $name
     */
    public function __construct($name)
    {
        $message =<<<EOF
You must create the parameters definition in %s/../Resources/config/extract_rules.yml for the extract rule "%s".
EOF;
        parent::__construct(sprintf(
            $message,
            __DIR__,
            $name
        ));
    }
}
