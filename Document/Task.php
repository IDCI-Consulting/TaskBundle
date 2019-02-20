<?php

/**
 * @author Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Document;

use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\ODM\MongoDB\Mapping\Annotations as ODM;
use Ramsey\Uuid\Uuid;
use IDCI\Bundle\TaskBundle\Model\AbstractTaskConfiguration;

/**
 * @ODM\Document(
 *     collection="tasks",
 *     repositoryClass="IDCI\Bundle\TaskBundle\Document\Repository\TaskRepository"
 * )
 * @ODM\HasLifecycleCallbacks
 * @ODM\Indexes({
 *     @ODM\Index(keys={"task_configuration_slug"="asc"}, name="task_configuration_slug"),
 *     @ODM\Index(keys={"created_at"="desc"}, name="created_at"),
 *     @ODM\Index(keys={"ended_at"="asc"}, name="ended_at"),
 *     @ODM\Index(keys={"status"="asc"}, name="status"),
 *     @ODM\Index(keys={"process_key"="asc"}, name="process_key")
 * })
 */
class Task
{
    const CREATED = 'task.created';
    const ENDED = 'task.ended';

    /**
     * @var \MongoId
     *
     * @ODM\Id
     */
    private $id;

    /**
     * @var string
     *
     * @ODM\Field(type="string", name="source")
     */
    private $source;

    /**
     * @var string
     *
     * @ODM\Field(type="string", name="status")
     */
    private $status;

    /**
     * @var array
     *
     * @ODM\EmbedOne(targetDocument="Configuration")
     */
    private $configuration;

    /**
     * @var array
     *
     * @ODM\EmbedOne(targetDocument="TaskData")
     */
    private $data;

    /**
     * @var string
     *
     * @ODM\Field(type="string", name="task_configuration_slug")
     */
    private $taskConfigurationSlug;

    /**
     * @var array
     *
     * @ODM\EmbedMany(targetDocument="Action")
     */
    private $actions;

    /**
     * @var \Datetime
     *
     * @ODM\Field(type="date", name="created_at")
     */
    private $createdAt;

    /**
     * @var \Datetime
     *
     * @ODM\Field(type="date", name="updated_at")
     */
    private $updatedAt;

    /**
     * @var \Datetime
     *
     * @ODM\Field(type="date", name="ended_at")
     */
    private $endedAt;

    /**
     * @var string
     *
     * @ODM\Field(type="string", name="process_key")
     */
    private $processKey;

    /**
     * @var int
     *
     * @ODM\Field(type="int", name="task_count")
     */
    private $taskCount;

    /**
     * Constructor
     *
     * @param string $source
     */
    public function __construct($source)
    {
        $date = new \DateTime('now');
        $this->createdAt = $date;
        $this->updatedAt = $date;
        $this->source = $source;
        $this->actions = new ArrayCollection();
        $this->status = ActionStatus::PENDING;
    }

    /**
     * Create a task from a task configuration
     *
     * @param string                    $source
     * @param string                    $processKey
     * @param string                    $taskCount
     * @param AbstractTaskConfiguration $taskConfiguration
     * @param mixed                     $extractedData
     * @param array                     $actionData
     *
     * @throws \Exception
     *
     * @return Task
     */
    public static function createFromTaskConfiguration(
        $source,
        $processKey,
        $taskCount,
        AbstractTaskConfiguration $taskConfiguration,
        $extractedData = array(),
        array $actionData = array()
    ) {
        $workflow = json_decode($taskConfiguration->getWorkflow(), true);
        if (!is_array($workflow)) {
            throw new \Exception(sprintf(
                'Invalid json for the task configuration %d : %s',
                $taskConfiguration->getId(),
                json_last_error_msg()
            ));
        }

        $taskData = new TaskData();
        $taskData
            ->setExtractedData($extractedData)
            ->setActionData($actionData)
        ;

        $configuration = new Configuration();
        $configuration
            ->setWorkflow($workflow['workflow'])
            ->setActions($workflow['actions'])
        ;

        $action = new Action();
        $action
            ->setName($configuration->getFirstAction())
            ->addStatus(ActionStatus::PENDING)
        ;

        $task = new Task($source);
        $task
            ->setProcessKey($processKey)
            ->setTaskCount($taskCount)
            ->addAction($action)
            ->setData($taskData)
            ->setConfiguration($configuration)
            ->setTaskConfigurationSlug($taskConfiguration->getSlug());

        return $task;
    }

    /**
     * Create a task from a single action
     *
     * @param string $source
     * @param string $processKey
     * @param string $actionServiceName
     * @param array  $data
     * @param string $taskConfigurationSlug
     *
     * @return Task
     */
    public static function createFromAction(
        $source,
        $processKey,
        $actionServiceName,
        array $data = array(),
        $taskConfigurationSlug = null
    ) {
        $taskData = new TaskData();
        $taskData
            ->setExtractedData($data);

        $action = new Action();
        $action
            ->setName($actionServiceName)
            ->addStatus(ActionStatus::PENDING);

        $task = new Task($source);
        $task
            ->setProcessKey($processKey)
            ->addAction($action)
            ->setData($taskData)
            ->setTaskConfigurationSlug($taskConfigurationSlug);

        return $task;
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
     * On pre update
     *
     * @ODM\PreUpdate()
     */
    public function onPreUpdate()
    {
        $date = new \DateTime('now');

        $this->setStatus($this->getCurrentAction()->getCurrentStatus()->getStatus());

        $this->updatedAt = $date;
    }

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
     * Set source
     *
     * @param string $source
     * @return $this
     */
    public function setSource($source)
    {
        $this->source = $source;

        return $this;
    }

    /**
     * Get source
     *
     * @return string $source
     */
    public function getSource()
    {
        return $this->source;
    }

    /**
     * Set configuration
     *
     * @param array $configuration
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
     * @return array $configuration
     */
    public function getConfiguration()
    {
        return $this->configuration;
    }

    /**
     * Set data
     *
     * @param TaskData $data
     * @return $this
     */
    public function setData(TaskData $data)
    {
        $this->data = $data;

        return $this;
    }

    /**
     * Get data
     *
     * @return TaskData $data
     */
    public function getData()
    {
        return $this->data;
    }

    /**
     * Set task configuration slug.
     *
     * @param string $taskConfigurationSlug
     *
     * @return $this
     */
    public function setTaskConfigurationSlug($taskConfigurationSlug)
    {
        $this->taskConfigurationSlug = $taskConfigurationSlug;

        return $this;
    }

    /**
     * Get task configuration slug.
     *
     * @return string
     */
    public function getTaskConfigurationSlug()
    {
        return $this->taskConfigurationSlug;
    }

    /**
     * Add action
     * Insert the action in first position to build the mongo query more easily.
     *
     * @param Action $action
     * @return $this
     */
    public function addAction(Action $action)
    {
        $actions = $this->actions->toArray();
        array_unshift($actions, $action);

        $this->actions = new ArrayCollection($actions);

        return $this;
    }

    /**
     * Remove action
     *
     * @param Action $action
     * @return $this
     */
    public function removeAction(Action $action)
    {
        $this->actions->removeElement($action);

        return $this;
    }

    /**
     * Get actions
     *
     * @return ArrayCollection $actions
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
     * Get the status of the task
     *
     * The status of a task is equivalent to the last status of the last action
     *
     * @return string
     */
    public function getStatus()
    {
        return $this->status;
    }

    /**
     * Set the status of the task
     *
     * @param string $status
     *
     * @return $this
     */
    public function setStatus($status)
    {
        $this->status = $status;

        return $this;
    }

    /**
     * Get createdAt
     *
     * @return \Datetime $createdAt
     */
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    /**
     * Get updatedAt
     *
     * @return \Datetime $updatedAt
     */
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    /**
     * Set endedAt
     *
     * @param \Datetime $endedAt
     *
     * return $this
     */
    public function setEndedAt(\Datetime $endedAt)
    {
        $this->endedAt = $endedAt;

        return $this;
    }

    /**
     * Get endedAt
     *
     * @return \Datetime
     */
    public function getEndedAt()
    {
        return $this->endedAt;
    }

    /**
     * Set processKey
     *
     * @param string $processKey
     *
     * return $this
     */
    public function setProcessKey($processKey)
    {
        if (null !== $this->processKey) {
            throw new \InvalidArgumentException('A process key is already defined.');
        }

        $this->processKey = $processKey;

        return $this;
    }

    /**
     * Get processKey
     *
     * @return string
     */
    public function getProcessKey()
    {
        return $this->processKey;
    }

    /**
     * Set taskCount
     *
     * @param string $taskCount
     *
     * return $this
     */
    public function setTaskCount($taskCount)
    {
        $this->taskCount = $taskCount;

        return $this;
    }

    /**
     * Get taskCount
     *
     * @return string
     */
    public function getTaskCount()
    {
        return $this->taskCount;
    }
}
