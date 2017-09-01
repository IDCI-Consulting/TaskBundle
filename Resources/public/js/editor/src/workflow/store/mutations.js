import Vue from 'vue';

export default {
  /**
   * Initialize workflow data with form data.
   *
   * @param {Object} state - The state.
   */
  initializeWorkflowData: function (state) {
    let formValue = JSON.parse(state.configuration.form.value);
    let initialStateData = state.data;

    if (null != state.configuration.form.value) {
      state.data = formValue;
    }

    // If the parsed object is empty; restore initial state data.
    if (Object.keys(formValue).length <= 0) {
      state.data = initialStateData;
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

  /**
   * Update workflow name.
   *
   * @param {Object} state - The state.
   * @param {string} name  - The workflow name.
   */
  updateWorkflowName: function (state, name) {
    state.data.workflow.name = name;

    this.commit('updateRawField');
  },

  /**
   * Update first action name.
   *
   * @param {Object} state - The state.
   * @param {string} name  - The first action name.
   */
  updateFirstActionName: function (state, name) {
    state.data.workflow.first_action_name = name;

    this.commit('updateRawField');
  },

  /**
   * Add an action to the flow
   *
   * @param {Object} state - The state.
   * @param {Object} payload - the payload.
   */
  addActionToFlow: function (state, payload) {
    let action = {
      next: payload.next,
      default_next: payload.default_next
    };

    Vue.set(state.data.workflow.actions, payload.selectedName, action);

    this.commit('updateRawField');
  },

  /**
   * Remove an action to the flow
   *
   * @param {Object} state - The state.
   * @param {string} actionName - The action name.
   */
  removeActionToFlow: function (state, actionName) {
    Vue.delete(state.data.workflow.actions, actionName);

    this.commit('updateRawField');
  },
  /**
   * Add a next action to selected action in the flow.
   *
   * @param {Object} state - The state.
   * @param {Object} payload - the payload.
   */
  addNextAction: function (state, payload) {
    let nextAction = {
      name: payload.actionName,
      condition: payload.condition
    };

    state.data.workflow.actions[payload.selectedName].next.push(nextAction);

    this.commit('updateRawField');
  },

  /**
   * Remove the configured next action in the flow.
   *
   * @param {Object} state - The state.
   * @param {Object} payload - The payload that contains the index of the next action & the action where the next action is configured.
   */
  removeNextAction: function (state, payload) {
    state.data.workflow.actions[payload.action].next.splice(payload.index, 1);

    this.commit('updateRawField');
  },


  /**
   * Update next action name.
   *
   * @param {Object} state - The state.
   * @param {Object} payload - The payload.
   */
  updateNextActionName: function (state, payload) {
    Vue.set(
      state.data.workflow.actions[payload.action].next[payload.index],
      'name',
      payload.name
    );

    this.commit('updateRawField');
  },

  /**
   * Update next action condition.
   *
   * @param {Object} state - The state.
   * @param {Object} payload - The payload.
   */
  updateNextActionCondition: function (state, payload) {
    Vue.set(
      state.data.workflow.actions[payload.action].next[payload.index],
      'condition',
      payload.condition
    );

    this.commit('updateRawField');
  },

  /**
   * Update the form field hidden.
   *
   * @param {Object} state - The state.
   */
  updateRawField: function (state) {
    let raw = JSON.stringify(state.data, null, 4);

    let element = document.getElementById(state.configuration.form.id);
    element.value = raw;
  }
};