<?php

namespace IDCI\Bundle\TaskBundle\Processor;

use Doctrine\ORM\EntityManager;
use IDCI\Bundle\TaskBundle\Document\ActionStatus;
use IDCI\Bundle\TaskBundle\Event\TaskEvents;
use OldSound\RabbitMqBundle\RabbitMq\ProducerInterface;
use Doctrine\ODM\MongoDB\DocumentManager;
use IDCI\Bundle\TaskBundle\Document\Task;
use IDCI\Bundle\TaskBundle\Entity\TaskConfiguration;

class RabbitMqProcessor implements ProcessorInterface
{
    /**
     * @var ProducerInterface
     */
    private $extractRuleProducer;

    /**
     * @var ProducerInterface
     */
    private $taskProducer;

    /**
     * @var ProducerInterface
     */
    private $actionProducer;

    /**
     * @var EntityManager
     */
    private $entityManager;

    public function __construct(
        ProducerInterface $extractRuleProducer,
        ProducerInterface $taskProducer,
        ProducerInterface $actionProducer,
        EntityManager     $entityManager,
        DocumentManager   $documentManager
    ) {
        $this->extractRuleProducer = $extractRuleProducer;
        $this->taskProducer        = $taskProducer;
        $this->actionProducer      = $actionProducer;
        $this->entityManager       = $entityManager;
        $this->documentManager     = $documentManager;
    }

    /**
     * {@inheritdoc}
     */
    public function startTasks(TaskConfiguration $taskConfiguration)
    {
        $this->extractRuleProducer->publish(serialize(array(
            'task_configuration_id' => $taskConfiguration->getId()
        )));
    }

    /**
     * {@inheritdoc}
     */
    public function startTask($actionService, $data = array())
    {
        $this->taskProducer->publish(serialize(array(
            'action_service' => $actionService,
            'data' => $data
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

        $actionStatus = new ActionStatus();
        $actionStatus->setStatus(TaskEvents::PENDING);
        $actionStatus->setDate(new \DateTime('now'));
        $task->getCurrentAction()->addStatus($actionStatus);
        $this->documentManager->flush();

        $this->actionProducer->publish(serialize(array(
            'task_id' => $task->getId(),
        )));
    }

    private function reloadTaskConfiguration(Task $task)
    {
        $taskConfiguration = $this
            ->entityManager
            ->getRepository('IDCITaskBundle:TaskConfiguration')
            ->find($task->getTaskConfigurationId())
        ;
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
