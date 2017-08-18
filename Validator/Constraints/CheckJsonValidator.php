<?php

namespace IDCI\Bundle\TaskBundle\Validator\Constraints;

use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;

class CheckJsonValidator extends ConstraintValidator
{
    /**
     * {@inheritdoc}
     */
    public function validate($value, Constraint $constraint)
    {
        if (!is_array(json_decode($value, true))) {
            $this->context->buildViolation($constraint->message)
                ->setParameter('{{ error }}', json_last_error_msg())
                ->addViolation()
            ;
        }
    }
}
