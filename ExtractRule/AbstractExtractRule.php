<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\ExtractRule;

use Symfony\Component\OptionsResolver\OptionsResolver;

abstract class AbstractExtractRule implements ExtractRuleInterface
{
    protected $extractRuleParameters = array();

    /**
     * Do extract using extract rules parameters.
     *
     * @param array $options
     *
     * @return array
     */
    abstract public function doExtract(array $options);

    /**
     * Configure Options.
     *
     * @param OptionsResolver $resolver
     */
    abstract protected function configureOptions(OptionsResolver $resolver);

    /**
     * {@inheritdoc}
     */
    public function extract(array $options)
    {
        $resolver = new OptionsResolver();
        $this->configureOptions($resolver);
        $resolvedOptions = $resolver->resolve($options);

        return $this->doExtract($resolvedOptions);
    }
}
