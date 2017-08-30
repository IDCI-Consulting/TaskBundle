import Vue from 'vue';

export default {
  /**
   * Initialize workflow data with form data.
   *
   * @param {Object} state - The state.
   */
  initializeWorkflowData: function (state) {
    if ('' != state.configuration.form.value) {
      state.data = JSON.parse(state.configuration.form.value);
    }
  },

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

    if (null != findedAction) {
      Vue.set(findedAction , 'parameters', action.parameters);
    }
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
    this.commit('updateRawField');
  },

  /**
   * Remove action.
   *
   * @param {Object} state - The state.
   * @param {Object} payload - The object with the action.
   *
   */
  removeAction: function (state, payload) {
    state.data.actions.splice(payload.actionIndex, 1);
    this.commit('updateRawField');
  },

  /**
   * Update the action name in the workflow configuration.
   *
   * @param {Object} state - The state.
   * @param {Object} payload - The payload.
   *
   */
  updateActionName: function (state, payload) {
    state.data.actions[payload.actionIndex].name = payload.name;
    this.commit('updateRawField');
  },

  /**
   * Remove action.
   *
   * @param {Object} state - The state.
   * @param {Object} payload - The payload.
   *
   */
  updateParameter: function (state, payload) {

    let action = state.data.actions[payload.actionIndex];

    for (let parameterName in action.parameters) {

      if (payload.parameter.name === parameterName) {
        action.parameters[parameterName] = payload.parameter.value;
        this.commit('updateRawField');
      }
    }
  },

  updateRawField: function (state) {
    let raw = JSON.stringify(state.data, null, 4);

    let element = document.getElementById(state.configuration.form.id);
    element.value = raw;
  }
};
