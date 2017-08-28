
export default {
  getEditorId: function (state) {
    return state.configuration.editorId;
  },

  getActionsUrl: function (state) {
    return state.configuration.api_urls.get_actions;
  },

  getActionParametersUrl: function (state) {
    return function (name) {
      return state.configuration.api_urls.get_action_parameters.replace('ACTION_NAME', name);
    }
  },

  getActionsList: function (state) {
    return state.actions;
  },

  getActionParameters: function (state) {
    return function (action) {
      return state.parameters[action];
    }
  },

  getActionParameters: function (state) {
    return function (name) {
      return state.actions.find(function (element) {
        return element.name === name
      }).parameters;
    }
  }
}
