<template>
    <div class="workflow-editor editor">
        <new-action></new-action>
        <actions-configuration></actions-configuration>
    </div>
</template>

<script>

import newAction from './new-action.vue';
import actionsConfiguration from './actions-configuration.vue';

export default {
    components: {
        'new-action': newAction,
        'actions-configuration': actionsConfiguration
    }
}
</script>
