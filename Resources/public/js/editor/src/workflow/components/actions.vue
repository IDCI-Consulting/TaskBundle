<template>
    <div>
        <button @click="addActionComponent()" type="button">Add action</button>
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
