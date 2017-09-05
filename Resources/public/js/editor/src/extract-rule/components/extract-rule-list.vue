<template>

    <div>
      <multiselect
        v-model="selectedExtractRuleService"
        :options="extractRuleServiceList"
        :allow-empty="false"
        deselect-label="Selected"
        select-label=""
        placeholder="Select an extract rule service">
      </multiselect>
    </div>

</template>

<script>

import 'TaskBundle/common/styles/multiselect.css';
import multiselect from 'vue-multiselect';

export default {

  components: { 'multiselect': multiselect },

  data: function () {
    return {
      selectedExtractRuleService: null
    };
  },

  created: function () {
    this.selectedExtractRuleService = this.$store.getters.getUsedExtractRule.service;
  },

  watch: {
    selectedExtractRuleService: function (newSelectedExtractRuleService) {
      // Fetch the parameters via the api
      if (null != newSelectedExtractRuleService) {
          this.$store.dispatch('setExtractRuleParameters', {
            http: this.$http,
            extractRuleName: newSelectedExtractRuleService
          }).then(() => {
            this.$store.commit('cleanUsedParameters');
          });
      }
      // Update the data object
      this.$store.commit('updateUsedExtractRuleService', newSelectedExtractRuleService);
    }
  },

  computed: {
    extractRuleServiceList: function () {
      return this.$store.getters.getExtractRuleList.map(
        function (element) {
          return element.name;
        }
      );
    }
  }

};

</script>

<style>
  .editor.extract-rule-editor div.parameters .form-group .form-control-wrapper textarea {
    min-height: 60px;
  }
</style>
