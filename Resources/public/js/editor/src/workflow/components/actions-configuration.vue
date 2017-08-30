<template>

    <div>
        <div v-for="(action, index) in actionsConfiguration" :key="index">
            <action-configuration
              :key="index"
              :index="index"
              @remove="removeAction(action, index)"
            ></action-configuration>
        </div>
    </div>

</template>

<script>

import actionConfiguration from './action-configuration.vue';

export default {

    props: ['index'],

    computed: {
        actionsConfiguration: function () {
            return this.$store.getters.getActionsConfiguration;
        }
    },

    components: {
        'action-configuration': actionConfiguration
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
