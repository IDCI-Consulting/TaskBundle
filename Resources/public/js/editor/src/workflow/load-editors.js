import {utils} from 'vue-editor-commons';

/**
 * Loads editors from all HTML elements which have workflow-editor as class.
 */
function loadEditors() {
  const actionEditors = document.querySelectorAll('.workflow-editor');

  [].forEach.call(actionEditors, function(element) {
    import(/* webpackChunkName: "trigger-workflow-vue-editor" */ './trigger-vue-editor').then(function (app) {
      const editorComponentId = 'workflow_editor_' + element.id;

      // Return if the component already exists.
      if (document.getElementById(editorComponentId )) {
        return;
      }

      var configuration = window[element.getAttribute('data-configuration-variable')];
      configuration.form = utils.createAttributeMapObject(element);

      element.style.display = 'none';

      // Insert the editor right after the current element
      var editor = document.createElement('div');
      editor.id = editorComponentId;
      editor.innerHTML = '<workflow-editor></workflow-editor>';

      // Insert the editor right after the element.
      element.parentNode.insertBefore(editor, element.nextSibling);

      app.triggerVueEditor('#' + editorComponentId, configuration);
    });
  });
};

export {
  loadEditors
}
