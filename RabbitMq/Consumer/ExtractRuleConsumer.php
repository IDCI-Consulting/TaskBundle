<?php

namespace IDCI\Bundle\TaskBundle\RabbitMq\Consumer;

use OldSound\RabbitMqBundle\RabbitMq\ConsumerInterface;
use PhpAmqpLib\Message\AMQPMessage;
use IDCI\Bundle\TaskBundle\Handler\ExtractRuleHandler;
use IDCI\Bundle\TaskBundle\ExtractRule\ExtractRuleRegistry;

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
     * @var string
     */
    protected $taskConfigurationClass;

    /**
     * Constructor.
     *
     * @param ExtractRuleRegistry $extractRuleRegistry
     * @param ExtractRuleHandler  $extractRuleHandler
     * @param string              $taskConfigurationClass
     */
    public function __construct(
        ExtractRuleRegistry $extractRuleRegistry,
        ExtractRuleHandler  $extractRuleHandler,
        $taskConfigurationClass
    ) {
        $this->extractRuleRegistry = $extractRuleRegistry;
        $this->extractRuleHandler = $extractRuleHandler;
        $this->taskConfigurationClass = $taskConfigurationClass;
    }

    /**
     * {@inheritdoc}
     */
    public function execute(AMQPMessage $msg)
    {
        $options = unserialize($msg->getBody());

        try {
            $this->extractRuleHandler->execute($options['task_configuration']);

            return ConsumerInterface::MSG_ACK;
        } catch (\Exception $e) {
            echo sprintf("The message was rejected with the following message: %s\n", $e->getMessage());

            return ConsumerInterface::MSG_REJECT;
        }
    }
}
