<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Action;

class Action
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
     * @var bool
     */
    protected $abstract;

    /**
     * @var array
     */
    protected $parameters;

    /**
     * Constructor.
     *
     * @param array $configuration
     */
    public function __construct(array $configuration)
    {
        $this->name = $configuration['name'];
        $this->parent = $configuration['parent'];
        $this->description = $configuration['description'];
        $this->abstract = $configuration['abstract'];
        $this->parameters = $configuration['parameters'];
    }

    /**
     * Get name.
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Get parent.
     *
     * @return string
     */
    public function getParent()
    {
        return $this->parent;
    }

    /**
     * Get description.
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Is abstract.
     *
     * @return bool
     */
    public function isAbstract()
    {
        return $this->abstract;
    }

    /**
     * Get action parameters.
     *
     * @return array
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
