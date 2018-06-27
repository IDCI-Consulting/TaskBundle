<template>

    <div>
        <div class="parameters">
            <parameter
                v-for="(option, name) in requiredParameters"
                :key="name"
                :name="name"
                :option="option"
                :value="usedParameters[name]"
                :required-star="true"
                @change="updateParameterValue"
            ></parameter>
            <button type="button" style="display: block" class="btn btn-primary collapsed" v-b-toggle="this.id" v-if="hasOptionalParameters()">
                Optional parameters
            </button>
            <b-collapse :id="this.id">
                <div class="parameters">
                  <parameter
                    v-for="(option, name) in optionalParameters"
                    :key="name"
                    :name="name"
                    :option="option"
                    :value="usedParameters[name]"
                    :required-star="true"
                    @change="updateParameterValue"
                  ></parameter>
                </div>
            </b-collapse>
        </div>
    </div>

</template>

<script>

import parameterComponent from'TaskBundle/common/components/parameter.vue';
import { utils } from 'vue-editor-commons';
import 'TaskBundle/common/styles/collapsed-block.css';

export default {

  components: { 'parameter': parameterComponent },

  computed: {
    id: function () {
      return 'extract_rule_parameters_' + utils.generateUniqueId();
    },
    requiredParameters: function () {
      return utils.filterObject(this.getParameters(), function(element){
        return element.options.required;
      });
    },
    optionalParameters: function () {
      return utils.filterObject(this.getParameters(), function(element){
        return !element.options.required;
      });
    },
    usedParameters: function () {
      let usedExtractRule = this.$store.getters.getUsedExtractRule;

      return usedExtractRule.parameters;
    }
  },

  methods: {
    updateParameterValue: function (parameter) {
      this.$store.commit('updateUsedExtractRuleParameter', parameter);
    },
    hasOptionalParameters: function () {
      return Object.keys(this.optionalParameters).length > 0;
    },
    getParameters: function () {
      let usedExtractRule = this.$store.getters.getUsedExtractRule;
      return this
        .$store
        .getters
        .getExtractRuleParameters(usedExtractRule.service)
      ;
    }
  }

};

</script>

<style>

.editor .parameters .btn {
    float: none;
    margin-bottom: 10px;
}

.collapse.show {
    max-height: 500px;
    overflow: auto;
}

</style>
