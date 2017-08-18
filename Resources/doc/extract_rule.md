Extract Rule
============

An extract rule is the entrypoint of a task. It will extract data according to rule given in configuration.
A task has **only one** extract rule.

Extract rule configuration reference
------------------------------------

The extract rule configuration must be a json object (Beginning by `{` and ending by `}`).
This json object has two keys :
* `extract_rule`: The extract rule alias.
* `parameters`: The extract rule parameters.

```json
{
    "extract_rule": "the_extract_rule_name",
    "parameters": {
        "parameter_1_name": "parameter_1_value"
        ...
    }
}
```

See the [extract rule configuration rule](../../ExtractRule/ExtractRuleConfigurationRule.php)
to understand the configuration structure.

How to create a custom extract rule 
-----------------------------------

You can create a custom extract rule by extending the abstract extract rule class,
[AbstractExtractRule](../../ExtractRule/AbstractExtractRule.php). See already created extract rule to have inspiration.

Availables Extract rules
------------------------

* [participations](../../ExtractRule/ParticipationsExtractRule.php)