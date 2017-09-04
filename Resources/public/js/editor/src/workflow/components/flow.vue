<template>
    <div>
        <button @click.prevent="removeActionToFlow(previousAction)" aria-label="Close" class="close">
            <span aria-hidden="true">×</span>
        </button>
        <h4>Flow configuration for {{ previousAction }}:</h4>
        <div class="form-group">
            <new-next-action :previousAction="previousAction"></new-next-action>
            <next-action
             v-for="(nextAction, index) in action.next"
             @removed="removeNextAction"
             class="configuration-box"
             :key="index"
             :index="index"
             :previousAction="previousAction"
             :nextAction="nextAction"
             ></next-action>
        </div>
        <div class="form-group">
            <label>default next</label>
            <configured-action-name-list @changed="updateDefaultNextAction" :previousAction="previousAction" :value="action.default_next"></configured-action-name-list>
        </div>
    </div>
</template>


<script>

import configuredActionNameList from './configured-action-name-list.vue';
import newNextAction from './new-next-action.vue';
import nextAction from './next-action.vue';

export default {

    props: ['previousAction', 'action'],

    components: {
        'configured-action-name-list': configuredActionNameList,
        'new-next-action': newNextAction,
        'next-action': nextAction
    },

    methods: {
        removeActionToFlow: function (actionName) {
            this.$store.commit('removeActionToFlow', actionName);
        },

        /**
         * Remove the selected next action.
         *
         * @param {Object} payload
         */
        removeNextAction: function (payload) {
            this.$store.commit('removeNextAction', payload);
        },

        /**
         * Update the first action name.
         *
         * @param {string} defaultNextAction - The default next action name.
         */
        updateDefaultNextAction: function(defaultNextAction) {
            this.$store.commit('updateDefaultNextAction', { defaultNext: defaultNextAction, previousAction: this.previousAction });
        }
    }
};

</script>
