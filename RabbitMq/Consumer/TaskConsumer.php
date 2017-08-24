<?php

namespace IDCI\Bundle\TaskBundle\RabbitMq\Consumer;

use PhpAmqpLib\Message\AMQPMessage;
use OldSound\RabbitMqBundle\RabbitMq\ConsumerInterface;
use OldSound\RabbitMqBundle\RabbitMq\ProducerInterface;
use IDCI\Bundle\TaskBundle\Handler\TaskHandler;
use IDCI\Bundle\TaskBundle\Manager\TaskConfigurationManager;

class TaskConsumer implements ConsumerInterface
{
    /**
     * @var TaskHandler
     */
    private $taskHandler;

    /**
     * @var TaskConfigurationManager
     */
    private $taskConfigurationManager;

    /**
     * Constructor.
     *
     * @param TaskHandler              $taskHandler
     * @param TaskConfigurationManager $taskConfigurationManager
     */
    public function __construct(
        TaskHandler              $taskHandler,
        TaskConfigurationManager $taskConfigurationManager
    ) {
        $this->taskHandler = $taskHandler;
        $this->taskConfigurationManager = $taskConfigurationManager;
    }

    public function execute(AMQPMessage $msg)
    {
        try {
            $options = unserialize($msg->getBody());
            $extractedData = array();
            $actionData = array();

            if (array_key_exists('extracted_data', $options['data'])) {
                $extractedData = $options['data']['extracted_data'];
            }

            if (array_key_exists('action_data', $options['data'])) {
                $actionData = $options['data']['action_data'];
            }

            // Force clear cache otherwise it loads the unchanged taskConfiguration
            $this->taskConfigurationManager->getEntityManager()->clear($this->taskConfigurationManager->getEntityClass());

            $taskConfiguration = $this->taskConfigurationManager->findOneById($options['task_configuration_id']);

            $this->taskHandler->execute($taskConfiguration, $extractedData, $actionData);

            return ConsumerInterface::MSG_ACK;
        } catch (\Exception $e) {
            echo sprintf("The message was rejected with the following message: %s\n", $e->getMessage());

            return ConsumerInterface::MSG_REJECT;
        }
    }
}
