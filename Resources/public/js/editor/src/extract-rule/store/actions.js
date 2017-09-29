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

  /**
   * Set the extract rule parameters and description
   *
   * @param $store
   * @param payload
   * @returns {Promise}
   */
  setExtractRuleData: function ($store, payload) {
    return new Promise(function(resolve, reject) {
      var url = $store.getters.getExtractRuleParametersApiUrl(payload.extractRuleName);
      extractRuleEditorActions.handleGetRequest(url, $store, payload.http, function (response) {
        $store.commit('setExtractRuleData', {
          extractRuleName: payload.extractRuleName,
          extractRuleParameters: response.parameters,
          extractRuleDescription: response.description
        });
        resolve();
      });
    });
  }

}

export default extractRuleEditorActions;
