<template>
    <div class="workflow-editor editor">
        <new-action></new-action>
        <actions-configuration></actions-configuration>
        <workflow></workflow>
    </div>
</template>

<script>

import newAction from './new-action.vue';
import actionsConfiguration from './actions-configuration.vue';
import workflow from './workflow.vue';

export default {
    components: {
        'new-action': newAction,
        'actions-configuration': actionsConfiguration,
        'workflow': workflow
    }
}
</script>
