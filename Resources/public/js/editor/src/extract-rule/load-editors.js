import { utils } from 'vue-editor-commons';

/**
 * Loads extract rule editors for all HTML elements that have extract-rule-editor as class.
 */
function loadEditors() {
  var extractRuleEditors = document.querySelectorAll('.extract-rule-editor');

  [].forEach.call(extractRuleEditors, function(element) {
    import(/* webpackChunkName: "trigger-extra-rule-vue-editor" */ './trigger-vue-editor').then(function (app) {
      var editorComponentId = 'extract_rule_editor_' + element.id;

      // Return if the component already exists.
      if (document.getElementById(editorComponentId)) {
        return;
      }

      var configuration = window[element.getAttribute('data-configuration-variable')];

      element.style.display = 'none';

      // Insert the editor right after the current element
      var editor = document.createElement('div');
      editor.id = editorComponentId;
      editor.innerHTML = '<extract-rule-editor></extract-rule-editor>';

      element.parentNode.insertBefore(editor, element.nextSibling);
      app.triggerVueEditor('#' + editorComponentId, configuration);
    });
  });
};

export {
  loadEditors
}
