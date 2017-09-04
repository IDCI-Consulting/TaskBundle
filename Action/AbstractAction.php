<?php

/**
 * @author: Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Action;

use IDCI\Bundle\TaskBundle\Exception\InvalidActionDataException;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Psr\Log\LoggerInterface;
use IDCI\Bundle\TaskBundle\Document\Task;
use IDCI\Bundle\TaskBundle\Monolog\Processor\TaskLogProcessor;

abstract class AbstractAction implements ActionInterface
{
    /** @var array */
    protected $actionParameters = array();

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
     * Configure Options.
     *
     * @param OptionsResolver $resolver
     */
    abstract protected function configureOptions(OptionsResolver $resolver);

    /**
     * {@inheritdoc}
     */
    public function execute(Task $task, array $parameters)
    {
        $this->taskLogProcessor->setTask($task);

        $resolver = new OptionsResolver();
        $this->configureOptions($resolver);
        $resolvedParameters = $resolver->resolve($parameters);

        $data = $this->doExecute($resolvedParameters);

        return $data;
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
