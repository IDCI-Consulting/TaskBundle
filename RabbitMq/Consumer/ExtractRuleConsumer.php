<?php

namespace IDCI\Bundle\TaskBundle\RabbitMq\Consumer;

use OldSound\RabbitMqBundle\RabbitMq\ConsumerInterface;
use OldSound\RabbitMqBundle\RabbitMq\ProducerInterface;
use PhpAmqpLib\Message\AMQPMessage;
use IDCI\Bundle\TaskBundle\Handler\ExtractRuleHandler;
use IDCI\Bundle\TaskBundle\ExtractRule\ExtractRuleRegistry;
use IDCI\Bundle\TaskBundle\Manager\TaskConfigurationManager;

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
     * @var TaskConfigurationManager
     */
    protected $taskConfigurationManager;

    /**
     * Constructor.
     *
     * @param ExtractRuleRegistry      $extractRuleRegistry
     * @param ExtractRuleHandler       $extractRuleHandler
     * @param TaskConfigurationManager $taskConfigurationManager
     */
    public function __construct(
        ExtractRuleRegistry      $extractRuleRegistry,
        ExtractRuleHandler       $extractRuleHandler,
        TaskConfigurationManager $taskConfigurationManager
    ) {
        $this->extractRuleRegistry = $extractRuleRegistry;
        $this->extractRuleHandler = $extractRuleHandler;
        $this->taskConfigurationManager = $taskConfigurationManager;
    }

    /**
     * {@inheritdoc}
     */
    public function execute(AMQPMessage $msg)
    {
        $options = unserialize($msg->getBody());

        // Force clear cache otherwise it loads the unchanged taskConfiguration
        $this->taskConfigurationManager->getEntityManager()->clear($this->taskConfigurationManager->getEntityClass());

        $taskConfiguration = $this->taskConfigurationManager->findOneById($options['task_configuration_id']);

        $this->extractRuleHandler->execute($taskConfiguration);

        return ConsumerInterface::MSG_ACK;
    }
}
