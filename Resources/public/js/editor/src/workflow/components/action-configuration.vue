<template>

    <div class="configuration-box parameters">
        <button @click.prevent="remove" aria-label="Close" class="close">
            <span aria-hidden="true">×</span>
        </button>
        <h5>Chosen service: <strong>{{ action.service }}</strong></h5>
        <div class="collapsed-block">
            <div class="form-group">
                <label>name</label>
                <input class="form-control" v-model="actionName" type="text"/>
            </div>
            <a role="button" data-toggle="collapse" :href="'#'+ id" class="collapsed">
                Parameters
                <span class="toggle">
                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                    <i class="fa fa-minus-circle" aria-hidden="true"></i>
                </span>
            </a>
            <div :id="id" class="panel-collapse collapse" role="tabpanel" aria-expanded="false" :aria-controls="id">
                <parameter
                  v-for="(parameterOption, parameterName) in parameters"
                  :key="parameterName"
                  :name="parameterName"
                  :option="parameterOption"
                  :value="action.parameters[parameterName]"
                  :required-star="true"
                  @change="updateParameter"
                ></parameter>
            </div>
        </div>
    </div>

</template>

<script>

import parameter from '../../common/components/parameter.vue';
import { utils } from 'vue-editor-commons';
import 'TaskBundle/common/styles/collapsed-block.css';
import 'TaskBundle/common/styles/editor.css';

export default {

    props: ['index'],

    data: function () {
        return {
            actionName: null
        };
    },

    computed: {
        id: function () {
            return 'action_parameters' + utils.generateUniqueId();
        },

        action: function () {
            let action = this.$store.getters.getActionConfiguration(this.index);
            this.actionName = action.name;

            return action;
        },

        parameters: function () {
            return this.getActionParameters(this.action.service);
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
