<template>

    <div class="extract-rule-editor editor">
      <extract-rule-list></extract-rule-list>
    </div>

</template>

<script>

import extractRuleListComponent from './extract-rule-list.vue';

export default {

  data: function () {
    return {
      textarea: this.$store.state.formProperties
    };
  },

  components: { 'extract-rule-list': extractRuleListComponent },

  created: function () {
    if ('' !== this.textarea.value) {
      this.$store.commit('initializeUsedExtractRule', this.textarea.value);
    }
  }

};

</script>
