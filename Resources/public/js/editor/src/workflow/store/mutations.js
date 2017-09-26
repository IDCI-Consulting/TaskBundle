import Vue from 'vue';
import { JsonToTwigTransformer } from 'vue-editor-commons';

export default {

  /**
   * Initialize workflow data with form data.
   *
   * @param {Object} state - The state.
   */
  initializeWorkflowData: function (state) {
    if (state.configuration.form.value) {
      let formValue = JSON.parse(state.configuration.form.value);
      let initialStateData = state.data;

      state.data = formValue;

      // If the parsed object is empty; restore initial state data.
      if (Object.keys(formValue).length <= 0) {
        state.data = initialStateData;
      }
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

    for (let configuredAction of state.actions) {
      if (configuredAction.name === action.name) {
        Vue.set(configuredAction, 'parameters', action.parameters);
      }
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
    for (let action of state.data.actions) {
      if ((payload.name === action.name) && (payload.service === action.service)) {
        throw new Error('You have to configure the action named "' + payload.service + '" before adding a new same action.');
      }
    }

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
   * Update parameter.
   *
   * @param {Object} state - The state.
   * @param {Object} payload - The payload.
   *
   */
  updateParameter: function (state, payload) {
    Vue.set(
      state.data.actions[payload.actionIndex].parameters,
      payload.parameter.name,
      payload.parameter.value
    );

    this.commit('updateRawField');
  },

  /**
   * Remove parameter.
   *
   * @param {Object} state - The state.
   * @param {Object} payload - The payload.
   *
   */
  removeParameter: function (state, payload) {
    Vue.delete(
      state.data.actions[payload.actionIndex].parameters,
      payload.parameter.name
    );

    this.commit('updateRawField');
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

    Vue.set(state.data.workflow.flows, payload.selectedName, action);

    this.commit('updateRawField');
  },

  /**
   * Remove an action to the flow
   *
   * @param {Object} state - The state.
   * @param {string} actionName - The action name.
   */
  removeActionToFlow: function (state, actionName) {
    Vue.delete(state.data.workflow.flows, actionName);

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

    state.data.workflow.flows[payload.previousAction].next.push(nextAction);

    this.commit('updateRawField');
  },

  /**
   * Remove the configured next action in the flow.
   *
   * @param {Object} state - The state.
   * @param {Object} payload - The payload that contains the index of the next action & the action where the next action is configured.
   */
  removeNextAction: function (state, payload) {
    Vue.delete(
        state.data.workflow.flows[payload.previousAction].next,
        payload.index
    );

    this.commit('updateRawField');
  },

  /**
   * Update default next action of a given action.
   *
   * @param {Object} state - The state.
   * @param {Object} payload - The payload that contains the previousAction and the default next action.
   */
  updateDefaultNextAction: function (state, payload) {
    Vue.set(
        state.data.workflow.flows[payload.previousAction],
        'default_next',
        payload.defaultNext
    );

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
      state.data.workflow.flows[payload.action].next[payload.index],
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
      state.data.workflow.flows[payload.previousAction].next[payload.index],
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
    let actions = state.data.actions;
    for (let action of actions) {
      for (let name in action.parameters) {
        try {
          action.parameters[name] = JSON.parse(action.parameters[name]);
        } catch (e) {}
      }
    }

    let raw = JSON.stringify(state.data, null, 4);

    let element = document.getElementById(state.configuration.form.id);
    element.value = raw;
  }
};
