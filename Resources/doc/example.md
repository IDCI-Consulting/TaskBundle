Example
=======

Here is an example of a simple task configuration, whose purpose is to run 2 simple actions:
* One that will calculate the age of a user
* Another one that will log the result
An extract rule will be used to retrieve some users.

User entity
-----------

```php
<?php

namespace My\Bundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 * @ORM\Table(name="user")
 */
class User implements \JsonSerializable
{
    /**
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @ORM\Column(name="name", unique=true, type="string", length=100)
     */
    private $name;

    /**
     * @ORM\Column(name="birthdate", type="datetime")
     */
    private $birthdate;

    public function __construct($name, \DateTime $birthdate)
    {
        $this->name = $name;
        $this->birthdate = $birthdate;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getName()
    {
        return $this->name;
    }

    public function getBirthdate()
    {
        return $this->birthdate;
    }

    public function jsonSerialize() {
        return array(
            'birthdate' => $this->birthdate,
            'name'      => $this->name
        );
    }
}

```

For the sake of this example, let's imagine those 3 Users are persisted in database:

```php
<?php
$bob  = new User('bob',  new \DateTime('1991-03-15'));
$john = new User('john', new \DateTime('1997-09-22'));
$milo = new User('milo', new \DateTime('8520-08-20'));
```

The extract rule
----------------

We create a class called MysqlUserExtractRule that will be used to retrieve some users.

```php
<?php
namespace My\Bundle\ExtractRule;

use Doctrine\ORM\EntityManager;
use IDCI\Bundle\TaskBundle\ExtractRule\AbstractExtractRule;
use Symfony\Component\OptionsResolver\OptionsResolver;

class MysqlUserExtractRule extends AbstractExtractRule
{
    /**
     * @var EntityManager
     */
    private $em;

    /**
     * Constructor
     *
     * @param EntityManager $em
     *
     */
    public function __construct(EntityManager $em)
    {
        $this->em = $em;
    }

    /**
     * {@inheritDoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setRequired(array('names'))
            ->setAllowedTypes(array(
                'names' => array('array')
            ))
            ->setAllowedValues('names', function (array $names) {
                // We already know it is an array as types are validated first
                foreach ($names as $name) {
                    if (!is_string($name)) {
                        return false;
                    }
                }

                return true;
            });
        ;
    }

    /**
     * {@inheritDoc}
     */
    public function doExtract(array $parameters, $offset)
    {
        $users = $this
            ->em
            ->getRepository('Test:User')
            ->findByName($parameters['names'], array(), null, $offset)
        ;

        if (count($users) < 1) {
            throw new \Exception(sprintf(
                'No users with names %s found',
                implode(', ', $parameters['names'])
            ));
        }

        return $users;
    }

    /**
     * {@inheritDoc}
     */
    public function getTotalCount()
    {
        $parameters = $this->getParameters();

        return = $this
            ->em
            ->getRepository('Test:User')
            ->count(array(
                'name' => array('names' => $parameters),
            ))
        ;
    }
}
```

We register that class as a service with the **idci_task.extract_rule** tag.

```yml
services:
    idci_task.extract_rule.mysql_user:
        class: My\Bundle\ExtractRule\MysqlUserExtractRule
        arguments:
            - "@doctrine.orm.entity_manager"
        tags:
            - { name: "idci_task.extract_rule", alias: "mysql_user" }
```

The actions
-----------

We create an action that will calculate the age of a user.

```php
<?php
namespace My\Bundle\Action;

use Symfony\Component\OptionsResolver\OptionsResolver;
use IDCI\Bundle\TaskBundle\Action\AbstractAction;

class GetUserAgeAction extends AbstractAction
{
    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setRequired(array('user_birthdate'))
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function doExecute(array $options)
    {
        $this->getLogger()->info('Calculate the age of the user');

        $birthdate = new \DateTime($options['user_birthdate']);
        $now = new \DateTime('now');


        if ($birthdate > $now) {
            throw new \Exception('Cannot calculate an age for a user which was not born yet');
        }

        $interval = $now->diff($birthdate);

        $this->getLogger()->info('Age calculated');

        return array('age' => $interval->y);
    }
}
```

We create another action that will log the result:

```php
<?php
namespace My\Bundle\Action;

use Symfony\Component\OptionsResolver\Options;
use Symfony\Component\OptionsResolver\OptionsResolver;
use IDCI\Bundle\TaskBundle\Action\AbstractAction;

class LogUserAgeAction extends AbstractAction
{
    /**
     * {@inheritdoc}
     */
    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver
            ->setRequired(array('user_name', 'user_age'))
            ->setAllowedTypes(array(
                'user_name' => array('string'),
                'user_age'  => array('string', 'integer')
            ))
            ->setNormalizer('user_age', function (Options $options, $value) {
                if (is_string($value)) {
                    $value = intval($value);
                }

                return $value;
            })
        ;
    }

    /**
     * {@inheritdoc}
     */
    public function doExecute(array $options)
    {
        $this->getLogger()->info('Log the age of the user');
        $this->getLogger()->info(sprintf('User %s is %s years old', $options['user_name'], $options['user_age']));
        $this->getLogger()->info('Age logged in mongo');
    }
}
```

We register those classes as services:

```yml
services:
    idci_task.action.get_user_age:
        parent: idci_task.action.abstract
        class: My\Bundle\Action\GetUserAgeAction
        tags:
            - { name: "idci_task.action", alias: "get_user_age" }

    idci_task.action.log_user_age:
        parent: idci_task.action.abstract
        class: My\Bundle\Action\LogUserAgeAction
        tags:
            - { name: "idci_task.action", alias: "log_user_age" }
```

Run the tasks
-------------

If you want to run a single action, this is a simple as:

```php
$this->get('idci_task.processor.rabbitmq')->startTask('log_user_age', array('user_age' => 21, 'user_name' => 'Andy'));
```

A more complex configuration can be created with the extract rule and the 2 actions:

```php
<?php
$taskConfiguration = new TaskConfiguration();
$taskConfiguration->setName('test_task');
$taskConfiguration->setExtractRule(
    '{
        "service": "mysql_user",
        "parameters": {
            "names": ["bob", "john", "milo"]
        }
    }'
);
$taskConfiguration->setWorkflow(
    '{
        "actions": [{
            "name": "get_user_age",
            "service": "get_user_age",
            "parameters": {
                "user_birthdate": "{{ extracted_data.birthdate.date }}"
            }
        }, {
            "name": "user_notification",
            "service": "log_user_age",
            "parameters": {
                "user_name": "{{ extracted_data.name }}",
                "user_age": "{{ action_data.get_user_age.age }}"
            }
        }],
        "workflow": {
            "name": "workflow_test",
            "first_action_name": "get_user_age",
            "flows": {
                "get_user_age": {
                    "default_next": "user_notification"
                }
            }
        }
    }'
);

$this->get('idci_task.processor.rabbitmq')->startTasks($taskConfiguration);
```

This will run 3 tasks for each user. The 2 first will passed, when the last one will fail as the user has got an impossible birthdate.

We can fix the task in order to resume it:

```php
<?php
$task = $this
    ->get('doctrine.odm.mongodb.document_manager')
    ->getRepository('IDCITaskBundle:Task')
    ->findByStatus(ActionStatus::ERROR)
    ->getNext()
;

// We fix the wrong data that causes the task to fail
$extractedData = $task->getData()->getExtractedData();
$extractedData['birthdate']['date'] = '1993-06-04 00:00:00.000000';
$task->getData()->setExtractedData($extractedData);

$this->processor->resume($task);
```

That's it for now :)

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
