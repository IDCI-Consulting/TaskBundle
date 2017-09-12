<?php

namespace IDCI\Bundle\TaskBundle\RabbitMq\Consumer;

use Doctrine\ORM\EntityManager;
use IDCI\Bundle\TaskBundle\Handler\TaskHandler;
use PhpAmqpLib\Message\AMQPMessage;
use OldSound\RabbitMqBundle\RabbitMq\ConsumerInterface;

class TaskConsumer implements ConsumerInterface
{
    /**
     * @var TaskHandler
     */
    private $taskHandler;

    /**
     * @var EntityManager
     */
    private $em;

    /**
     * Constructor.
     *
     * @param TaskHandler   $taskHandler
     * @param EntityManager $em
     */
    public function __construct(
        TaskHandler   $taskHandler,
        EntityManager $em
    ) {
        $this->taskHandler = $taskHandler;
        $this->em = $em;
    }

    public function execute(AMQPMessage $msg)
    {
        try {
            $options = unserialize($msg->getBody());
            $this->taskHandler->execute($options);

            return ConsumerInterface::MSG_ACK;
        } catch (\Exception $e) {
            echo sprintf("The message was rejected with the following message: %s\n", $e->getMessage());

            return ConsumerInterface::MSG_REJECT;
        }
    }
}
