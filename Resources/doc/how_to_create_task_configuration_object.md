Create a TaskConfiguration object
=================================

Now, you should have a few available **actions** and **extract_rule** services. Let's create a configuration out of it.

A task configuration is a simple object:

```php
$taskConfiguration = new TaskConfiguration();
```

Extract rule configuration
--------------------------

An extract rule is the entrypoint of a task configuration.

The extract rule configuration must be a json object. This json object has two keys :
* `service`: The extract rule service alias.
* `parameters`: The extract rule parameters.

Which gives use:

```php
$taskConfiguration->setExtractRule(
    '{
        "service": "extract_rule_service_name",
        "parameters": {
            "parameter_1_name": "parameter_1_value"
            ...
        }
    }'
);
```

See the [extract rule configuration rule](../../ExtractRule/ExtractRuleConfigurationRule.php) to understand the configuration structure.

Workflow configuration
----------------------

A workflow is composed of 2 concepts: **actions** and a **workflow** to link actions.

### Actions configuration

The action configuration must be a json array. One action must be an object with at least two keys :
* `service`: the action service alias.
* `parameters`: The action parameters.
In case you use a service multiple times in a workflow, you can specify a name.
* `name`: The access data name & action name.
In the next actions, you can access the data computed by the previous actions like this {{ action_name.key }}.

You also can access to the data computed by the extract rule like this `{{ extracted_data.key_name }}`.

See the [action configuration rule](../../Action/ActionConfigurationRule.php)
to understand the configuration structure.

### Workflow configuration

A workflow specify actions that will be executed in a configured order.
You can dynamically set the next actions by adding conditional **flows**.

The workflow configuration must be a json object.
This json object has three keys :
* `name` : The workflow name
* `first_action_name`: The first action name (equals to `name` in the action configuration).
* `actions`: The actions workflow. This parameter is an object.

Which gives use:

```php
$taskConfiguration->setWorkflow(
    '{
        "actions": [
           {
               "name": "action_name_1",
               "service": "action_service_name",
               "parameters": {
                   "parameter_1_name": "parameter_1_value"
                   ...
               }
           },
           {
              "name": "action_name_2",
              "service": "action_service_name",
              "parameters": {
                  "parameter_1_name": "parameter_1_value"
                  "parameter_2_name": "parameter_2_value"
                  ...
              }
          },
          ...
        ],
        "workflow": {
            "name": "workflow_name",
            "first_action_name": "action_name_1",
            "flows": {
                "action_name_1": {
                    "default_next": "action_name_2"
                }
            }
        }
    }'
);
```

See the [workflow configuration rule](../../Workflow/WorkflowConfigurationRule.php)
to understand the configuration structure.

// TODO: add information on conditions in flows, and enable and cron expression

Summary
-------

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
