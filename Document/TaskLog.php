<?php

namespace IDCI\Bundle\TaskBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/**
 * @ODM\Document(
 *     collection="task_logs",
 *     repositoryClass="IDCI\Bundle\TaskBundle\Document\Repository\TaskLogRepository"
 * )
 * @ODM\Indexes({
 *     @ODM\Index(keys={"context.action_name"="asc"}, name="action_name"),
 *     @ODM\Index(keys={"context.task_id"="asc"}, name="task_id"),
 *     @ODM\Index(keys={"context.task_process_key"="asc"}, name="task_process_key")
 * })
 */
class TaskLog
{
    /**
     * @var \MongoId
     *
     * @ODM\Id
     */
    private $id;

    /**
     * @var \DateTime
     *
     * @ODM\Field(type="date", name="datetime")
     */
    private $datetime;

    /**
     * @var string
     *
     * @ODM\Field(type="string", name="message")
     */
    private $message;

    /**
     * @var array
     *
     * @ODM\Field(type="hash", name="context")
     */
    private $context;

    /**
     * @var int
     *
     * @ODM\Field(type="int", name="level")
     */
    private $level;

    /**
     * @var string
     *
     * @ODM\Field(type="string", name="level_name")
     */
    private $levelName;

    /**
     * @var string
     *
     * @ODM\Field(type="string", name="channel")
     */
    private $channel;

    /**
     * @var array
     *
     * @ODM\Field(type="hash", name="extra")
     */
    private $extra;

    /**
     * Get id
     *
     * @return string $id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get datetime
     *
     * @return \Datetime $datetime
     */
    public function getDatetime()
    {
        return $this->datetime;
    }

    /**
     * Get message
     *
     * @return string $message
     */
    public function getMessage()
    {
        return $this->message;
    }

    /**
     * Get level
     *
     * @return int $level
     */
    public function getLevel()
    {
        return $this->level;
    }

    /**
     * Get level name
     *
     * @return int $levelName
     */
    public function getLevelName()
    {
        return $this->levelName;
    }

    /**
     * Get channel
     *
     * @return string $channel
     */
    public function getChannel()
    {
        return $this->channel;
    }

    /**
     * Get extra
     *
     * @return array $extra
     */
    public function getExtra()
    {
        return $this->extra;
    }

    /**
     * Get action name
     *
     * @return string
     */
    public function getActionName()
    {
        return $this->context['action_name'];
    }

    /**
     * Get the task identifier
     *
     * @return string
     */
    public function getTaskId()
    {
        return $this->context['task_id'];
    }

    /**
     * Get the task process key
     *
     * @return string
     */
    public function getTaskProcessKey()
    {
        return $this->context['task_process_key'];
    }
}
