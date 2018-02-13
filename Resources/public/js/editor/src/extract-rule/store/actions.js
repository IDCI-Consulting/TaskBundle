var extractRuleEditorActions = {

  /**
   * Set the extract rules in the store
   *
   * @param $store
   * @param $http
   */
  setExtractRules($store, $http) {
    return new Promise((resolve, reject) => {
      var url = $store.getters.getExtractRuleListApiUrl;
      extractRuleEditorActions.handleGetRequest(url, $store, $http, (extractRuleList) => {
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
  setExtractRuleData($store, payload) {
    return new Promise((resolve, reject) => {
      var url = $store.getters.getExtractRuleParametersApiUrl(payload.extractRuleName);
      extractRuleEditorActions.handleGetRequest(url, $store, payload.http, (response) => {
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
