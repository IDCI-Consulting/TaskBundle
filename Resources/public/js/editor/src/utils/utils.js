/**
 * Create a DOM element.
 *
 * @param {string} type - The element type (div, span, p, etc)
 * @param {string} id   - The element id
 * @param {string} html - The HTML content
 *
 * @returns {Object}
 */
function createDOMElement(type, id, html) {
  let element = document.createElement(type);

  element.id = id;
  element.innerHTML = html;

  return element;
};

export {createDOMElement};
