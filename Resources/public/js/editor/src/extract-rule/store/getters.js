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
    return function (name) {
      return state
        .configuration
        .api_url
        .get_extract_rules_parameters
        .replace('XNAME', name)
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
    return function (extractRuleName) {
      let extractRule = getters.getExtractRuleList.find(function (element) {
        return element.name === extractRuleName;
      });

      if (null != extractRule) {
        return extractRule.parameters;
      }
    }

  }

};
