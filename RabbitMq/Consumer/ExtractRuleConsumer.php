<?php

namespace IDCI\Bundle\TaskBundle\RabbitMq\Consumer;

use OldSound\RabbitMqBundle\RabbitMq\ConsumerInterface;
use PhpAmqpLib\Message\AMQPMessage;
use IDCI\Bundle\TaskBundle\Handler\ExtractRuleHandler;
use IDCI\Bundle\TaskBundle\ExtractRule\ExtractRuleRegistry;
use Doctrine\ORM\EntityManager;

class ExtractRuleConsumer implements ConsumerInterface {
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
        $this->extractRuleRegistry    = $extractRuleRegistry;
        $this->extractRuleHandler     = $extractRuleHandler;
        $this->taskConfigurationClass = $taskConfigurationClass;
    }

    /**
     * {@inheritdoc}
     */
    public function execute(AMQPMessage $msg)
    {
        $totalCount = 0;
        $options = unserialize($msg->getBody());

        $reEnqueue = isset($options['re_enqueue']) ? true : false;

        $args = array(
            $options['task_configuration'],
            $reEnqueue,
        );

        try {
            if (isset($options['process_key'], $options['offset'])) {
                $args = array_merge($args, array(
                    $options['offset'],
                    $options['process_key']
                ));
            }

            if (isset($options['total_count'])) {
                $args = array_merge($args, array(
                    $options['total_count'],
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
