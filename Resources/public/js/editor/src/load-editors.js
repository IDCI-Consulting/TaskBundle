/**
 * Loads workflow editors from all HTML elements which have workflow-editor as class.
 */
function loadWorkflowEditors() {
  let actionEditors = document.querySelectorAll('.workflow-editor');

  [].forEach.call(actionEditors, function(element) {
    import(/* webpackChunkName: "vue-editor" */ './app').then(function (app) {
      let editorComponentId = 'action_editor_' + element.id;

      // Return if the component already exists.
      if (document.getElementById(editorComponentId)) {
        return;
      }

      element.style.display = 'none';

      // Insert the editor right after the current element
      let editor = document.createElement('div');
      editor.id = editorComponentId;
      editor.innerHTML = '<action-editor></action-editor>';

      element.parentNode.insertBefore(editor, element.nextSibling);
      app.triggerVueEditor('#' + editorComponentId);
    });
  });
};

export {
  loadWorkflowEditors
}
