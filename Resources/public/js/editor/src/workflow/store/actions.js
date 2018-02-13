let workflowEditorActions = {
  /**
   * Set the actions retrieved from the API.
   *
   * @param {Object} $store - The store.
   * @param {Object} $http  - The Vue Resource http object.
   */
  setActions($store, $http) {
    return new Promise((resolve, reject) => {
      workflowEditorActions.handleGetRequest($store.getters.getActionsUrl, $store, $http, (actions) => {
        $store.commit('setActions', actions);
        resolve();
      });
    });
  },

  /**
   * Set the action parameters retrieved from the API.
   *
   * @param {Object} store - The store.
   * @param {Object} payload  - The object with Vue Resource and the action name.
   */
  setActionParameters($store, payload) {
    return new Promise((resolve, reject) => {
      workflowEditorActions.handleGetRequest($store.getters.getActionParametersUrl(payload.service), $store, payload.http, (action) => {
        $store.commit('setActionParameters', action);
        resolve();
      });
    });
  }
};

export default workflowEditorActions;
