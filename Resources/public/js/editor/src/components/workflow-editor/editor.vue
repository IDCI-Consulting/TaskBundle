<template>
    <div class="workflow-editor editor">
        <actions :actions="actions" class="actions"></actions>
    </div>
</template>

<script>

import actions from './actions.vue';

export default {
    props: ['actions'],

    components: {
        actions: actions
    }
}
</script>
