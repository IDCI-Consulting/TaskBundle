import Vue from 'vue';
import extractRuleEditor from './components/editor.vue';

/**
 * Trigger the extract rule Vue editor.
 *
 * @param {(string|Object)} element - The DOM element to trigger the editor
 */
function triggerVueEditor(element) {
  Vue.component('extract-rule-editor', extractRuleEditor);

  /**
   * The app
   */
  new Vue({
    el: element
  });
}

export { triggerVueEditor }
