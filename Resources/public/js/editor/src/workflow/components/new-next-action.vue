<template>

    <div>
        <configured-action-name-list @changed="updateSelectedName"></configured-action-name-list>
        <button @click.prevent="createNextAction" type="button" class="btn btn-default" aria-label="Create">
            Add
        </button>
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

        createNextAction: function () {
            try {
                let payload = {
                    selectedName: this.selectedName,
                    actionName: '',
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
