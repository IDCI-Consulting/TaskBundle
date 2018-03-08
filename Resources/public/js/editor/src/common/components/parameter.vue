<template>

    <div class="parameter">
        <component
          :is="option.component_name"
          :option="option"
          :name="name"
          :value="value"
          :required-star="requiredStar"
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

    props: ['name', 'option', 'value', 'required-star'],

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
            this.$emit('change', parameter);
        }
    }
};

</script>

<style>

.parameter .form-group > span {
    font-style: italic;
    font-size: 0.9em;
}

</style>
