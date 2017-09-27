export default {

  /**
   * Get the url of the api to retrieve extract rules
   *
   * @param state
   * @returns string
   */
  getExtractRuleListApiUrl: function (state) {
    return state.configuration.api_url.get_extract_rules;
  },

  /**
   * Get the url of the api to retrieve extract rules parameters
   *
   * @param state
   * @returns string
   */
  getExtractRuleParametersApiUrl: function (state) {
    return function (serviceName) {
      return state
        .configuration
        .api_url
        .get_extract_rules_parameters
        .replace('XNAME', serviceName)
      ;
    }
  },

  /**
   * Get the extract rule list
   *
   * @param state
   * @returns []
   */
  getExtractRuleList: function (state) {
    return state.extractRuleList;
  },

  /**
   * Get the used extract rule
   *
   * @param state
   * @returns {Object}
   */
  getUsedExtractRule: function (state) {
    return state.usedExtractRule;
  },

  /**
   * Get the extract rule parameters for the given extract rule name
   *
   * @param state
   * @returns {Object}
   */
  getExtractRuleParameters: function (state, getters) {
    return function (extractRuleServiceName) {
      let extractRule = getters.getExtractRuleList.find(function (element) {
        return element.name === extractRuleServiceName;
      });

      if (null != extractRule) {
        return extractRule.parameters;
      }
    }

  },

  /**
   * Return the JSON string of used extract rule
   *
   * @returns {string}
   */
  getRawJSON: function (state) {
    return JSON.stringify(state.usedExtractRule, null, 2);
  }

};
