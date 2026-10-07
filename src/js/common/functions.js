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

export function cleanDOM(parent) {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}

export function addClassAllElements(arrayElements, classElement) {
  return arrayElements.forEach(element => element.classList.add(...classElement));
}

export function removeClassAllElements(arrayElements, classElement) {
  return arrayElements.forEach(element => element.classList.remove(...classElement));
}