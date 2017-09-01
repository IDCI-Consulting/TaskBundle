<template>

    <div class="extract-rule-editor editor">
      <extract-rule-list></extract-rule-list>
      <extract-rule-configuration></extract-rule-configuration>
    </div>

</template>

<script>

import extractRuleListComponent from './extract-rule-list.vue';
import extractRuleConfigurationComponent from './extract-rule-configuration.vue';
import 'TaskBundle/common/styles/editor.css';

export default {
  components: {
    'extract-rule-list': extractRuleListComponent,
    'extract-rule-configuration': extractRuleConfigurationComponent
  }
};

</script>
