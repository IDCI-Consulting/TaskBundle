
export default {
  getEditorId: function (state) {
    return state.configuration.editorId;
  },

  getActionsUrl: function (state) {
    return state.configuration.api_urls.get_actions;
  },

  getActionParametersUrl: function (state) {
    return function (serviceName) {
      return state.configuration.api_urls.get_action_parameters.replace('ACTION_NAME', serviceName);
    }
  },

  getActionList: function (state) {
    return state.actions;
  },

  getAction: function (state) {
    return function (serviceName) {
      return state.actions.find(function (element) {
        return element.name === serviceName
      });
    }
  },

  getActionsConfiguration: function (state) {
    return state.data.actions;
  },

  getActionConfiguration: function (state) {
    return function (index) {
      return state.data.actions[index];
    }
  },

  getWorkflowConfiguration: function (state) {
    return state.data.workflow;
  },

  getActionDescription: function (state, getters) {
    return function (actionName) {
      let action = getters.getActionList.find(function (element) {
        return element.name === actionName;
      });

      if (action) {
        return action.description;
      }
    };
  },

  /**
   * Return the JSON string of workflow data
   *
   * @returns {string}
   */
  getRawJSON: function (state) {
    return JSON.stringify(state.data, null, 2);
  }
}
