<template>

    <div>
        <h4>Post process action list:</h4>
        <div class="form-group">
            <configured-action-name-list @changed="updateSelectedName"></configured-action-name-list>
            <div class="col-md-2">
                <button @click.prevent="addPostProcessAction" type="button" class="btn btn-default" aria-label="Create">
                    <i class="icofont icofont-plus"></i>
                </button>
            </div>
            <ul>
                <li
                    v-for="(action, index) in postProcessActions"
                    :key="index"
                    :index="index"
                    class="post-action">
                    {{ action }}
                    <button @click.prevent="removePostProcessAction(action)" aria-label="Close" class="btn delete">
                        <i class="icofont icofont-close"></i>
                    </button>
                </li>
            </ul>
        </div>
    </div>

</template>


<script>

import configuredActionNameList from './configured-action-name-list.vue';
import newNextAction from './new-next-action.vue';
import nextAction from './next-action.vue';

export default {

    props: ['previousAction', 'action'],

    computed: {
        postProcessActions: function () {
            return this.$store.getters.getPostProcessActions;
        }
    },

    data: function () {
        return {
            selectedName: null,
            errorMessage: ''
        };
    },

    components: {
        'configured-action-name-list': configuredActionNameList,
        'new-next-action': newNextAction,
        'next-action': nextAction
    },

    methods: {
        updateSelectedName: function(name) {
            this.selectedName = name;
        },

        /**
         * Remove the selected next action.
         *
         * @param {Object} payload
         */
        removePostProcessAction: function (payload) {
            this.$store.commit('removePostProcessAction', payload);
        },

        /**
         * Update the first action name.
         *
         * @param {string} defaultNextAction - The default next action name.
         */
        updateDefaultNextAction: function(defaultNextAction) {
            this.$store.commit('updateDefaultNextAction', { defaultNext: defaultNextAction, previousAction: this.previousAction });
        },

        addPostProcessAction: function () {
            try {
                this.$store.commit('addPostProcessAction', this.selectedName);
            } catch (error) {
                this.errorMessage = error.message;
            }
        }
    }
};

</script>

<style>
ul {
    list-style-type: none;
}

.post-action {
    padding: 1em;
}
</style>
