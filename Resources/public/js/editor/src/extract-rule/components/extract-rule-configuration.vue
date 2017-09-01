<template>

  <div class="form-group">
      <label>parameters</label>
      <parameter
          v-for="(option, name) in parameters"
          :key="name"
          :name="name"
          :option="option"
          @change="updateParameterValue"
          :value="usedParameters[name]"
      ></parameter>
  </div>

</template>

<script>

import parameterComponent from'TaskBundle/common/components/parameter.vue';

export default {

  components: { 'parameter': parameterComponent },

  computed: {
    parameters: function () {
      let usedExtractRule = this.$store.getters.getUsedExtractRule;
      let parameters = this
        .$store
        .getters
        .getExtractRuleParameters(usedExtractRule.extract_rule)
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
