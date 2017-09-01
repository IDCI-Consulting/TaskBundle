var extractRuleEditorActions = {

  /**
   * Set the extract rules in the store
   *
   * @param $store
   * @param $http
   */
  setExtractRules: function ($store, $http) {
    return new Promise(function(resolve, reject) {
      var url = $store.getters.getExtractRuleListApiUrl;
      extractRuleEditorActions.handleGetRequest(url, $store, $http, function (extractRuleList) {
        $store.commit('setExtractRuleList', extractRuleList);
        resolve();
      });
    });
  },

  setExtractRuleParameters: function ($store, payload) {
    return new Promise(function(resolve, reject) {
      var url = $store.getters.getExtractRuleParametersApiUrl(payload.extractRuleName);
      extractRuleEditorActions.handleGetRequest(url, $store, payload.http, function (response) {
        $store.commit('setExtractRuleParameters', {
          extractRuleName: payload.extractRuleName,
          extractRuleParameters: response.parameters
        });
        resolve();
      });
    });
  }

}

export default extractRuleEditorActions;
