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
  }

};
