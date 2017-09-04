<?php

namespace IDCI\Bundle\TaskBundle\RabbitMq\Consumer;

use Doctrine\ODM\MongoDB\DocumentManager;
use PhpAmqpLib\Message\AMQPMessage;
use OldSound\RabbitMqBundle\RabbitMq\ConsumerInterface;
use IDCI\Bundle\TaskBundle\Handler\ActionHandler;
use IDCI\Bundle\TaskBundle\Document\Task;

class ActionConsumer implements ConsumerInterface
{
    /**
     * @var DocumentManager
     */
    private $documentManager;

    /**
     * @var ActionHandler
     */
    private $actionHandler;

    /**
     * Constructor.
     *
     * @param DocumentManager $documentManager
     * @param ActionHandler   $actionHandler
     */
    public function __construct(DocumentManager $documentManager, ActionHandler $actionHandler)
    {
        $this->documentManager = $documentManager;
        $this->actionHandler = $actionHandler;
    }

    public function execute(AMQPMessage $msg)
    {
        try {
            $options = unserialize($msg->getBody());

            $this->documentManager->clear(Task::class);

            $task = $this->documentManager->getRepository('IDCITaskBundle:Task')->find($options['task_id']);

            $this->actionHandler->execute($task);

            return ConsumerInterface::MSG_ACK;
        } catch (\Exception $e) {
            echo sprintf("The message was rejected with the following message: %s\n", $e->getMessage());

            return ConsumerInterface::MSG_REJECT;
        }
    }
}
