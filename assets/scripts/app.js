class Product {
  constructor(title, imgUrl, price, description) {
    this.title = title;
    this.imgUrl = imgUrl;
    this.price = price;
    this.description = description;
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

/**createRootElement메서드에 인자로 들어가는 attribute를 생성하기 위한 클래스 */
class ElementAttribute {
  constructor(attrName, attrVal) {
    this.name = attrName;
    this.value = attrVal;
  }
}

class Cart extends Component {
  items = [];

  constructor(renderHookId) {
    super(renderHookId);
  }
  /**setter */
  set cartItem(val) {
    this.items = val;
    this.totalOutput.innerHTML = `<h2>\$ ${this.totalAmount.toFixed(2)}</h2>`;
  }
  /**getter */
  get totalAmount() {
    const sum = this.items.reduce((acc, cur) => acc + cur.price, 0);
    return sum;
  }
  addProduct(prod) {
    const updatedItems = [...this.items];
    updatedItems.push(prod);
    this.cartItem = updatedItems;
  }
  render() {
    const cartEl = this.createRootElement("section", "cart");
    cartEl.innerHTML = `
        <h2>\$ ${0}</h2>
        <button>주문하기</button>
    `;
    this.totalOutput = cartEl.querySelector("h2");
    return cartEl;
  }
}

class ProductItem extends Component {
  constructor(prod, renderHookId) {
    super(renderHookId, false);
    this.prod = prod;
    this.render();
  }
  addToCart() {
    App.addProductToCart(this.prod);
  }
  render() {
    const prodEl = this.createRootElement("li", "product-item");
    prodEl.innerHTML = `
       <div>
         <img src="${this.prod.imgUrl}" alt="${this.prod.title}"/>
         <div class="product-item__content">
            <h2>${this.prod.title}</h2>
            <h3>${this.prod.price}\$</h3>
            <p>${this.prod.description}</p>
            <button>장바구니에 담기</button>
         </div>
       </div>
      `;
    const addCartBtn = prodEl.querySelector("button");
    addCartBtn.addEventListener("click", this.addToCart.bind(this));
  }
}

class ProductList extends Component {
  products = [];
  constructor(renderHookId) {
    super(renderHookId);
    this.fetchProducts();
  }

  fetchProducts() {
    this.products = [
      new Product(
        "이불",
        "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcR49ldl9foL0v8SgbVJsejg3wAKna1Ho52eDVPXgGDo1Wb7ntPhGQp8zlHo2FHcXZm0W8txTDwFE4_ATRbLn4LuLd7gHJl0L6hXV33hKyRLnVLMeowZaYEv&usqp=CAc",
        19.99,
        "부드러운 이불!"
      ),
      new Product(
        "카펫",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1S3lp-9Y7dNH9BngJkrXhyvX-uKolVVmjyQ&usqp=CAU",
        89.99,
        "당신의 마음에 들 만한 이불! 아님말고."
      ),
    ];
    this.renderProducts();
  }

  renderProducts() {
    for (const prod of this.products) {
      new ProductItem(prod, "#product-list");
    }
  }

  render() {
    this.createRootElement("ul", "product-list", [
      new ElementAttribute("id", "product-list"),
    ]);
    if (this.products && this.products.length > 0) this.renderProducts();
  }
}

class Shop {
  static cart;
  constructor() {
    this.render();
  }
  render() {
    this.cart = new Cart("#app");
    new ProductList("#app");
  }
}

class App {
  static init() {
    const shop = new Shop();
    this.cart = shop.cart;
  }

  static addProductToCart(prod) {
    this.cart.addProduct(prod);
  }
}

App.init();
