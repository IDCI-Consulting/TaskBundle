<template>

    <div>
        <button @click.prevent="remove" type="button" aria-label="Close" class="btn delete">
            <i class="icofont icofont-close"></i>
        </button>
        <h5>Next action: <strong>{{ nextAction.name }}</strong></h5>
        <div class="form-group">
            <label>condition</label>
            <input type="text" class="form-control" v-model="nextAction.condition" />
        </div>
    </div>

</template>

<script>

import configuredActionNameList from './configured-action-name-list.vue';

export default {

    props: ['index', 'previousAction', 'nextAction'],

    components: {
        'configured-action-name-list': configuredActionNameList
    },

    methods: {
        remove: function () {
            this.$emit('removed', { index: this.index, previousAction: this.previousAction });
        },

        updateNextActionName: function(selectedName) {
            let payload = {
                index: this.index,
                previousAction: this.previousAction,
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
                    previousAction: this.previousAction,
                    condition: newCondition
                };

                this.$store.commit('updateNextActionCondition', payload);
            },
            deep: true
        }
    }
};

</script>
