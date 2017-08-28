var extractRuleEditorActions = {

  /**
   * Set the extract rules in the store
   *
   * @param $store
   * @param $http
   */
   setExtractRules: function ($store, $http) {
    var url = $store.getters.getExtractRulesApiUrl;
    extractRuleEditorActions.handleGetRequest(url, $store, $http, function (extractRules) {
      $store.commit('setExtractRules', extractRules);
    });
  }

}

export default extractRuleEditorActions;
