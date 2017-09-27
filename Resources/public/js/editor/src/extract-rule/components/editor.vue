<template>

    <div class="extract-rule-editor editor">
      <modal
        :header="'Workflow raw JSON'"
        :body="rawJSON"
       ></modal>
      <extract-rule-list></extract-rule-list>
      <extract-rule-configuration></extract-rule-configuration>
    </div>

</template>

<script>

import extractRuleListComponent from './extract-rule-list.vue';
import extractRuleConfigurationComponent from './extract-rule-configuration.vue';
import 'TaskBundle/common/styles/editor.css';
import modal from 'TaskBundle/common/components/json-raw-button.vue';

export default {
  components: {
    'extract-rule-list': extractRuleListComponent,
    'extract-rule-configuration': extractRuleConfigurationComponent,
    'modal': modal
  },

  computed: {
    rawJSON: function () {
      return this.$store.getters.getRawJSON;
    }
  }
};

</script>
