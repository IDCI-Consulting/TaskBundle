
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

  getActionList: function (state) {
    return state.actions;
  },

  getAction: function (state) {
    return function (name) {
      return state.actions.find(function (element) {
        return element.name === name
      });
    }
  },

  getActionsConfiguration: function (state) {
    return state.data.actions;
  }

}
