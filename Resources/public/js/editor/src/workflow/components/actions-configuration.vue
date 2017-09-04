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
            return this.$store.getters.getAction(actionName).parameters;
        },

        /**
         * Remove an action
         *
         * @param action
         * @param index
         */
        removeAction: function (action, index) {
            this.$store.commit('removeAction', {
                actionIndex: index
            });
        }
  }
};

</script>
