<template>

    <div>
        <multiselect
            v-model="selectedName"
            :options="configuredActionNames"
            selectLabel=""
            placeholder="Select an action configured above">
        </multiselect>
    </div>

</template>

<script>

import multiSelect from 'vue-multiselect';

export default {

    props: ['index', 'value'],

    data: function () {
        return {
            selectedName: this.value,
            errorMessage: ''
        };
    },

    components: {
        'multiselect': multiSelect
    },

    computed: {
        configuredActionNames: function () {
            let actions = this.$store.getters.getActionsConfiguration;
            let names = [];

            if (null != actions && actions.length > 0) {
                names = actions.map(function (action) {
                    return action.name;
                });
            }

            if (null == this.selectedName && names.length > 0) {
                this.selectedName = names[0];
            }

            return names;
        }
    },

    watch: {
        selectedName: {
            handler: function (selectedName) {
                this.$emit('changed', selectedName);
            }
        }
    }
};

</script>
