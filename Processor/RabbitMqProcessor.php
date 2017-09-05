<?php

namespace IDCI\Bundle\TaskBundle\Processor;

use OldSound\RabbitMqBundle\RabbitMq\ProducerInterface;
use Doctrine\ODM\MongoDB\DocumentManager;
use IDCI\Bundle\TaskBundle\Document\Task;
use IDCI\Bundle\TaskBundle\Entity\TaskConfiguration;
use IDCI\Bundle\TaskBundle\Manager\TaskConfigurationManager;

class RabbitMqProcessor implements ProcessorInterface
{
    /**
     * @var ProducerInterface
     */
    private $extractRuleProducer;

    /**
     * @var ProducerInterface
     */
    private $actionProducer;

    /**
     * @var taskConfigurationManager
     */
    private $taskConfigurationManager;

    public function __construct(
        ProducerInterface $extractRuleProducer,
        ProducerInterface $actionProducer,
        TaskConfigurationManager $taskConfigurationManager,
        DocumentManager $documentManager
    ) {
        $this->extractRuleProducer = $extractRuleProducer;
        $this->actionProducer = $actionProducer;
        $this->taskConfigurationManager = $taskConfigurationManager;
        $this->documentManager = $documentManager;
    }

    /**
     * {@inheritdoc}
     */
    public function start(TaskConfiguration $taskConfiguration)
    {
        $this->extractRuleProducer->publish(serialize(array(
            'task_configuration_id' => $taskConfiguration->getId()
        )));
    }

    /**
     * Resume task
     *
     * @param Task $task
     */
    public function resume(Task $task)
    {
        $this->reloadTaskConfiguration($task);

        $this->actionProducer->publish(serialize(array(
            'task_id' => $task->getId(),
        )));
    }

    private function reloadTaskConfiguration(Task $task)
    {
        $taskConfiguration = $this->taskConfigurationManager->find($task->getTaskConfigurationId());
        $workflow = json_decode($taskConfiguration->getWorkflow(), true);

        if ($workflow['workflow'] !== $task->getConfiguration()->getWorkflow() ||
            $workflow['actions']  !== $task->getConfiguration()->getActions()
        ) {
            $task->getConfiguration()
                ->setWorkflow($workflow['workflow'])
                ->setActions($workflow['actions'])
            ;

            $this->documentManager->flush();
        }
    }
}
