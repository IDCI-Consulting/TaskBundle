<template>
    <div class="workflow-editor editor">
        <modal
         :header="'Workflow raw JSON'"
         :body="rawJSON"
         ></modal>
        <h3>Action settings</h3>
        <new-action></new-action>
        <actions-configuration></actions-configuration>

        <h3>Workflow setting</h3>
        <workflow></workflow>
    </div>
</template>

<script>

import newAction from './new-action.vue';
import actionsConfiguration from './actions-configuration.vue';
import workflow from './workflow.vue';
import modal from 'TaskBundle/common/components/json-raw-button.vue';

export default {
    components: {
        'new-action': newAction,
        'actions-configuration': actionsConfiguration,
        'workflow': workflow,
        'modal': modal
    },

    computed: {
        rawJSON: function () {
            return this.$store.getters.getRawJSON;
        }
    }
}

</script>

<style>

.editor .form-group {
    flex-direction: column;
}

.editor .btn, .editor .configuration-box.parameters .btn {
  float: right;
}

</style>
