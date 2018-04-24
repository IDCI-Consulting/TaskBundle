<template>

    <div class="configuration-box parameters">
        <button type="button" @click.prevent="remove" aria-label="Close" class="btn delete">
            <i class="icofont icofont-close"></i>
        </button>
        <h5>Chosen service: <strong>{{ action.service }}</strong></h5>
        <div class="description">{{ description }}</div>
        <div class="collapsed-block">
            <div class="form-group">
                <label>name</label>
                <span class="error" v-if="errorMessage !== ''">
                    {{ errorMessage }}
                    <i class="fa fa-exclamation-circle"></i>
                </span>
                <input class="form-control" v-model="actionName" type="text" @input="updateActionName(actionName)"/>
            </div>
            <parameter
              v-for="(parameterOption, parameterName) in requiredParameters"
              :key="parameterName"
              :name="parameterName"
              :option="parameterOption"
              :value="action.parameters[parameterName]"
              :required-star="true"
              @change="updateParameter"
              ></parameter>
            <v-collapse-wrapper v-if="hasOptionalParameters()">
              <button type="button" style="display: block" class="btn btn-primary collapsed" v-collapse-toggle>
                  Optional parameters
              </button>
              <div class="panel-collapse collapse" v-collapse-content>
                  <parameter
                    v-for="(parameterOption, parameterName) in optionalParameters"
                    :key="parameterName"
                    :name="parameterName"
                    :option="parameterOption"
                    :value="action.parameters[parameterName]"
                    :required-star="true"
                    @change="updateParameter"
                  ></parameter>
              </div>
            </v-collapse-wrapper>
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
            actionName: null,
            errorMessage: ''
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

        requiredParameters: function () {
          return utils.filterObject(
              this.getActionParameters(this.action.service),
              function(element){
                return element.options.required
              }
          );
        },

        optionalParameters: function () {
          return utils.filterObject(
              this.getActionParameters(this.action.service),
              function(element){
                return !element.options.required
              }
          );
        },

        description: function () {
            return this.$store.getters.getActionDescription(this.action.service);
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

            if (0 === parameter.value.length) {
                this.$store.commit('removeParameter', payload);
            } else {
                this.$store.commit('updateParameter', payload);
            }

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
        },

        /**
         * Has optional parameters.
         *
         * @returns boolean
         */
        hasOptionalParameters: function () {
            return Object.keys(this.optionalParameters).length > 0;
        },

        /**
         * Update action name.
         *
         * @param {string} name
         */
        updateActionName: function(newActionName) {
            try {
                let payload = {
                    actionIndex: this.index,
                    name: newActionName
                }

                this.$store.commit('updateActionName', payload);
                this.errorMessage = '';
            } catch(error) {
                this.errorMessage = error.message;
            }
        }
    }
};

</script>

<style>
    .configuration-box .form-group .error {
        color: #c9302c;
        padding: 5px;
    }
</style>
