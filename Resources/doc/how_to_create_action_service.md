Creation an action service
==========================

An "action" compute data retrieved by the extract rule or by previous actions.

Create the Action class
-----------------------

First you need to create an Action class that extend [AbstractAction](../../Action/AbstractAction.php).
The action class only has two required method `configureOptions()` and `doExecute()`:

```php
<?php
namespace IDCI\Bundle\TaskBundle\Action;

use Symfony\Component\OptionsResolver\OptionsResolver;
use IDCI\Bundle\TaskBundle\Action\AbstractAction;

class MyAction extends AbstractAction
{
    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setRequired(array('number_one', 'number_two'))
            ->setAllowedTypes(array(
                'number_one' => array('int'),
                'number_two' => array('int'),
            ))
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function doExecute(array $options)
    {
        // The AbstractAction provides a getLogger method to log.
        $this->getLogger()->info('Begin multiplication.');

        // The AbstractAction provides two methods:
        // $this->getTaskConfigurationSlug(); // returns task configuration slug.
        // $this->getCurrentActionName() // returns current aciton name.

        $result = $options['number_one'] * $options['number_two'];

        return $result;
    }


    /**
     * {@inheritdoc}
     */
    public function isSequential()
    {
        return true; // False by default
    }
}
```

Inside `configureOptions`, you can use the [Symfony OptionResolver component](http://symfony.com/doc/current/components/options_resolver.html)
and define the Action parameters.

Inside `doExecute`, do whatever you want. In our example, we do a multiplication.

Inside `isSequential`, you MUST return a boolean that tells if the action has to be runned sequentially. The business logic will handle automatically the way to run actions.
By default an action is not sequential. This method was implemented because of TaskBundle allows to run actions concurrently. See https://stackoverflow.com/a/21363518.
**Important** : If one action is sequential in the configuration. The whole workflow will be run in sequential mode.

Register your class as a tagged service
---------------------------------------

```yml
services:
    idci_task.action.get_user_age:
        parent: idci_task.action.abstract #
        class: Path\To\Your\Action\MyAction
        tags:
            - { name: "idci_task.action", alias: "my_action" }
```

Add the configuration
---------------------

If you want to use the editor:

```yml
idci_task:
    actions:
        my_action:
            description: "An dummy action"
            parameters:
                number_one: { form_type: integer, options: { required: true } }
                number_two: { form_type: integer, options: { required: true } }
```

Available form_type values are:
* checkbox
* choice
* integer
* number
* text
* textarea

(List available here: https://github.com/IDCI-Consulting/vue-editor-commons/tree/master/components/options)

Available options are:
* required (boolean)
* help (string)

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
- [Persist a task configuration](persist_task_configurations.md)
- [Use the task configuration form type](editors.md)
- [How to run tasks](how_to_run_tasks.md)
- [How to scale your application to run tasks concurrently](scalability.md)
- [How to separate actions in different applications](routing.md)
- [Example](example.md)
- [UML](uml.md)
