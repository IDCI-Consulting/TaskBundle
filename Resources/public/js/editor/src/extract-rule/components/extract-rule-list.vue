<template>

    <div>
      <div class="description">{{ description }}</div>
      <multiselect
        v-model="selectedExtractRuleService"
        :options="extractRuleServiceList"
        :allow-empty="false"
        deselect-label="Selected"
        select-label=""
        @input="onChange"
        placeholder="Select an extract rule service">
      </multiselect>
      <hr>
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
    },
    description: function () {
      let usedExtractRule = this.$store.getters.getUsedExtractRule;
      return this
        .$store
        .getters
        .getExtractRuleDescription(usedExtractRule.service)
      ;
    }
  },

  methods: {
    onChange: function (extractRuleName) {
        this.$store.commit('updateUsedExtractRuleService', extractRuleName);
        this.$store.commit('cleanUsedParameters');
    }
  }

};

</script>

<style>
  .editor.extract-rule-editor div.parameters .form-group .form-control-wrapper textarea {
    min-height: 60px;
  }

  .editor .description {
    font-style: italic;
    padding: 5px;
  }
</style>
