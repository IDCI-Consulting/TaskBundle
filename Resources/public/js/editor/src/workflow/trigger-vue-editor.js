import Vue from 'vue';
import Vuex from 'vuex';
import MultiSelect from 'vue-multiselect';
import VueResource from 'vue-resource';
import { Collapse } from 'bootstrap-vue/es/components';
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
  Vue.use(Collapse);
  Vue.use(MultiSelect);

  var store = new Vuex.Store({
    state: {
      configuration: configuration,
      actions: [],
      apiCache: {},
      data: {
        actions: [],
        workflow: {
          first_action_name: "",
          flows: {},
          post_process: []
        }
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

    beforeCreate() {
      this.$store.dispatch('setActions', this.$http).then(() => {
        if (configuration.form.value) {
          let workflowConfiguration = JSON.parse(configuration.form.value);

          for (let key in workflowConfiguration.actions) {
            this.$store.dispatch('setActionParameters', { http: this.$http, service: workflowConfiguration.actions[key].service });
          }
        }
      });

    },

    created() {
      this.$store.commit('initializeWorkflowData');
    },

    store: store
  });
}

export { triggerVueEditor }
