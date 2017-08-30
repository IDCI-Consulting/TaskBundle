<template>

    <div>
        <div v-for="(routeConfiguration, name) in routes" :key="name">
            <workflow-route
               :key="name"
               :index="name"
               @remove="removeAction(routeConfiguration, name)"
             ></workflow-route>
        </div>
    </div>

</template>

<script>

import workflowRoute from './workflow-route.vue';

export default {

    props: ['name', 'firstActionName'],

    computed: {
        routes: function () {
            let workflowConfiguration = this.$store.getters.getWorkflowConfiguration;

            return workflowConfiguration.actions;
        }
    },

    components: {
        'workflow-route': workflowRoute
    },

    methods: {
        removeAction: function (routeConfiguration, name) {
            console.log(routeConfiguration, name);
        }
    }
};

</script>
