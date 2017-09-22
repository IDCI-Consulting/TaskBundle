Creation an action service
==========================

- [Introduction](../../README.md#introduction)
    - [Glossary](../../README.md#glossary)
    - [Lifecycle of a task](../../README.md#lifecycle-of-a-task)
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

An "action" compute data retrieved by the extract rule or by previous actions.

Create the Action class
-----------------------

First you need to create an Action class that extend [AbstractAction](../../Action/AbstractAction.php).
The action class only has two required method `configureOptions()` and `doExecute()`:

```php
<?php
namespace IDCI\Bundle\TaskBundle\Action;

use IDCI\Bundle\TaskBundle\Action\AbstractAction;
use Symfony\Component\OptionsResolver\OptionsResolver;

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
        $result = $options['number_one'] * $options['number_two'];

        return $result;
    }
}
```

Inside `configureOptions`, you can use the [Symfony OptionResolver component](http://symfony.com/doc/current/components/options_resolver.html)
and define the Action parameters.

Inside `doExecute`, do whatever you want.

Register your class as a tagged service
---------------------------------------

```yml
services:
    idci_task.action.get_user_age:
        parent: idci_task.action.abstract
        class: Path\To\Your\Action\MyAction
        tags:
            - { name: "idci_task.action", alias: "my_action" }
```

More
----

See the [example part](example.md) for a concrete example.