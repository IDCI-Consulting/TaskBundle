<template>
    <div>
        <button @click="addActionComponent()" type="button">Add action</button>
        <action
            v-for="(name, action, parameters) in actions"
            name="name"
            action="action"
            parameters="parameters"
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
        addActionComponent: function () {
            this.actions.push({
                name: '',
                action: '',
                parameters: []
            });
        }
    }
}
</script>
