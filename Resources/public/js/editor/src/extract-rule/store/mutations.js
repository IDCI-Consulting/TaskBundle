import Vue from 'vue';

var mutations = {

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
   * Update the used extract rule
   *
   * @param state
   * @param {Object[]} extractRules
   */
  updateUsedExtractRule: function (state, extractRuleName) {
    state.usedExtractRule.extract_rule = extractRuleName;

    mutations.updateInitialTextareaValue(state);
  },

  /**
   * Initialize the extract rule used in the form
   *
   * @param state
   * @returns []
   */
  initializeUsedExtractRule: function (state, extractRule) {
    state.usedExtractRule = JSON.parse(extractRule);
  },

  /**
   * Update the initial textarea value
   *
   * @param state
   * @returns []
   */
  updateInitialTextareaValue: function(state) {
    let rawExtractRule = JSON.stringify(state.usedExtractRule, null, 4);
    document.getElementById(state.formProperties.id).value = rawExtractRule;
  }

};

export default mutations;
