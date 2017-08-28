<template>
    <div class="extract-rule-editor editor">
      <multiselect
        v-model="selectedExtractRule"
        :options="extractRules"
        label="name"
        key="name"
        selectLabel=""
        placeholder="Select an extract rule">
      </multiselect>
    </div>
</template>

<script>

import 'TaskBundle/common/styles/multiselect.css';
import multiselect from 'vue-multiselect'

export default {

  props: ['index'],

  components: { 'multiselect': multiselect },

  data: function () {
    return {
      selectedExtractRule: null
    };
  },

  computed: {
    extractRules: function () {
      var extractRules = this.$store.getters.getExtractRules;

      this.selectedExtractRule = extractRules[0];

      return extractRules;
    }
  }

};

</script>
