<?php

namespace IDCI\Bundle\TaskBundle\Validator\Constraints;

use Symfony\Component\Validator\Constraint;

/**
 * @Annotation
 */
class CheckJson extends Constraint
{
    public $message = 'JSON is incorrectly formatted : {{ error }}';
    public $bracketsMessage = 'The configuration must begin and end with brackets [ ]';
}
