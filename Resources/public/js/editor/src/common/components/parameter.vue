<template>

    <div>
        <component
          :is="option.component_name"
          :option="option"
          :name="name"
          :value="getParameterValue(name)"
          @changed="updateParameter"
        ></component>
    </div>

</template>

<script>

import {
    checkBoxComponent,
    choiceComponent,
    integerComponent,
    numberComponent,
    textComponent,
    textareaComponent
} from 'vue-editor-commons';

export default {
    props: ['name', 'option', 'parameters'],

    components: {
        'component-checkbox': checkBoxComponent,
        'component-choice': choiceComponent,
        'component-integer': integerComponent,
        'component-number': numberComponent,
        'component-text': textComponent,
        'component-textarea': textareaComponent
    },

    methods: {
        updateParameter: function (parameter) {
            this.$emit('parameterupdated', parameter);
        },

        /**
         * Get the parameters for an action
         *
         * @param key
         */
        getParameterValue: function (key) {
            if (typeof this.parameters !== 'undefined') {
                return this.parameters[key];
            }
        }
    }
};

</script>
