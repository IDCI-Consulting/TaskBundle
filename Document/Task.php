<?php

/**
 * @author Brahim Boukoufallah <brahim.boukoufallah@idci-consulting.fr>
 */

namespace IDCI\Bundle\TaskBundle\Document;

use Doctrine\Common\Collections\ArrayCollection;
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
    const CREATED = 'created';

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
    }

    /**
     * Create a task from a task configuration
     *
     * @param string            $source
     * @param TaskConfiguration $taskConfiguration
     * @param mixed             $extractedData
     * @param array             $actionData
     *
     * @throws \Exception
     *
     * @return Task
     */
    public static function createFromTaskConfiguration(
        $source,
        TaskConfiguration $taskConfiguration,
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
            ->addAction($action)
            ->setData($taskData)
            ->setConfiguration($configuration)
            ->setTaskConfigurationId($taskConfiguration->getId())
        ;

        return $task;
    }

    /**
     * Create a task from a single action
     *
     * @param string $source
     * @param string $actionServiceName
     * @param array  $data
     *
     * @return Task
     */
    public static function createFromAction($source, $actionServiceName, $data)
    {
        $taskData = new TaskData();
        $taskData
            ->setExtractedData($data)
        ;

        $action = new Action();
        $action
            ->setName($actionServiceName)
            ->addStatus(ActionStatus::PENDING)
        ;

        $task = new Task($source);
        $task
            ->addAction($action)
            ->setData($taskData)
        ;

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
     * Set task configuration id.
     *
     * @param string $taskConfigurationId
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
        return $this->getCurrentAction()->getCurrentStatus()->getStatus();
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
}
