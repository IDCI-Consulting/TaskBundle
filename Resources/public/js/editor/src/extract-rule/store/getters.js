export default {

  /**
   * Get the url of the api to retrieve extract rules
   *
   * @param state
   * @returns string
   */
  getExtractRulesApiUrl: function (state) {
    return state.configuration.api_url.get_extract_rules;
  },

  /**
   * Get the extract rules
   *
   * @param state
   * @returns []
   */
  getExtractRules: function (state) {
    return state.extractRules;
  },

};
