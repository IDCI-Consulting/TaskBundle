<template>

    <div>
      <multiselect
        v-model="selectedExtractRule"
        :options="extractRuleList"
        :allow-empty="false"
        placeholder="Select an extract rule">
      </multiselect>
    </div>

</template>

<script>

import 'TaskBundle/common/styles/multiselect.css';
import multiselect from 'vue-multiselect'

export default {

  components: { 'multiselect': multiselect },

  data: function () {
    return {
      selectedExtractRule: null
    };
  },

  created: function () {
    console.log(this.$store.getters.getUsedExtractRule.extract_rule);
    this.selectedExtractRule = this.$store.getters.getUsedExtractRule.extract_rule;
  },

  watch: {
    selectedExtractRule: function (newSelectedExtractRule) {
      this.$store.commit('updateUsedExtractRule', newSelectedExtractRule);
    }
  },

  computed: {
    extractRuleList: function () {
      return this.$store.getters.getExtractRuleList.map(
        function (element) {
          return element.name;
        }
      );
    }
  }

};

</script>
