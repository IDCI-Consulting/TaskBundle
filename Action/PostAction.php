<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Action;

use Symfony\Component\OptionsResolver\OptionsResolver;

abstract class PostAction extends AbstractAction
{
    /**
     * Configure Options.
     *
     * @param OptionsResolver $resolver
     */
    protected function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setDefined('process_key')
            ->setAllowedTypes('process_key', array('string'));
    }
}
