<template>

  <div class="row">
    <div class="col-md-10">
        <multiselect
          v-model="selectedAction"
          :options="actionList"
          label="name"
          key="name"
          selectLabel=""
          placeholder="Select an action service"
        >
        </multiselect>
    </div>
    <div class="col-md-2">
        <button @click.prevent="createAction" type="button" class="btn btn-default" aria-label="Create">
            Add
        </button>
    </div>
  </div>

</template>

<script>

import multiSelect from 'vue-multiselect';

export default {

  props: ['index'],

  data: function () {
    return {
      selectedAction: null,
      errorMessage: ''
    };
  },

  components: {
    'multiselect': multiSelect
  },

  computed: {
    actionList: function () {
      let actionList = this.$store.getters.getActionList;

      if (null === this.selectedAction && actionList.length > 0) {
        this.selectedAction = actionList[0];
      }

      return actionList;
    }
  },

  methods: {
    createAction: function () {
      try {
        let payload = {
          name: '',
          action: this.selectedAction.name,
          parameters: {}
        };

        this.$store.commit('addAction', payload);
      } catch (error) {
        this.errorMessage = error.message;
      }
    }
  },

  watch: {
      selectedAction: {
          handler: function (selectedAction) {
              if (null != selectedAction) {
                  this.$store.dispatch('setActionParameters', { http: this.$http, action: selectedAction.name });
              }
          }
      }
  }
};

</script>
