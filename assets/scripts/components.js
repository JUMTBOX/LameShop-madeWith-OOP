class Product {
  constructor(title, imgUrl, price, description) {
    this.title = title;
    this.imgUrl = imgUrl;
    this.price = price;
    this.description = description;
  }
}

/**createRootElement메서드에 인자로 들어가는 attribute를 생성하기 위한 클래스 */
class ElementAttribute {
  constructor(attrName, attrVal) {
    this.name = attrName;
    this.value = attrVal;
  }
}

/**각 클래스 내 render메서드의 공통된 부분을 상속으로 제공하기 위한 클래스*/
class Component {
  constructor(renderHookId, shouldRender = true) {
    this.hookId = renderHookId;
    shouldRender && this.render();
  }
  /**상속받는 클래스에서 오버라이드하는 메서드*/
  render() {}
  /**인자(생성할 DOM의 태그명 , css를 붙이기 위한 클래스명 , 추가할 속성명)*/
  createRootElement(tag, cssClasses, attributes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) rootElement.className = cssClasses;
    if (attributes && attributes.length > 0) {
      for (let attr of attributes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }

    document.querySelector(this.hookId).append(rootElement);
    return rootElement;
  }
}
