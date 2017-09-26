Create an extract rule service
==============================

An "extract_rule" is a service which goal is to return data.

Create the ExtractRule class
------------------------------

First you need to create an ExtractRule class that extend [AbstractExtractRule](../../ExtractRule/AbstractExtractRule.php).
You need to implement 2 methods: `configureOptions()` and `doExtract()`:

```php
<?php

use Symfony\Component\OptionsResolver\OptionsResolver;
use IDCI\Bundle\TaskBundle\ExtractRule\AbstractExtractRule;

class MyExtractRule extends AbstractExtractRule
{
    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setRequired(array('parameter1'))
            ->setAllowedTypes(array(
                'parameter1' => array('integer')
            ))
            ....
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function doExtract(array $parameters)
    {
        // make good use of the parameters to retrieve data
        $data = ...

        return $data;
    }

    ...
}
```

Inside `configureOptions`, you can use the [Symfony OptionResolver component](http://symfony.com/doc/current/components/options_resolver.html)
and define the ExtractRule parameters.

Inside `doExtract`, fetch your data any way you want with the parameters.
In case the returned data is an array, a task for each item will be created.
In case of a single value or object, a single task will be created.

**IMPORTANT /!\ : If the data contains objects, those objects must implements the [JsonSerializable](http://php.net/manual/en/class.jsonserializable.php) interface.**

Register your class as a tagged service
---------------------------------------

```yml
services:
    idci_task.extract_rule.my_extract_rule:
        class: Path\To\Your\ExtractRule\MyExtractRule
        tags:
            - { name: "idci_task.extract_rule", alias: "my_extract_rule" }
```

More
----

See the [example part](example.md) for a concrete example.

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
- [How to run tasks](how_to_run_tasks.md)
- [How to scale your application to run tasks concurrently](scalability.md)
- [How to separate actions in different applications](routing.md)
- [Example](example.md)
- [UML](uml.md)
