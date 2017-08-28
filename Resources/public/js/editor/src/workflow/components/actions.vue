<template>
    <div>
        <button @click="addAction()" type="button">Add action</button>
        <action
            v-for="action in actions"
            :name="action.name"
            :key="action.name"
            :action="action.action"
            :parameters="action.parameters"
        >
        </action>
    </div>
</template>

<script>

import action from './action.vue';

export default {
    props: {
        actions: {
            type: Array,
            default: function () {
                return [];
            }
        }
    },

    components: {
        action: action
    },

    methods: {

        /**
         * Add action component
         */
        addAction: function () {
            this.actions.push({
                name: '',
                action: '',
                parameters: []
            });
        },

        /**
         * Remove action
         *
         * @param Object action.
         */
        removeAction: function (action) {
            this.actions.splice(this.actions.indexOf(action), 1);
        }
    }
}
</script>
