<template>

    <div class="collapsed-block">
        <div>
            <button @click.prevent="remove" aria-label="Close" class="close">
                <span aria-hidden="true">×</span>
            </button>
            <strong>{{ action.action }}</strong>
            <div class="options extra-form-inputs-required">
                <div class="form-group">
                    <label>name</label>
                    <input class="form-control" v-model="actionAccessName" type="text"/>
                </div>
                <div class="form-group">
                    <label>parameters</label>
                    <parameter
                        v-for="(parameterOption, parameterName) in getActionParameters(action.action)"
                        :key="parameterName"
                        :name="parameterName"
                        :option="parameterOption"
                        :value="action.parameters[parameterName]"
                        @parameterupdated="updateParameter"
                    ></parameter>
                </div>
            </div>
        </div>
    </div>

</template>

<script>

import parameter from '../../common/components/parameter.vue';

export default {

    props: ['index'],

    data: function () {
        return {
            actionAccessName: null
        };
    },

    computed: {
        action: function () {
            let action = this.$store.getters.getActionConfiguration(this.index);
            this.actionAccessName = action.name;

            return action;
        }
    },

    watch: {
        actionAccessName: {
            handler: function (newActionName) {
                let payload = {
                    actionIndex: this.index,
                    name: newActionName
                }

                this.$store.commit('updateActionName', payload);
            }
        }
    },

    components: {
        'parameter': parameter
    },

    methods: {
        updateParameter: function (parameter) {
            let payload = {
                actionIndex: this.index,
                parameter: parameter
            };

            this.$store.commit('updateParameter', payload);
        },

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

            if (null != action) {
                return action.parameters;
            }

            return {};
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
        }
    }
};

</script>
