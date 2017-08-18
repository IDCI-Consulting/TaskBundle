<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\ExtractRule;

use Symfony\Component\OptionsResolver\OptionsResolver;

class BaseExtractRule extends AbstractExtractRule
{
    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setRequired(array('rule'))
            ->setAllowedTypes('rule', array('string', 'array'))
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function doExtract(array $parameters)
    {
    }
}
