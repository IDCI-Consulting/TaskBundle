<template>

    <div>
        <div v-for="(action, index) in actionsConfiguration" :key="action.name">
            <new-action-configuration
              :key="index"
              :actionName="action.action"
              :accessName="action.name"
              :parameters="action.parameters"
              @remove="removeAction(action, index)"
            ></new-action-configuration>
        </div>
    </div>

</template>

<script>

import newActionConfiguration from './new-action-configuration.vue';

export default {

    props: ['index'],

    computed: {
        actionsConfiguration: function () {
            return this.$store.getters.getActionsConfiguration;
        }
    },

    components: {
        'new-action-configuration': newActionConfiguration
    },

    methods: {

        /**
         * Get the action parameters from the action list
         *
         * @param actionName
         *
         * @return {}
         */
        getActionParameters: function (actionName) {
            let action = this.$store.getters.getAction(actionName);

            return action.parameters;
        },

        /**
         * Check if a form event contains path event actions
         *
         * @param formEvent
         */
        formEventHasActions: function (formEvent) {
            return this.pathEventActions && this.pathEventActions[formEvent.name];
        },

        /**
         * Remove a path event action
         *
         * @param formEvent
         * @param actionIndex
         */
        removeAction: function (action, index) {
            this.$store.commit('removeAction', {
                actionIndex: index
            });
        },

        /**
         * Update the name of a path event action
         *
         * @param name
         * @param formEvent
         * @param actionIndex
         */
        updatePathEventActionName: function (name, formEvent, actionIndex) {
            this.$store.commit('updatePathEventActionName', {
                pathIndex: this.index,
                formEventName: formEvent.name,
                actionIndex: actionIndex,
                actionName: name
            });
        },

        /**
         * Update an option of a path event action
         *
         * @param option
         * @param formEvent
         * @param actionIndex
         */
        updatePathEventActionOption: function (option, formEvent, actionIndex) {
            this.$store.commit('updatePathEventActionOption', {
                pathIndex: this.index,
                formEventName: formEvent.name,
                actionIndex: actionIndex,
                option: option
            });
        }

  }
};

</script>
