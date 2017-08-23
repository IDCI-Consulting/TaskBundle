import Vue from 'vue';

/**
 * Trigger the Vue editor.
 *
 * @param {(string|Object)} element - The DOM element to trigger the editor
 */
function triggerVueEditor(element) {
  let workflowEditor = {
    componentName: 'action-editor',
    promise: import(/* webpackChunkName: 'workflow-editor' */ './components/workflow-editor/editor.vue')
  };

  workflowEditor.promise.then(function (component) {
    Vue.component(workflowEditor.componentName, component.default);

    /**
     * The app
     */
    new Vue({
      el: element,
    });
  });
}

export { triggerVueEditor }
