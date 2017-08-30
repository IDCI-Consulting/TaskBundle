var extractRuleEditorActions = {

  /**
   * Set the extract rules in the store
   *
   * @param $store
   * @param $http
   */
   setExtractRules: function ($store, $http) {
    var url = $store.getters.getExtractRuleListApiUrl;
    extractRuleEditorActions.handleGetRequest(url, $store, $http, function (extractRuleList) {
      $store.commit('setExtractRuleList', extractRuleList);
    });
  }

}

export default extractRuleEditorActions;
