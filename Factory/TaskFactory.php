<?php

namespace IDCI\Bundle\TaskBundle\Factory;

use Doctrine\ORM\EntityManager;
use IDCI\Bundle\TaskBundle\Document\Task;

class TaskFactory
{
    /**
     * Create a task
     *
     * @param EntityManager $em
     * @param array $options
     *
     * @throws \Exception
     *
     * @return Task
     */
    public static function create(EntityManager $em, $options) {
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
          $em->clear('IDCI\Bundle\TaskBundle\Entity\TaskConfiguration');

          $taskConfiguration = $em
              ->getRepository('IDCITaskBundle:TaskConfiguration')
              ->findOneById($options['task_configuration_id'])
          ;

          return Task::createFromTaskConfiguration($taskConfiguration, $extractedData, $actionData);
        }

        if (array_key_exists('action_service', $options)) {
          return Task::createFromAction($options['action_service'], $options['data']);
        }

        throw new \Exception('The task factory could not create a task with these options');
    }
}
