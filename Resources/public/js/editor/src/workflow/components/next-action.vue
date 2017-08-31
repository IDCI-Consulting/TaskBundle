<template>

    <div>
        <button @click.prevent="remove" aria-label="Close" class="close">
            <span aria-hidden="true">×</span>
        </button>
        <div class="form-group">
            <label>Action</label>
            <configured-action-name-list @changed="updateNextActionName" :value="nextAction.name"></configured-action-name-list>
        </div>
        <div class="form-group">
            <label>condition</label>
            <input type="text" class="form-control" v-model="nextAction.condition" />
        </div>
    </div>

</template>

<script>

import configuredActionNameList from './configured-action-name-list.vue';

export default {

    props: ['index', 'action', 'nextAction'],

    components: {
        'configured-action-name-list': configuredActionNameList
    },

    methods: {
        remove: function () {
            this.$emit('removed', { index: this.index, action: this.action });
        },

        updateNextActionName: function(selectedName) {
            let payload = {
                index: this.index,
                action: this.action,
                name: selectedName
            };

            this.$store.commit('updateNextActionName', payload);
        }
    },

    watch: {
        'nextAction.condition': {
            handler: function (newCondition) {
                let payload = {
                    index: this.index,
                    action: this.action,
                    condition: newCondition
                };

                this.$store.commit('updateNextActionCondition', payload);
            },
            deep: true
        }
    }
};

</script>
