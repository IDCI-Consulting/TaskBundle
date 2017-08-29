<template>
    <div>
        <new-action></new-action>
    </div>
</template>

<script>

import new-action from './new-action.vue';

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
        'new-action': new-action
    },

    methods: {

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

<style>

</style>
