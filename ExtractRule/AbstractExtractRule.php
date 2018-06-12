<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\ExtractRule;

use Symfony\Component\OptionsResolver\OptionsResolver;

abstract class AbstractExtractRule implements ExtractRuleInterface
{
    protected $parameters = array();

    /**
     * Do extract using extract rules parameters.
     *
     * @param array $parameters
     * @param int   $offset
     *
     * @return array
     */
    abstract public function doExtract(array $parameters, $offset);

    /**
     * Get total count of data to extract.
     *
     * @return int
     */
    abstract public function getTotalCount();

    /**
     * Configure Options.
     *
     * @param OptionsResolver $resolver
     */
    abstract protected function configureParameters(OptionsResolver $resolver);

    /**
     * Set extract rule parameters.
     *
     * @param array $parameters
     *
     * @return $this
     */
    public function setParameters(array $parameters)
    {
        $resolver = new OptionsResolver();
        $this->configureParameters($resolver);
        $this->parameters = $resolver->resolve($parameters);

        return $this;
    }

    /**
     * Get extract rule parameters.
     *
     * @return array
     */
    public function getParameters()
    {
        return $this->parameters;
    }

    /**
     * Get batch size.
     *
     * @return int
     */
    public function getBatchSize()
    {
        return 200;
    }

    /**
     * {@inheritdoc}
     */
    public function extract($offset)
    {
        return $this->doExtract($this->getParameters(), $offset);
    }
}
