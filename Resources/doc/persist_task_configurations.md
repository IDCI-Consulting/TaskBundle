Persist task configurations
===========================

This bundle does not require the doctrine ORM in order to work properly.
However, you might want to build a nice user interface to manage task configurations (ie add CRUD interfaces), display the task logs, etc.

If so, you will need to add the TaskConfiguration as an entity. Here are the steps:

Step 1: Download DoctrineBundle using composer
----------------------------------------------

Require the bundle with composer:

```bash
$ composer require doctrine/orm "~2.0"
```

Step 2: Enable the doctrine bundle
----------------------------------

Enable the bundle in the kernel:

```php
<?php
// app/AppKernel.php

public function registerBundles()
{
    $bundles = array(
        // ...
        new Doctrine\Bundle\DoctrineBundle\DoctrineBundle(),
        // ...
    );
}
```

Step 3: Create the TaskConfiguration entity
-------------------------------------------

You can use the already ready to use TaskConfiguration class.
In that case, add this mapping file in Resources/config/doctrine:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<doctrine-mapping xmlns="http://doctrine-project.org/schemas/orm/doctrine-mapping"
                  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
                  xsi:schemaLocation="http://doctrine-project.org/schemas/orm/doctrine-mapping
                  http://doctrine-project.org/schemas/orm/doctrine-mapping.xsd">

    <entity name="IDCI\Bundle\TaskBundle\Model\TaskConfiguration" table="task_configuration">
        <id name="id" type="integer" column="id">
            <generator strategy="AUTO"/>
        </id>
    </entity>

</doctrine-mapping>
```

Or you can create an entity which extends the AbstractTaskConfiguration class.
Your ``TaskConfiguration`` class should live in the ``Entity`` namespace of your bundle.
Have a look at [the concrete task configuration class](../../Model/TaskConfiguration)

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
