/**
 * Loads action editors from all HTML elements which have action-editor as class.
 */
function loadActionEditors() {
  let actionEditors = document.querySelectorAll('.action-editor');

  [].forEach.call(actionEditors, function(editor) {
    // TODO: Import Vue components.
    let editorComponentId = `action_editor_${editor.id}`;
    console.log(editorComponentId);
  });
};

export {
  loadActionEditors
}
