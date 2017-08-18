<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Action;

use Symfony\Component\OptionsResolver\OptionsResolver;
use Psr\Log\LoggerInterface;
use IDCI\Bundle\TaskBundle\Exception\InvalidActionDataException;
use IDCI\Bundle\TaskBundle\Document\Task;
use IDCI\Bundle\TaskBundle\Monolog\Processor\TaskLogProcessor;

abstract class AbstractAction implements ActionInterface
{
    /** @var array */
    protected $actionParameters = array();

    /** @var ActionInterface */
    protected $parent;

    /** @var LoggerInterface */
    protected $logger;

    /** @var TaskLogProcessor */
    protected $taskLogProcessor;

    /**
     * Do execute using parameters.
     *
     * @param array $options
     *
     * @return array
     */
    abstract public function doExecute(array $options);

    /**
     * Set default parameters.
     *
     * @param OptionsResolver $resolver
     */
    abstract protected function setDefaultParameters(OptionsResolver $resolver);

    /**
     * Configure returned data.
     *
     * @param OptionsResolver $resolver
     */
    public function configureReturnedData(OptionsResolver $resolver)
    {
        $resolver
            ->setRequired(array('error'))
            ->setDefaults(array(
                'data' => null,
                'error_message' => '',
            ))
            ->setDefined(array('error_message'))
            ->setAllowedTypes('error', array('bool'))
            ->setAllowedTypes('data', array('null', 'array', 'string', 'bool'))
            ->setAllowedTypes('error_message', array('string'))
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function execute(Task $task, array $parameters)
    {
        $this->taskLogProcessor->setTask($task);

        $resolver = new OptionsResolver();
        $this->setDefaultParameters($resolver);
        $resolvedParameters = $resolver->resolve($parameters);

        $data = $this->doExecute($resolvedParameters);

        try {
            $resolver = new OptionsResolver();
            $this->configureReturnedData($resolver);
            $data = $resolver->resolve($data);
        } catch (\Exception $e) {
            throw new InvalidActionDataException(get_called_class());
        }

        return $data;
    }

    /**
     * {@inheritdoc}
     */
    public function setActionParameters(array $parameters = array())
    {
        $this->actionParameters = $parameters;

        return $this;
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

    /**
     * {@inheritdoc}
     */
    public function setParent(ActionInterface $parent)
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

    /**
     * {@inheritdoc}
     */
    public function setLogger(LoggerInterface $logger)
    {
        $this->logger = $logger;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getLogger()
    {
        return $this->logger;
    }

    /**
     * {@inheritdoc}
     */
    public function setTaskLogProcessor(TaskLogProcessor $taskLogProcessor)
    {
        $this->taskLogProcessor = $taskLogProcessor;

        return $this;
    }

    /**
     * {@inheritdoc}
     */
    public function getTaskLogProcessor()
    {
        return $this->taskLogProcessor;
    }
}
