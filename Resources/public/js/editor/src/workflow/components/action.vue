<template>
    <div>
        <div class="form-group">
            <label>Name</label>
            <div class="form-control-wrapper">
                <input class="form-control" v-model="action.accessName" type="text" />
            </div>
        </div>
        <div class="form-group">
            <label>Action</label>
            <select
                class="form-control"
                v-model="action.actionName"
                @change="getActionParameters(action.actionName)"
            >
                <option :value="actionConfiguration.name" v-for="actionConfiguration in actionList">{{ actionConfiguration.name }}</option>
            </select>
        </div>
        <div class="form-group" v-if="action.parameters > 0">
            <options :options="action.parameters"></options>
        </div>
        {{ action.parameters }}
        <button @click="removeAction" class="remove" type="button">X</button>
    </div>
</template>

<script>
import options from '../../common/components/options.vue';
import multiSelect from 'vue-multiselect';

export default {
    props: ['action'],

    components: {
        options: options
    },

    computed: {
        actionList: function () {
            console.log('toto');
            return this.$store.getters.getActions;
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
         * Update action parameters.
         *
         * @param {string} name - The action name.
         */
        getActionParameters: function (name) {
            this.$store.dispatch('setActionParameters', { http: this.$http, action: name });
            this.$set(this.action, 'parameters', this.$store.getters.getAction(name).parameters);
        }
    }
}
</script>
