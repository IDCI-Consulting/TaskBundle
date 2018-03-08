<template>

  <div class="row new-action">
      <div class="error" v-if="errorMessage !== ''">
        {{ errorMessage }}
        <i class="fa fa-exclamation-circle"></i>
      </div>
      <multiselect
         v-model="selectedActionService"
         :options="actionList"
         label="name"
         key="name"
         selectLabel=""
         placeholder="Select an action service">
      </multiselect>
      <button @click.prevent="createFlow" type="button" class="btn" aria-label="Create">
        <i class="icofont icofont-plus"></i>
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

<style>
    .new-action .error {
        color: #c9302c;
        padding: 5px 5px 5px 15px;
    }
</style>
