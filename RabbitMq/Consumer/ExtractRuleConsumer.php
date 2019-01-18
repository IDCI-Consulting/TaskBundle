<?php

namespace IDCI\Bundle\TaskBundle\RabbitMq\Consumer;

use OldSound\RabbitMqBundle\RabbitMq\ConsumerInterface;
use PhpAmqpLib\Message\AMQPMessage;
use IDCI\Bundle\TaskBundle\Handler\ExtractRuleHandler;
use IDCI\Bundle\TaskBundle\ExtractRule\ExtractRuleRegistry;
use Doctrine\ORM\EntityManager;

class ExtractRuleConsumer implements ConsumerInterface { /**
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
        $this->extractRuleRegistry    = $extractRuleRegistry;
        $this->extractRuleHandler     = $extractRuleHandler;
        $this->taskConfigurationClass = $taskConfigurationClass;
    }

    /**
     * {@inheritdoc}
     */
    public function execute(AMQPMessage $msg)
    {
        try {
            $options = unserialize($msg->getBody());
            $args = array($options['task_configuration']);

            if (isset($options['process_key'], $options['offset'])) {
                $args = array_merge($args, array(
                    $options['offset'],
                    $options['process_key']
                ));
            }

            call_user_func_array(array($this->extractRuleHandler, 'execute'), $args);

            return ConsumerInterface::MSG_ACK;
        } catch (\Exception $e) {
            echo sprintf("The message was rejected with the following message: %s\n", $e->getMessage());

            return ConsumerInterface::MSG_REJECT;
        }
    }
}
