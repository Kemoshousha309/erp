export function getCssVar(varName) {
  const root = document.querySelector(':root');
  return getComputedStyle(root).getPropertyValue(varName).replace(/\s/g, '');
}

export function setCssVar(varName, value) {
  const root = document.querySelector(':root');
  root.style.setProperty(varName, value);
}
