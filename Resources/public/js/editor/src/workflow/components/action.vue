<template>
    <div>
        <input class="form-control" type="text" v-model="action.name"/>
        <select
            class="form-control"
            v-model="action.action"
            @changed="updateActionParameters(action.action)"
        >
            <option :value="action.actionName" v-for="action in actions">{{ action.actionName }}</option>
        </select>
        <button @click="removeAction" class="remove" type="button">X</button>
    </div>
</template>

<script>

export default {
    props: ['action'],

    computed: {
        actions: function () {
            return this.$store.getters.getActionsList;
        }
    },

    methods: {

        /**
         * Remove action
         *
         * @param Object action.
         */
        removeAction: function () {
            this.$emit('actionremoved', this.action);
        },

        /**
         * Update action parameters
         *
         * @param {string} name - The action name.
         */
        updateActionParameters: function (name) {
            store.dispatch('setActionsParameters', this.$http, name);
        }
    }
}
</script>
