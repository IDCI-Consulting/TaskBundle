<template>

    <div class="row">
        <configured-action-name-list @changed="updateSelectedName"></configured-action-name-list>
        <button @click.prevent="createFlow" type="button" class="btn" aria-label="Create">
            <i class="icofont icofont-plus"></i>
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
