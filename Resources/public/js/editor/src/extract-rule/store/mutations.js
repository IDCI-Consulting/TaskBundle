var mutations = {

  /**
   * Set the extract rules
   *
   * @param state
   * @param {Object[]} extractRules
   */
  setExtractRules: function (state, extractRules) {
    state.extractRules = extractRules.map(function(element) {
      return {
        name: element
      };
    });
  }

}

export default mutations;
