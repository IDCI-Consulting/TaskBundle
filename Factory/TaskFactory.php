<?php

namespace IDCI\Bundle\TaskBundle\Factory;

use Doctrine\ORM\EntityManager;
use IDCI\Bundle\TaskBundle\Document\Task;

class TaskFactory
{
    /**
     * @var EntityManager
     */
    private $entityManager;

    /**
     * @var string
     */
    private $applicationName;

    /**
     * Constructor.
     *
     * @param EntityManager $entityManager
     * @param string        $applicationName
     */
    public function __construct(EntityManager $entityManager, $applicationName) {
        $this->entityManager   = $entityManager;
        $this->applicationName = $applicationName;
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
        if (array_key_exists('task_configuration_id', $options)) {
          $extractedData = array();
          $actionData = array();

          if (array_key_exists('extracted_data', $options['data'])) {
              $extractedData = $options['data']['extracted_data'];
          }

          if (array_key_exists('action_data', $options['data'])) {
              $actionData = $options['data']['action_data'];
          }

          // Force clear cache otherwise it loads the unchanged taskConfiguration
          $this->entityManager->clear('IDCI\Bundle\TaskBundle\Entity\TaskConfiguration');

          $taskConfiguration = $this->entityManager
              ->getRepository('IDCITaskBundle:TaskConfiguration')
              ->findOneById($options['task_configuration_id'])
          ;

          return Task::createFromTaskConfiguration(
              $this->applicationName,
              $taskConfiguration,
              $extractedData,
              $actionData
          );
        }

        if (array_key_exists('action_service', $options)) {
          return Task::createFromAction(
              $this->applicationName,
              $options['action_service'],
              $options['data']
          );
        }

        throw new \Exception('The task factory could not create a task with these options');
    }
}
