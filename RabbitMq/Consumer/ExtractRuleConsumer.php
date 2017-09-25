<?php

namespace IDCI\Bundle\TaskBundle\RabbitMq\Consumer;

use OldSound\RabbitMqBundle\RabbitMq\ConsumerInterface;
use PhpAmqpLib\Message\AMQPMessage;
use IDCI\Bundle\TaskBundle\Handler\ExtractRuleHandler;
use IDCI\Bundle\TaskBundle\ExtractRule\ExtractRuleRegistry;
use Doctrine\ORM\EntityManager;

class ExtractRuleConsumer implements ConsumerInterface
{
    /**
     * @var ExtractRuleRegistry
     */
    protected $extractRuleRegistry;

    /**
     * @var ExtractRuleHandler
     */
    protected $extractRuleHandler;

    /**
     * @var EntityManager
     */
    protected $entityManager;

    /**
     * @var string
     */
    protected $taskConfigurationClass;

    /**
     * Constructor.
     *
     * @param ExtractRuleRegistry $extractRuleRegistry
     * @param ExtractRuleHandler  $extractRuleHandler
     * @param EntityManager       $entityManager
     * @param string              $taskConfigurationClass
     */
    public function __construct(
        ExtractRuleRegistry $extractRuleRegistry,
        ExtractRuleHandler  $extractRuleHandler,
        EntityManager       $entityManager,
        $taskConfigurationClass
    ) {
        $this->extractRuleRegistry    = $extractRuleRegistry;
        $this->extractRuleHandler     = $extractRuleHandler;
        $this->entityManager          = $entityManager;
        $this->taskConfigurationClass = $taskConfigurationClass;
    }

    /**
     * {@inheritdoc}
     */
    public function execute(AMQPMessage $msg)
    {
        $options = unserialize($msg->getBody());

        try {
            // Force clear cache otherwise it loads the unchanged taskConfiguration
            $this->entityManager->clear($this->taskConfigurationClass);

            $taskConfiguration = $this
                ->entityManager
                ->getRepository($this->taskConfigurationClass)
                ->findOneById($options['task_configuration_id'])
            ;

            $this->extractRuleHandler->execute($taskConfiguration);

            return ConsumerInterface::MSG_ACK;
        } catch (\Exception $e) {
            echo sprintf("The message was rejected with the following message: %s\n", $e->getMessage());

            return ConsumerInterface::MSG_REJECT;
        }
    }
}
