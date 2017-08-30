<template>

    <div>
        <multiselect
          v-model="selectedRoute"
          :options="configuredActionNames"
          selectLabel=""
          placeholder="Select an action configured above">
        </multiselect>
        <button @click.prevent="createRoute" type="button" class="btn btn-default" aria-label="Create">
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
            selectedRoute: null,
            errorMessage: ''
        };
    },

    components: {
        'multiselect': multiSelect
    },

    computed: {
        configuredActionNames: function () {
            let actions = this.$store.getters.getActionsConfiguration;

            let names = actions.map(function (action) {
                return action.name;
            });

            if (null === this.selectedRoute && names.length > 0) {
                this.selectedRoute = names[0];
            }

            return names;
        }
    },

    methods: {
        createRoute: function () {
            try {
                let payload = {
                    route: this.selectedRoute,
                    parameters: {}
                };

                //this.$store.commit('addRoute', payload);
            } catch (error) {
                this.errorMessage = error.message;
            }
        }
    }
};

</script>
