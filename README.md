IDCITaskBundle
=============

The purpose of this bundle is to add an easy way to asynchronously process CPU-intensive scripts. This bundle use RabbitMq to solve those issues.
A CPU-intensive script is called an **action**.  
If you want to understand how this bundle works, you need the basics about [rabbitmq](http://www.rabbitmq.com/).

Introduction
------------

### Glossary

* An "extract_rule" refers to a php script that will get an array of data, and will create a task for each item of this array.
* An "action" is a script doing any work you want. It can be triggered by other previous actions in a definable and predictable order, or can be the entrypoint of a worflow.
* A "workflow" refers to the way actions are linked together. You can use conditions depending of the results of previous actions to trigger an action or another.
* A "task" refers to multiple actions linked together for one extracted data.
* A "task configuration" is composed of an extract_rule, actions and worflow to define how tasks are processed.

### Lifecycle of a task

A task can be created in 2 different ways. The processor service is the entrypoint of this bundle. See the **Usage** part of the documentation for more details.

**A single action with some (or no) data to process**

![Task lifecycle](Resources/doc/task-lifecycle-single.png)

* 1 - The **task producer** send a message with the name of an action and some data (or no data).
* 2 - The **task consumer** create a single task from these data and use the **action producer** to send the created task.
* 3 - The **action consumer** retrieve the task to run the single action.

**A complex configuration with a workflow and multiple actions**

![Task lifecycle](Resources/doc/task-lifecycle-configuration.png)

* 1 - The **extract_rule producer** send a message to rabbitmq with the name of the extract rule.
* 2 - The **extract rule consumer** extract the data and use the **task producer** to send a message with the data array.
* 3 - The **task consumer** create the tasks for each item in the data array, and use the **action producer** to send the created task.
* 4 - The **action consumer** read the configuration to run the action depending on the workflow. An action can lead to another one or just end the process.

Installation
------------

Add dependencies in your `composer.json` file:
```json
"require": {
    ...,
    "idci/task-bundle": "dev-master",
}
```

Enable bundles in your application kernel:
```php
<?php
// app/AppKernel.php

public function registerBundles()
{
    $bundles = array(
        // ...
        new IDCI\Bundle\TaskBundle\IDCITaskBundle(),
        new Doctrine\Bundle\DoctrineBundle\DoctrineBundle(),
        new Doctrine\Bundle\MongoDBBundle\DoctrineMongoDBBundle(),
        new IDCI\Bundle\AssetLoaderBundle\IDCIAssetLoaderBundle(),
        new FOS\RestBundle\FOSRestBundle(),
        new JMS\SerializerBundle\JMSSerializerBundle(),
        new OldSound\RabbitMqBundle\OldSoundRabbitMqBundle(),
    );
}
```

Import the bundle configuration:
```yml
# app/config/config.yml

imports:
    - { resource: @IDCITaskBundle/Resources/config/config.yml }

doctrine:
    dbal:
        default_connection: default
        connections:
            default:
                driver:   pdo_mysql
                host:     "%database_host%"
                port:     "%database_port%"
                dbname:   "%database_name%"
                user:     "%database_user%"
                password: "%database_password%"
                charset:  UTF8

    orm:
        auto_generate_proxy_classes: "%kernel.debug%"
        default_entity_manager: default
        entity_managers:
            default:
                connection: default
                mappings:
                    IDCITaskBundle: ~
```

Update your parameters.yml file
```yml
application_name: 'Task Runner'
task_database_host: localhost
task_database_port: ~
task_database_name: task_manager
task_database_user: dbuser
task_database_password: dbpwd
task_rabbitmq_host: localhost
task_rabbitmq_port: 5672
task_rabbitmq_user: user
task_rabbitmq_password: password
task_rabbitmq_lazy: false
task_rabbitmq_vhost: /
task_mongo_database_name: task
task_mongo_database_host: 'mongodb://127.0.0.1:27017'
```

Usage
-----

// TODO

Tests
-----

Install bundle dependencies:
```sh
$ make composer-update
```

To execute unit tests:
```sh
$ make phpunit
```
