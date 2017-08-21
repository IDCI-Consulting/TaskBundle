<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Action;

use IDCI\Bundle\TaskBundle\Exception\InvalidActionDataException;
use IDCI\Bundle\TaskBundle\Document\Task;
use IDCI\Bundle\TaskBundle\Monolog\Processor\TaskLogProcessor;

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
     * @var boolean
     */
    protected $abstract;

    /**
     * @var array
     */
    protected $actionParameters;

    /**
     * Constructor
     *
     * @param array $configuration
     */
    public function __construct(array $configuration)
    {
        $this->name                 = $configuration['name'];
        $this->parent               = $configuration['parent'];
        $this->description          = $configuration['description'];
        $this->actionParameters     = $configuration['extra_form_options'];
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
    public function getActionParameters()
    {
        if (null === $this->getParent()) {
            return $this->actionParameters;
        }

        return array_replace_recursive(
            $this->getParent()->getActionParameters(),
            $this->actionParameters
        );
    }
}
