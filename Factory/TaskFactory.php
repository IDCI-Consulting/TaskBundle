<?php

namespace IDCI\Bundle\TaskBundle\Factory;

use Doctrine\ORM\EntityManager;
use Ramsey\Uuid\Uuid;
use IDCI\Bundle\TaskBundle\Document\Task;

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
     * Constructor.
     *
     * @param string        $applicationName
     * @param string        $taskConfigurationClass
     */
    public function __construct($applicationName, $taskConfigurationClass) {
        $this->applicationName        = $applicationName;
        $this->taskConfigurationClass = $taskConfigurationClass;
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

        if (null !== $taskConfiguration) {
            $extractedData = array();
            $actionData = array();

            if (array_key_exists('extracted_data', $options['data'])) {
                $extractedData = $options['data']['extracted_data'];
            }

            if (array_key_exists('action_data', $options['data'])) {
                $actionData = $options['data']['action_data'];
            }

            return Task::createFromTaskConfiguration(
                $this->applicationName,
                $processKey,
                $taskCount,
                $taskConfiguration,
                $extractedData,
                $actionData
            );
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

            return Task::createFromAction(
                $this->applicationName,
                $processKey,
                $options['action_service'],
                $options['data'],
                $taskConfigurationSlug
            );
        }

        throw new \InvalidArgumentException('The task factory could not create a task with these options');
    }
}
