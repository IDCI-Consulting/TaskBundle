<template>

    <div class="collapsed-block">
        <div>
            <button @click.prevent="remove" aria-label="Close" class="close">
                <span aria-hidden="true">×</span>
            </button>
            <strong>{{ actionName }}</strong>
            <div class="options extra-form-inputs-required">
                <div class="form-group">
                    <label>name</label>
                    <input class="form-control" v-model="actionAccessName" type="text"/>
                </div>
                <div class="form-group">
                    <label>parameters</label>
                    <parameter
                        v-for="(parameterOptions, parameterName) in getActionParameters(actionName)"
                        :key="parameterName"
                        :name="parameterName"
                        :options="parameterOptions"
                        :value="parameters[parameterName]"
                    ></parameter>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

import parameter from '../../common/components/parameter.vue';

export default {

    props: ['actionName', 'accessName', 'parameters'],

    data: function () {
        return {
            actionAccessName: this.name,
            actionParameters: this.parameters
        };
    },

    computed: {
        id: function () {
            return 'path_event_action_' + generateUniqueId();
        },
        configuredActions: function () {
            return this.$store.getters.getConfiguredActions;
        }
    },

    watch: {
        actionName: {
            handler: function (actionName) {
                this.$emit('updateName', actionName);
            }
        }
    },

    components: {
        'parameter': parameter
    },

    methods: {

        /**
         * Check if the path event action type has a configuration
         *
         * @returns {boolean}
         */
        hasConfiguration: function () {
            return Object.keys(this.pathEventActionType).length > 0;
        },

        /**
         * Check if the path event action type has a configuration
         *
         * @returns {boolean}
         */
        getActionParameters: function (actionName) {
            let action = this.$store.getters.getAction(actionName);

            return action.parameters;
        },

        /**
         * Remove a path event action
         */
        remove: function () {
            this.$emit('remove');
        },

        /**
         * Update an option
         *
         * @param option
         */
        updateOption: function (option) {
            this.$emit('updateOption', option);
        },

        /**
         * Get the parameters for an action
         *
         * @param key
         */
        getParameterValue: function (key) {
            if (typeof this.parameters !== 'undefined') {
                return this.parameters[key];
            }
        }
  }
};

</script>
