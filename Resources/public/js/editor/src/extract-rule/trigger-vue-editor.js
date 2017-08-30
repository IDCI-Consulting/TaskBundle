import Vue from 'vue';
import Vuex from 'vuex';
import Multiselect from 'vue-multiselect';
import VueResource from 'vue-resource';
import extractRuleEditor from './components/editor.vue';
import extractRuleEditorGetters from './store/getters.js';
import extractRuleEditorMutations from './store/mutations.js';
import extractRuleEditorActions from './store/actions.js';
import {
  actions as commonActions,
  mutations as commonMutations,
  getters as commonGetters
} from 'vue-editor-commons';

/**
 * Trigger the extract rule Vue editor.
 *
 * @param {(string|Object)} element - The DOM element to trigger the editor
 * @param {Object} configuration - Object containing the editor configuration (api url, etc)
 * @param {Object} formProperties - Object containing the properties of the default form
 */
function triggerVueEditor(element, configuration, formProperties) {

  Vue.use(Vuex);
  Vue.use(VueResource);
  Vue.component('extract-rule-editor', extractRuleEditor);

  /**
   * The common state
   */
  var extractRuleEditorStore = new Vuex.Store({
    state: {
      configuration: configuration,
      formProperties: formProperties,
      extractRuleList: [],
      apiCache: {},
      usedExtractRule: {}
    },
    getters: Object.assign(extractRuleEditorGetters, commonGetters),
    mutations: Object.assign(extractRuleEditorMutations, commonMutations),
    actions: Object.assign(extractRuleEditorActions, commonActions)
  });

  /**
   * The app
   */
  new Vue({
    el: element,
    store: extractRuleEditorStore,

    /**
     * Call the APIs before creating the app
     */
    beforeCreate: function () {
      extractRuleEditorStore.dispatch('setExtractRules', this.$http);
    },
    created: function () {
      this.$store.commit('initializeUsedExtractRule');
    }
  });

}

export { triggerVueEditor }
