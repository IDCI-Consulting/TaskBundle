<?php

namespace IDCI\Bundle\TaskBundle\RabbitMq\Consumer;

use Doctrine\ORM\EntityManager;
use PhpAmqpLib\Message\AMQPMessage;
use OldSound\RabbitMqBundle\RabbitMq\ConsumerInterface;
use OldSound\RabbitMqBundle\RabbitMq\ProducerInterface;
use IDCI\Bundle\TaskBundle\Factory\TaskFactory;
use IDCI\Bundle\TaskBundle\Manager\TaskConfigurationManager;

class TaskConsumer implements ConsumerInterface
{
    /**
     * @var TaskFactory
     */
    private $taskFactory;

    /**
     * @var EntityManager
     */
    private $em;

    /**
     * Constructor.
     *
     * @param TaskFactory              $taskFactory
     * @param TaskConfigurationManager $taskConfigurationManager
     */
    public function __construct(
        TaskFactory   $taskFactory,
        EntityManager $em
    ) {
        $this->taskFactory = $taskFactory;
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

            if (array_key_exists('task_configuration_id', $options['data'])) {
              // Force clear cache otherwise it loads the unchanged taskConfiguration
              $this->em->clear($this->taskConfigurationManager->getEntityClass());

              $taskConfiguration = $this->taskConfigurationManager->findOneById($options['task_configuration_id']);

              $this->taskHandler->execute($taskConfiguration, $extractedData, $actionData);
            }

            if (array_key_exists('action_service', $options)) {
              $this->taskHandler->execute($options['action_service'], $options['data']);
            }

            return ConsumerInterface::MSG_ACK;
        } catch (\Exception $e) {
            echo sprintf("The message was rejected with the following message: %s\n", $e->getMessage());

            return ConsumerInterface::MSG_REJECT;
        }
    }
}
