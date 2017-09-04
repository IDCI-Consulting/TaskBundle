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

            <div v-for="(action, actionName) in flow" :key="actionName">
                <button @click.prevent="removeActionToFlow(actionName)" aria-label="Close" class="close">
                    <span aria-hidden="true">×</span>
                </button>
                <div class="form-group">
                    <label>default next</label>
                    <input class="form-control" type="text" v-model="action.default_next" />
                </div>
                <div class="form-group">
                    <new-next-action></new-next-action>
                    <next-action
                      v-for="(nextAction, index) in action.next"
                      @removed="removeNextAction"
                      :key="index"
                      :index="index"
                      :action="actionName"
                      :nextAction="nextAction"
                    ></next-action>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

import configuredActionNameList from './configured-action-name-list.vue';
import newNextAction from './new-next-action.vue';
import nextAction from './next-action.vue';
import newFlow from './new-flow.vue';

export default {

    props: ['name', 'firstActionName'],

    computed: {
        flow: function () {
            let workflowConfiguration = this.$store.getters.getWorkflowConfiguration;

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
        'new-flow': newFlow
    },

    methods: {
        removeActionToFlow: function (actionName) {
            this.$store.commit('removeActionToFlow', actionName);
        },

        /**
         * Remove the selected next action.
         *
         * @param {Object} payload
         */
        removeNextAction: function (payload) {
            this.$store.commit('removeNextAction', payload);
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
