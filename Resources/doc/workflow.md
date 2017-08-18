Workflow
========
A workflow is the path which determine actions will be executed in a configured order.
It is possible to add condition for the next action.

Workflow configuration reference
--------------------------------

The workflow configuration must be a json object (Beginning by `{` and ending by `}`).
This json object has three keys :
* `name` : The workflow name
* `first_action_name`: The first action name (equals to `name` in [action configuration](action.md).
* `actions`: The actions workflow. This parameter is an object. See below : 

```json
{
    "name": "workflow_1",
    "first_action_name": "action_name_1",
    "actions" : {
        "action_name_1": {
             "destinations": {
                 "action_name": "the_condition",
                 "action_name_2": "{{ extracted_data.id ? 1 : 0 }}"
             },
             "default_destination": "action_name_3"
        },
        ...
    }
}
```

See the [workflow configuration rule](../../Workflow/WorkflowConfigurationRule.php)
to understand the configuration structure.
