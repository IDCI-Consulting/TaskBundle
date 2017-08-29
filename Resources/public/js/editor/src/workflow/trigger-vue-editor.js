import Vue from 'vue';
import Vuex from 'vuex';
import VueResource from 'vue-resource';
import MultiSelect from 'vue-multiselect';
import {actions as commonActions, mutations as commonMutations, getters as commonGetters} from 'vue-editor-commons';
import workflowEditor from './components/editor.vue';
import workflowGetters from './store/getters.js';
import workflowMutations from './store/mutations.js';
import workflowActions from './store/actions.js';

/**
 * Trigger the Vue editor.
 *
 * @param {(string|Object)} element - The DOM element to trigger the editor.
 * @param {Object} configuration - The editor configuration.
 */
function triggerVueEditor(element, configuration) {

  Vue.component('workflow-editor', workflowEditor);
  Vue.use(Vuex);
  Vue.use(VueResource);
  Vue.use(MultiSelect);

  var store = new Vuex.Store({
    state: {
      configuration: configuration,
      actions: [],
      apiCache: {},
      data: {
        actions: [],
        workflow: {}
      }
    },

    getters: Object.assign(
      workflowGetters,
      commonGetters
    ),

    mutations: Object.assign(
        workflowMutations,
        commonMutations
    ),

    actions: Object.assign(
        workflowActions,
        commonActions
    )
  });

  /**
   * The app
   */
  new Vue({
    el: element,

    beforeCreate: function () {
      store.dispatch('setActions', this.$http);
    },

    store: store
  });
}

export { triggerVueEditor }
