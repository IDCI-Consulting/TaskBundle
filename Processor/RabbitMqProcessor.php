<?php

namespace IDCI\Bundle\TaskBundle\Processor;

use Doctrine\ORM\EntityManager;
use IDCI\Bundle\TaskBundle\Document\ActionStatus;
use OldSound\RabbitMqBundle\RabbitMq\ProducerInterface;
use Doctrine\ODM\MongoDB\DocumentManager;
use IDCI\Bundle\TaskBundle\Document\Task;
use IDCI\Bundle\TaskBundle\Model\AbstractTaskConfiguration;

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
     * @var string
     */
    private $applicationName;

    /**
     * @var string
     */
    private $taskConfigurationClass;

    /**
     * Constructor
     *
     * @param ProducerInterface $extractRuleProducer
     * @param ProducerInterface $taskProducer
     * @param ProducerInterface $actionProducer
     * @param DocumentManager $documentManager
     * @param string $applicationName
     * @param string $taskConfigurationClass
     */
    public function __construct(
        ProducerInterface $extractRuleProducer,
        ProducerInterface $taskProducer,
        ProducerInterface $actionProducer,
        DocumentManager   $documentManager,
        $applicationName,
        $taskConfigurationClass
    ) {
        $this->extractRuleProducer    = $extractRuleProducer;
        $this->taskProducer           = $taskProducer;
        $this->actionProducer         = $actionProducer;
        $this->documentManager        = $documentManager;
        $this->applicationName        = $applicationName;
        $this->taskConfigurationClass = $taskConfigurationClass;
    }

    /**
     * {@inheritdoc}
     */
    public function startTasks(AbstractTaskConfiguration $taskConfiguration)
    {
        $this->extractRuleProducer->publish(
            serialize(array('task_configuration' => $taskConfiguration)),
            $this->applicationName
        );
    }

    /**
     * {@inheritdoc}
     */
    public function startTask($actionService, $data = array())
    {
        $this->taskProducer->publish(
            serialize(array(
                'action_service' => $actionService,
                'data' => $data
            )),
            $this->applicationName
        );
    }

    /**
     * Resume task
     *
     * @throws
     *
     * @param Task $task
     */
    public function resume(Task $task)
    {
        if ($task->getStatus() !== ActionStatus::ERROR) {
            throw new \Exception('You can only resume a task that failed');
        }

        $task->getCurrentAction()->addStatus(ActionStatus::PENDING);
        $this->documentManager->flush();

        $this->actionProducer->publish(
            serialize(array(
                'task_id' => $task->getId(),
            )),
            $task->getSource()
        );
    }
}
