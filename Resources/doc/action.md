Actions
=======

An action compute data retrieved by the extract rule. An action can return data if it is necessary.

Actions configuration reference
--------------------------------

The action configuration must be an array (Beginning by `[` and ending by `]`).
One action must be an object with two keys :
* `name`: The access data name & action name. **For the next actions**, you can access to the data computed by the previous
actions like this `{{ action_data.key_name }}`. _i.e_: If the name is _age_, you can access to this data like this `{{ action_data.age }}`
* `action`: the action alias.
* `parameters`: The action parameters.

You also can access to the data computed by the extract rule like this `{{ extracted_data.key_name }}`.
_i.e_: If the key is _id_, you can access to this data like this `{{ extracted_data.id }}`.

```json
[{
    "name": "the_access_data_name",
    "action": "the_action_name",
    "parameters": {
        "parameter_1_name": "parameter_1_value"
        ...
    }
},
...
]
```

See the [action configuration rule](../../Action/ActionConfigurationRule.php)
to understand the configuration structure.

Availables Actions
------------------

* [generate_document](../../Action/GenerateDocumentAction.php)
* [notify](../../Action/NotifyAction.php)

Learn more
----------

* [How to create a custom action](custom_action.md)