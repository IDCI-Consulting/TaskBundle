<template>

    <div class="row">
        <configured-action-name-list class="col-md-10" @changed="updateSelectedName"></configured-action-name-list>
        <div class="col-md-2">
            <button @click.prevent="createFlow" type="button" class="btn btn-default" aria-label="Create">
                Add
            </button>
        </div>
    </div>

</template>

<script>

import configuredActionNameList from './configured-action-name-list.vue';

export default {

    data: function () {
        return {
            selectedName: null,
            errorMessage: ''
        };
    },

    components: {
        'configured-action-name-list': configuredActionNameList
    },

    methods: {
        updateSelectedName: function(name) {
            this.selectedName = name;
        },

        createFlow: function () {
            try {
                let payload = {
                    selectedName: this.selectedName,
                    next: [],
                    default_next: ''
                };

                this.$store.commit('addActionToFlow', payload);
            } catch (error) {
                this.errorMessage = error.message;
            }
        }
    }
};

</script>
