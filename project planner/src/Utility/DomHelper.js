export class DOMHelper {
  static clearEventListener(element) {
    const clonedElement = element.cloneNode(true);
    element.replaceWith(clonedElement);
    return clonedElement;
  }

  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destination = document.querySelector(newDestinationSelector);
    destination.append(element);
    /**요소가 움직이면 자동으로 해당 요소쪽으로 스크롤 */
    element.scrollIntoView({ behavior: "smooth" });
  }
}
