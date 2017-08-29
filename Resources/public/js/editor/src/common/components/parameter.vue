<template>

    <div>
        <component
          :is="options.component_name"
          :option="options"
          :name="name"
          :value="getParameterValue(name)"
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
    props: ['name', 'options', 'parameters'],

    components: {
        'component-checkbox': checkBoxComponent,
        'component-choice': choiceComponent,
        'component-integer': integerComponent,
        'component-number': numberComponent,
        'component-text': textComponent,
        'component-textarea': textareaComponent
    },

    methods: {
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
