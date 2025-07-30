/** 부모 요소에 relative 설정 (한 번만) */
export function setRelativeIfStatic<T extends HTMLElement>(element: T) {
  const style = getComputedStyle(element);
  if (style.position === "static") {
    element.style.position = "relative";
  }
}
