<template>

    <div class="row">
        <configured-action-name-list @changed="updateSelectedName" class="col-md-10"></configured-action-name-list>
        <div class="col-md-2">
            <button @click.prevent="createNextAction" type="button" class="btn btn-default" aria-label="Create">
                Add
            </button>
        </div>
    </div>

</template>

<script>

import configuredActionNameList from './configured-action-name-list.vue';

export default {

    props: ['previousAction'],

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

        createNextAction: function () {
            try {
                let payload = {
                    previousAction: this.previousAction,
                    actionName: this.selectedName,
                    condition: ''
                };

                this.$store.commit('addNextAction', payload);
            } catch (error) {
                this.errorMessage = error.message;
            }
        }
    }
};

</script>
