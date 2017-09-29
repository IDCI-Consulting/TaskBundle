The task configuration editor
=============================

Creating a task configuration can be tricky: you need to know the json structure of each part of the configuration (the extract rule, the actions and the worflow)
To ease this, you can create a task configuration thanks to a form type: the TaskConfigurationType.

For example, in a Controller:

```php
$taskConfiguration = new TaskConfiguration();
$this->container->get('form.factory')->create(new TaskConfigurationType(TaskConfiguration::class), $taskConfiguration);
```

This form type is an editor that will fetch the available extract rules and actions from an API.
Therefore in order to use this form you need to add some bundles and configuration.

Installation
------------

Enable bundles in your application kernel:
```php
<?php
// app/AppKernel.php

public function registerBundles()
{
    $bundles = array(
        // ...
        new IDCI\Bundle\AssetLoaderBundle\IDCIAssetLoaderBundle(),
        new FOS\RestBundle\FOSRestBundle(),
        new JMS\SerializerBundle\JMSSerializerBundle(),
    );
}
```

Add the api routing to your routing.yml file:

```yml
idci_task_private_api:
    type:     rest
    resource: "@IDCITaskBundle/Resources/config/routing_api_private.yml"
    prefix:   /api
```

Be aware that you will need to [configure your extract rules](how_to_create_extract_rule_service.md#add-the-configuration) and [actions](how_to_create_action_service.md#add-the-configuration) in order to retrieve data from the api.

Summary
-------

- [Introduction](../../README.md#introduction)
    - [Glossary](../../README.md#glossary)
    - [Simple schema](../../README.md#simple-schema)
    - [Lifecycle of a task with RabbitMq](../../README.md#lifecycle-of-a-task-with-rabbitmq)
- [Installation](../../README.md#installation)
- [Run the tests](../../README.md#run-the-tests)
- [How to create an extract rule service](how_to_create_extract_rule_service.md)
- [How to create an action service](how_to_create_action_service.md)
- [How to create a task configuration object](how_to_create_task_configuration_object.md)
- [Persist a task configuration](persist_task_configurations.md)
- [Use the task configuration form type](editors.md)
- [How to run tasks](how_to_run_tasks.md)
- [How to scale your application to run tasks concurrently](scalability.md)
- [How to separate actions in different applications](routing.md)
- [Example](example.md)
- [UML](uml.md)
