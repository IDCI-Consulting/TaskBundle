<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\ExtractRule;

use Symfony\Component\OptionsResolver\OptionsResolver;

abstract class AbstractExtractRule implements ExtractRuleInterface
{
    /**
     * Do extract using extract rules parameters.
     *
     * @param array $parameters
     * @param int   $offset
     * @param int   $limit
     *
     * @return array
     */
    abstract public function doExtract(array $parameters, $offset, $limit);

    /**
     * Get total count of data to extract.
     *
     * @param array $parameters
     *
     * @return int
     */
    abstract public function getTotalCount(array $parameters);

    /**
     * Configure Options.
     *
     * @param OptionsResolver $resolver
     */
    abstract public function configureParameters(OptionsResolver $resolver);

    /**
     * Is synchronous.
     *
     * @return bool
     */
    public function isSynchronous()
    {
        return false;
    }

    /**
     * Get batch size.
     *
     * @return int
     */
    public function getBatchSize()
    {
        return 100;
    }

    /**
     * {@inheritdoc}
     */
    public function extract(array $parameters, $offset)
    {
        return $this->doExtract($parameters, $offset, $this->getBatchSize());
    }
}
