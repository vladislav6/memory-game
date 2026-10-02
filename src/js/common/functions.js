export function createMyElement(
  element,
  classElement = '',
  idElement = '',
  textElement = ''
) {
  const myElement = document.createElement(element);
  if (textElement) {
    myElement.textContent = textElement;
  }
  if (classElement) {
    myElement.className = classElement;
  }
  if (idElement) {
    myElement.id = idElement;
  }

  return myElement;
}