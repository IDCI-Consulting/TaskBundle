<?php

namespace IDCI\Bundle\TaskBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;

/**
 * @ODM\Document(
 *     collection="task_logs",
 *     repositoryClass="IDCI\Bundle\TaskBundle\Document\Repository\TaskLogRepository"
 * )
 * @ODM\Indexes({
 *     @ODM\Index(keys={"context.task_id"="asc"}, name="task_id")
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
     * @return id $id
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set datetime
     *
     * @param date $datetime
     * @return $this
     */
    public function setDatetime($datetime)
    {
        $this->datetime = $datetime;

        return $this;
    }

    /**
     * Get datetime
     *
     * @return date $datetime
     */
    public function getDatetime()
    {
        return $this->datetime;
    }

    /**
     * Set message
     *
     * @param string $message
     * @return $this
     */
    public function setMessage($message)
    {
        $this->message = $message;

        return $this;
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
     * Set context
     *
     * @param hash $context
     * @return $this
     */
    public function setContext($context)
    {
        $this->context = $context;

        return $this;
    }

    /**
     * Get context
     *
     * @return hash $context
     */
    public function getContext()
    {
        return $this->context;
    }

    /**
     * Set level
     *
     * @param int $level
     * @return $this
     */
    public function setLevel($level)
    {
        $this->level = $level;

        return $this;
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
     * Set level name
     *
     * @param int $levelName
     * @return $this
     */
    public function setLevelName($levelName)
    {
        $this->levelName = $levelName;

        return $this;
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
     * Set channel
     *
     * @param string $channel
     * @return $this
     */
    public function setChannel($channel)
    {
        $this->channel = $channel;

        return $this;
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
     * Set extra
     *
     * @param hash $extra
     * @return $this
     */
    public function setExtra($extra)
    {
        $this->extra = $extra;

        return $this;
    }

    /**
     * Get extra
     *
     * @return hash $extra
     */
    public function getExtra()
    {
        return $this->extra;
    }
}
