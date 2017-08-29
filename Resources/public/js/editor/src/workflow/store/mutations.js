import Vue from 'vue';

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

  /**
   * Set the action parameters.
   *
   * @param {Object} state  - The state
   * @param {Object} action - The action object.
   *
   */
  setActionParameters: function (state, action) {
    for (let key in action.parameters) {
      action.parameters[key].component_name = 'component-' + action.parameters[key].form_type;
    }

    let findedAction = state.actions.find(function (element) {
      return element.name === action.name
    });

    Vue.set(findedAction , 'parameters', action.parameters);
  },

  /**
   * Add action.
   *
   * @param {Object} state - The state.
   * @param {Object} payload - The object with the action.
   *
   */
  addAction: function (state, payload) {
    state.data.actions.push(payload);
  },

  /**
   * Add action.
   *
   * @param {Object} state - The state.
   * @param {Object} payload - The object with the action.
   *
   */
  removeAction: function (state, payload) {
    console.log(JSON.stringify(state.data.actions[payload.actionIndex], null, 2));
    state.data.actions.splice(payload.actionIndex, 1);
  }
};
