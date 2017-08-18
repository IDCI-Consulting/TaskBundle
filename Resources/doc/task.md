A Task
======

Introduction
------------

A task makes it possible to run a sequence of actions according to
extracted data and a workflow.

See [Task entity](../../Entity/Task.php) to be aware with all attributes.

A task has three important parts; **Extract rule**, **Actions** and **Workflow**.

Extract rule
------------

The **Extract rule** attribute is a configuration (in _json_) which tells us what kind of data we want to extract. You can see
the extract rule configuration reference and the availables extract rules [here](extract_rule.md).
Each data extracted will be available by a variable named **extracted_data** (See [action configuration reference](action.md)
for more information).

Actions
-------

The **Actions** attribute is a configuration (in _json_) which tells us the scripts will be running
from the extract rule above.
You can see the Callback configuration reference and the availables actions [here](action.md).

Workflow
--------

The **Workflow** attribute is a configuration (in _json_) which tells us
