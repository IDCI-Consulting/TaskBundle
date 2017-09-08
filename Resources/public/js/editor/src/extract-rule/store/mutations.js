import Vue from 'vue';

export default {

  /**
   * Set the extract rule list
   *
   * @param state
   * @param {Object[]} extractRuleList
   */
  setExtractRuleList: function (state, extractRuleList) {
    state.extractRuleList = extractRuleList.map(function(element) {
      return {
        name: element
      };
    });
  },

  /**
   * Set the parameters for an extract rule
   *
   * @param state
   * @param {Object} payload
   */
  setExtractRuleParameters: function (state, payload) {
    let parameters = payload.extractRuleParameters;
    for (let key in parameters) {
      parameters[key].component_name = 'component-' + parameters[key].form_type;
    }

    let extractRule = state.extractRuleList.find(function(element) {
      return element.name === payload.extractRuleName;
    });

    Vue.set(extractRule, 'parameters', payload.extractRuleParameters);
  },

  /**
   * Update the used extract rule service
   *
   * @param state
   * @param {Object[]} extractRules
   */
  updateUsedExtractRuleService: function (state, extractRuleService) {
    state.usedExtractRule.service = extractRuleService;

    this.commit('updateInitialTextareaValue');
  },

  /**
   * Update a used extract rule parameter
   *
   * @param state
   * @param {Object[]} extractRules
   */
  updateUsedExtractRuleParameter: function (state, parameter) {
    if (0 === parameter.value.length) {
      Vue.delete(
        state.usedExtractRule.parameters,
        parameter.name
      );
    } else {
      Vue.set(
        state.usedExtractRule.parameters,
        parameter.name,
        parameter.value
      );
    }

    this.commit('updateInitialTextareaValue');
  },

  /**
   * Clean the parameters after the extract rule was changed
   *
   * @param state
   * @param {Object[]} extractRules
   */
  cleanUsedParameters: function (state, parameter) {
    let usedParameters = state.usedExtractRule.parameters;

    let allParameters = state.extractRuleList.find(function (element) {
      return element.name === state.usedExtractRule.service;
    }).parameters;

    for (let usedParameterName in usedParameters) {
      if (typeof allParameters[usedParameterName] === 'undefined') {
        Vue.delete(state.usedExtractRule.parameters, usedParameterName);
      }
    }

    this.commit('updateInitialTextareaValue');
  },

  /**
   * Initialize the extract rule used in the form
   *
   * @param state
   * @returns []
   */
  initializeUsedExtractRule: function (state) {
    let defaultConf = {
      service: null,
      parameters: {}
    };

    if ('' !== state.formProperties.value) {
      let existingConf = JSON.parse(state.formProperties.value);
      Vue.set(state, 'usedExtractRule', Object.assign(defaultConf, existingConf));
    } else {
      Vue.set(state, 'usedExtractRule', defaultConf);
    }
  },

  /**
   * Update the initial textarea value
   *
   * @param state
   * @returns []
   */
  updateInitialTextareaValue: function(state) {
    let parameters = state.usedExtractRule.parameters;
    for (let parameterName in parameters) {
      try {
          parameters[parameterName] = JSON.parse(parameters[parameterName]);
      } catch (e) {}
    }

    let rawExtractRule = JSON.stringify(state.usedExtractRule, null, 4);
    document.getElementById(state.formProperties.id).value = rawExtractRule;
  }

};
