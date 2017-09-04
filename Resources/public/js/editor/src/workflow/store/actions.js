let workflowEditorActions = {
  /**
   * Set the actions retrieved from the API.
   *
   * @param {Object} $store - The store.
   * @param {Object} $http  - The Vue Resource http object.
   */
  setActions: function ($store, $http) {
    workflowEditorActions.handleGetRequest($store.getters.getActionsUrl, $store, $http, function (actions) {
      $store.commit('setActions', actions);
    });
  },

  /**
   * Set the action parameters retrieved from the API.
   *
   * @param {Object} store - The store.
   * @param {Object} payload  - The object with Vue Resource and the action name.
   */
  setActionParameters: function ($store, payload) {
    workflowEditorActions.handleGetRequest($store.getters.getActionParametersUrl(payload.service), $store, payload.http, function (action) {
      $store.commit('setActionParameters', action);
    });
  }
};

export default workflowEditorActions;
