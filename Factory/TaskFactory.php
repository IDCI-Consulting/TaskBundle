<?php

namespace IDCI\Bundle\TaskBundle\Factory;

use Doctrine\ORM\EntityManager;
use Ramsey\Uuid\Uuid;
use IDCI\Bundle\TaskBundle\Document\Task;
use IDCI\Bundle\TaskBundle\Handler\WorkflowHandler;

class TaskFactory
{
    /**
     * @var string
     */
    private $applicationName;

    /**
     * @var string
     */
    private $taskConfigurationClass;

    /**
     * @var WorkflowHandler
     */
    protected $workflowHandler;

    /**
     * Constructor.
     *
     * @param string        $applicationName
     * @param string        $taskConfigurationClass
     */
    public function __construct($applicationName, $taskConfigurationClass, WorkflowHandler $workflowHandler) {
        $this->applicationName        = $applicationName;
        $this->taskConfigurationClass = $taskConfigurationClass;
        $this->workflowHandler        = $workflowHandler;
    }

    /**
     * Create a task
     *
     * @param array $options
     *
     * @throws \Exception
     *
     * @return Task
     */
    public function create($options) {
        $taskConfiguration = isset($options['task_configuration']) ? $options['task_configuration'] : null;
        $processKey = isset($options['process_key']) ? $options['process_key'] : null;
        $taskCount = isset($options['task_count']) ? $options['task_count'] : null;
        $source = isset($options['source']) ? $options['source'] : $this->applicationName;

        if (null !== $taskConfiguration) {
            $extractedData = array();
            $actionData = array();

            if (array_key_exists('extracted_data', $options['data'])) {
                $extractedData = $options['data']['extracted_data'];
            }

            if (array_key_exists('action_data', $options['data'])) {
                $actionData = $options['data']['action_data'];
            }

            $task = Task::createFromTaskConfiguration(
                $source,
                $processKey,
                $taskCount,
                $taskConfiguration,
                $extractedData,
                $actionData
            );

            if ($this->workflowHandler->hasSequentialAction($task)) {
                $source .= "-sequential";
                $task->setSource($source);
            }

            return $task;
        }

        if (array_key_exists('action_service', $options)) {
            $processKey = isset($options['data']['process_key'])
                ? $options['data']['process_key']
                : null;

            $taskConfigurationSlug = null;
            if (isset($options['data']['task_configuration_slug'])) {
                $taskConfigurationSlug = $options['data']['task_configuration_slug'];
                unset($options['data']['task_configuration_slug']);
            }

            $task = Task::createFromAction(
                $source,
                $processKey,
                $options['action_service'],
                $options['data'],
                $taskConfigurationSlug
            );

            return $task;
        }

        throw new \InvalidArgumentException('The task factory could not create a task with these options');
    }
}
