import Vue from 'vue';
import workflowEditor from './components/editor.vue';

/**
 * Trigger the Vue editor.
 *
 * @param {(string|Object)} element - The DOM element to trigger the editor
 */
function triggerVueEditor(element) {
  Vue.component('workflow-editor', workflowEditor);

  /**
   * The app
   */
  new Vue({
    el: element
  });
}

export { triggerVueEditor }
