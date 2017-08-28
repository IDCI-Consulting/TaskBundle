export default {
  /**
   * Set the actions retrieved from the API.
   *
   * @param {Object} state   - The state
   * @param {Array}  actions - The action names
   */
  setActions: function (state, actions) {
    state.actions = actions.map(function (element) {
      return {
        name: element
      };
    });
  },

  setActionParameters: function (state, action) {
    state.actions.find(function (element) {
      return element.name === action.name
    }).parameters = action.parameters;
  }
};
