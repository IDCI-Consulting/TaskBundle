<template>

    <div class="collapsed-block">
        <div>
            <button @click.prevent="remove" aria-label="Close" class="close">
                <span aria-hidden="true">×</span>
            </button>
            <strong>{{ action.service }}</strong>
            <div class="options extra-form-inputs-required">
                <div class="form-group">
                    <label>name</label>
                    <input class="form-control" v-model="actionName" type="text"/>
                </div>
                <div class="form-group">
                    <label>parameters</label>
                    <parameter
                        v-for="(parameterOption, parameterName) in getActionParameters(action.service)"
                        :key="parameterName"
                        :name="parameterName"
                        :option="parameterOption"
                        :value="action.parameters[parameterName]"
                        @change="updateParameter"
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
            actionName: null
        };
    },

    computed: {
        action: function () {
            let action = this.$store.getters.getActionConfiguration(this.index);
            this.actionName = action.name;

            return action;
        }
    },

    watch: {
        actionName: {
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

        /**
         * Update parameter
         *
         * @param {Object} parameter - the parameter object.
         */
        updateParameter: function (parameter) {
            let payload = {
                actionIndex: this.index,
                parameter: parameter
            };

            this.$store.commit('updateParameter', payload);
        },

        /**
         * Get the parameters for an action
         *
         * @returns {boolean}
         */
        getActionParameters: function (actionService) {
            let action = this.$store.getters.getAction(actionService);

            if (null != action) {
                return action.parameters;
            }

            return {};
        },

        /**
         * Remove an action
         */
        remove: function () {
            this.$emit('remove');
        }
    }
};

</script>
