<template>

    <div>
        <multiselect
            v-model="selectedActionService"
            :options="actionList"
            label="name"
            key="name"
            selectLabel=""
            placeholder="Select an action">
        </multiselect>
        <button @click.prevent="createAction" type="button" class="btn btn-default" aria-label="Create">
            Add
        </button>
    </div>

</template>

<script>

import multiSelect from 'vue-multiselect';

export default {

  props: ['index'],

  data: function () {
    return {
      selectedActionService: null,
      errorMessage: ''
    };
  },

  components: {
    'multiselect': multiSelect
  },

  computed: {
    actionList: function () {
      let actionList = this.$store.getters.getActionList;
      if (null === this.selectedActionService && actionList.length > 0) {
        this.selectedActionService = actionList[0];
      }

      return actionList;
    }
  },

  methods: {
    createAction: function () {
      try {
        let payload = {
          name: '',
          service: this.selectedActionService.name,
          parameters: {}
        };

        this.$store.commit('addAction', payload);
      } catch (error) {
        this.errorMessage = error.message;
      }
    }
  },

  watch: {
      selectedActionService: {
          handler: function (selectedActionService) {
              if (null != selectedActionService) {
                  this.$store.dispatch('setActionParameters', { http: this.$http, service: selectedActionService.name });
              }
          }
      }
  }
};

</script>
