<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\ExtractRule;

use Symfony\Component\OptionsResolver\OptionsResolver;

abstract class AbstractExtractRule implements ExtractRuleInterface
{
    protected $extractRuleParameters = array();
    protected $parent;

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
    public function configureOptions(OptionsResolver $resolver)
    {
    }

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

    /**
     * {@inheritdoc}
     */
    public function setExtractRuleParameters(array $parameters = array())
    {
        $this->extractRuleParameters = $parameters;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getExtractRuleParameters()
    {
        if (null === $this->getParent()) {
            return $this->extractRuleParameters;
        }

        return array_replace_recursive(
            $this->getParent()->getExtractRuleParameters(),
            $this->extractRuleParameters
        );
    }

    /**
     * {@inheritdoc}
     */
    public function setParent(ExtractRuleInterface $parent)
    {
        $this->parent = $parent;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getParent()
    {
        return $this->parent;
    }
}
