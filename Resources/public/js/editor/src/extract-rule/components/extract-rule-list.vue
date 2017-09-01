<template>

    <div>
      <multiselect
        v-model="selectedExtractRule"
        :options="extractRuleNameList"
        :allow-empty="false"
        placeholder="Select an extract rule">
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
      selectedExtractRule: null
    };
  },

  created: function () {
    this.selectedExtractRule = this.$store.getters.getUsedExtractRule.extract_rule;
  },

  watch: {
    selectedExtractRule: function (newSelectedExtractRuleName) {
      // Fetch the parameters via the api
      if (null != newSelectedExtractRuleName) {
          this.$store.dispatch('setExtractRuleParameters', {
            http: this.$http,
            extractRuleName: newSelectedExtractRuleName
          }).then(() => {
            this.$store.commit('cleanUsedParameters');
          });
      }
      // Update the data object
      this.$store.commit('updateUsedExtractRuleName', newSelectedExtractRuleName);
    }
  },

  computed: {
    extractRuleNameList: function () {
      return this.$store.getters.getExtractRuleList.map(
        function (element) {
          return element.name;
        }
      );
    }
  }

};

</script>
