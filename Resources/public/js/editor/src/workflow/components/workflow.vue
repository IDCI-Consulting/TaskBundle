<template>

    <div>
        <div class="form-group">
            <label>workflow name</label>
            <input class="form-control" type="text" @input="updateWorkflowName" :value="workflowName"/>
        </div>
        <div class="form-group">
            <label>first action name</label>
            <configured-action-name-list @changed="updateFirstActionName" :value="workflowFirstActionName"></configured-action-name-list>
        </div>
        <div class="form-group">
            <label>flow</label>

            <new-flow></new-flow>
            <flow
              class="configuration-box"
              v-for="(action, previousAction) in flow"
              :previousAction="previousAction"
              :action="action"
              :key="previousAction"
            ></flow>
        </div>
    </div>

</template>

<script>

import configuredActionNameList from './configured-action-name-list.vue';
import newNextAction from './new-next-action.vue';
import nextAction from './next-action.vue';
import newFlow from './new-flow.vue';
import flow from './flow.vue';

export default {

    props: ['name', 'firstActionName'],

    computed: {
        flow: function () {
            let workflowConfiguration = this.$store.getters.getWorkflowConfiguration;
            console.log(workflowConfiguration);

            if (null != workflowConfiguration) {
                return workflowConfiguration.flows;
            }
        },

        workflowName: function () {
            let workflowConfiguration = this.$store.getters.getWorkflowConfiguration;

            if (null != workflowConfiguration) {
                return workflowConfiguration.name;
            }
        },

        workflowFirstActionName: function () {
            let workflowConfiguration = this.$store.getters.getWorkflowConfiguration;

            if (null != workflowConfiguration) {
                return workflowConfiguration.first_action_name;
            }
        },

        configuredActionNames: function () {
            let actions = this.$store.getters.getActionsConfiguration;

            let names = actions.map(function (action) {
                return action.name;
            });

            if (null === this.selectedRoute && names.length > 0) {
                this.selectedRoute = names[0];
            }

            return names;
        }
    },

    components: {
        'configured-action-name-list': configuredActionNameList,
        'new-next-action': newNextAction,
        'next-action': nextAction,
        'new-flow': newFlow,
        'flow': flow
    },

    methods: {
        removeActionToFlow: function (actionName) {
            this.$store.commit('removeActionToFlow', actionName);
        },

        /**
         * Update the first action name.
         *
         * @param {string} selectedName - The selected name.
         */
        updateFirstActionName: function(selectedName) {
            this.$store.commit('updateFirstActionName', selectedName);
        },

        /**
         * Update the first action name.
         *
         * @param {string} defaultNextAction - The default next action name.
         */
        updateDefaultNextAction: function(defaultNextAction) {
            this.$store.commit('updateDefaultNextAction', defaultNextAction);
        },

        /**
         * Update the first action name.
         *
         * @param {string} selectedName - The selected name.
         */
        updateWorkflowName: function(event) {
            this.$store.commit('updateWorkflowName', event.target.value);
        }
    },

    watch: {
        workflowName: {
            handler: function (newWorkflowName) {
                this.$store.commit('updateWorkflowName', newWorkflowName);
            }
        }
    }
};

</script>
