<template>

    <div v-if="parameters" class="collapsed-block parameters">
        <a role="button" data-toggle="collapse" :href="'#'+ id" class="collapsed">
            Parameters
            <span class="toggle">
              <i class="fa fa-plus-circle" aria-hidden="true"></i>
              <i class="fa fa-minus-circle" aria-hidden="true"></i>
            </span>
        </a>
        <div :id="id" class="panel-collapse collapse" role="tabpanel" aria-expanded="false" :aria-controls="id">
            <parameter
                v-for="(option, name) in parameters"
                :key="name"
                :name="name"
                :option="option"
                :value="usedParameters[name]"
                :required-star="true"
                @change="updateParameterValue"
            ></parameter>
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
    parameters: function () {
      let usedExtractRule = this.$store.getters.getUsedExtractRule;
      let parameters = this
        .$store
        .getters
        .getExtractRuleParameters(usedExtractRule.service)
      ;

      return parameters;
    },

    usedParameters: function () {
      let usedExtractRule = this.$store.getters.getUsedExtractRule;

      return usedExtractRule.parameters;
    }
  },

  methods: {
    updateParameterValue: function (parameter) {
      this.$store.commit('updateUsedExtractRuleParameter', parameter);
    }
  }

};

</script>
