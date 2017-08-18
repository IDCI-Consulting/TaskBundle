<?php

/**
 * @author Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use IDCI\Bundle\TaskBundle\Entity\TaskConfiguration;

/**
 * @ODM\Document(
 *     collection="tasks",
 *     repositoryClass="IDCI\Bundle\TaskBundle\Document\Repository\TaskRepository"
 * )
 * @ODM\HasLifecycleCallbacks
 * @ODM\Indexes({
 *     @ODM\Index(keys={"task_configuration_id"="asc"}, name="task_configuration_id")
 * })
 */
class Task
{
    /**
     * @var \MongoId
     *
     * @ODM\Id
     */
    private $id;

    /**
     * @var array
     *
     * @ODM\EmbedOne(targetDocument="Configuration")
     */
    private $configuration = array();

    /**
     * @var array
     *
     * @ODM\EmbedOne(targetDocument="TaskData")
     */
    private $data;

    /**
     * @var int
     *
     * @ODM\Field(type="int", name="task_configuration_id")
     */
    private $taskConfigurationId;

    /**
     * @var array
     *
     * @ODM\EmbedMany(targetDocument="Action")
     */
    private $actions;

    /**
     * @var array
     *
     * @ODM\EmbedMany(targetDocument="TaskLog")
     */
    private $log;

    /**
     * @var datetime
     *
     * @ODM\Field(type="date", name="created_at")
     */
    private $createdAt;

    /**
     * @var datetime
     *
     * @ODM\Field(type="date", name="updated_at")
     */
    private $updatedAt;

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->log = new \Doctrine\Common\Collections\ArrayCollection();
        $this->actions = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * On pre persist
     *
     * @ODM\PrePersist()
     */
    public function onPrePresist()
    {
        $date = new \DateTime('now');

        $this->createdAt = $date;
        $this->updatedAt = $date;
    }

    /**
     * On pre update
     *
     * @ODM\PreUpdate()
     */
    public function onPreUpdate()
    {
        $date = new \DateTime('now');

        $this->updatedAt = $date;
    }
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
     * Set configuration
     *
     * @param hash $configuration
     * @return $this
     */
    public function setConfiguration($configuration)
    {
        $this->configuration = $configuration;

        return $this;
    }

    /**
     * Get configuration
     *
     * @return hash $configuration
     */
    public function getConfiguration()
    {
        return $this->configuration;
    }

    /**
     * Set data
     *
     * @param IDCI\Bundle\TaskBundle\Document\TaskData $data
     * @return $this
     */
    public function setData(\IDCI\Bundle\TaskBundle\Document\TaskData $data)
    {
        $this->data = $data;

        return $this;
    }

    /**
     * Get data
     *
     * @return IDCI\Bundle\TaskBundle\Document\TaskData $data
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * Set task configuration id.
     *
     * @param int $id
     * @return $this
     */
    public function setTaskConfigurationId($taskConfigurationId)
    {
        $this->taskConfigurationId = $taskConfigurationId;

        return $this;
    }

    /**
     * Get task configuration id.
     *
     * @return int
     */
    public function getTaskConfigurationId()
    {
        return $this->taskConfigurationId;
    }

    /**
     * Add log
     *
     * @param IDCI\Bundle\TaskBundle\Document\TaskLog $log
     */
    public function addLog(\IDCI\Bundle\TaskBundle\Document\TaskLog $log)
    {
        $this->log[] = $log;
    }

    /**
     * Remove log
     *
     * @param IDCI\Bundle\TaskBundle\Document\TaskLog $log
     */
    public function removeLog(\IDCI\Bundle\TaskBundle\Document\TaskLog $log)
    {
        $this->log->removeElement($log);

        return $this;
    }

    /**
     * Get log
     *
     * @return \Doctrine\Common\Collections\Collection $log
     */
    public function getLog()
    {
        return $this->log;
    }

    /**
     * Add action
     * Insert the action in first position to build the mongo query more easily.
     *
     * @param IDCI\Bundle\TaskBundle\Document\Action $action
     * @return $this
     */
    public function addAction(\IDCI\Bundle\TaskBundle\Document\Action $action)
    {
        $actions = $this->actions->toArray();
        array_unshift($actions, $action);

        $this->actions = new \Doctrine\Common\Collections\ArrayCollection($actions);

        return $this;
    }

    /**
     * Remove action
     *
     * @param IDCI\Bundle\TaskBundle\Document\Action $action
     * @return $this
     */
    public function removeAction(\IDCI\Bundle\TaskBundle\Document\Action $action)
    {
        $this->actions->removeElement($action);

        return $this;
    }

    /**
     * Get actions
     *
     * @return \Doctrine\Common\Collections\Collection $actions
     */
    public function getActions()
    {
        return $this->actions;
    }

    /**
     * Get current action
     *
     * @return Action
     */
    public function getCurrentAction()
    {
        return $this->actions->first();
    }

    /**
     * Get status
     *
     * @return string
     */
    public function getCurrentStatus()
    {
        return $this->getCurrentAction()->getCurrentStatus();
    }

    /**
     * To string
     *
     * @return string
     */
    public function __toString()
    {
        return sprintf('[%s]', $this->id);
    }

    /**
     * Set createdAt
     *
     * @param date $createdAt
     * @return $this
     */
    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return date $createdAt
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Set updatedAt
     *
     * @param date $updatedAt
     * @return $this
     */
    public function setUpdatedAt(\DateTime $updatedAt = null)
    {
        $this->updatedAt = $updatedAt;

        return $this;
    }

    /**
     * Get updatedAt
     *
     * @return date $updatedAt
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }
}
