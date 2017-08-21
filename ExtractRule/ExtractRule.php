<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\ExtractRule;

use Symfony\Component\OptionsResolver\OptionsResolver;

class ExtractRule
{
    /**
     * @var string
     */
    protected $name;

    /**
     * @var Action
     */
    protected $parent;

    /**
     * @var string
     */
    protected $description;

    /**
     * @var boolean
     */
    protected $abstract;

    /**
     * @var array
     */
    protected $parameters;

    /**
     * Constructor
     *
     * @param array $configuration
     */
    public function __construct(array $configuration)
    {
        $this->name                  = $configuration['name'];
        $this->parent                = $configuration['parent'];
        $this->description           = $configuration['description'];
        $this->parameters = $configuration['parameters'];
    }

    /**
     * {@inheritDoc}
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * {@inheritDoc}
     */
    public function getParent()
    {
        return $this->parent;
    }

    /**
     * {@inheritDoc}
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * {@inheritdoc}
     */
    public function getParameters()
    {
        if (null === $this->getParent()) {
            return $this->parameters;
        }

        return array_replace_recursive(
            $this->getParent()->getParameters(),
            $this->parameters
        );
    }
}
