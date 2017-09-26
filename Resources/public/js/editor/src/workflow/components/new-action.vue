<template>

  <div class="row">
    <div class="col-md-12 error" v-if="errorMessage !== ''">
        {{ errorMessage }}
        <i class="fa fa-exclamation-circle"></i>
    </div>
    <div class="col-md-10">
        <multiselect
          v-model="selectedActionService"
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
        this.errorMessage = '';
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
