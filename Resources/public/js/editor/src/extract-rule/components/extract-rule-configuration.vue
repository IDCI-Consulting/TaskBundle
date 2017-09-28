<template>

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
        <div class="collapsed-block" v-if="hasOptionalParameters()">
            <a role="button" data-toggle="collapse" :href="'#'+ id" class="collapsed">
                Optional parameters
                <span class="toggle">
                    <i class="fa fa-plus-circle" aria-hidden="true"></i>
                    <i class="fa fa-minus-circle" aria-hidden="true"></i>
                </span>
            </a>
            <div :id="id" class="panel-collapse collapse" role="tabpanel" aria-expanded="false" :aria-controls="id">
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
      return 'extract_rule_parameters' + utils.generateUniqueId();
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
