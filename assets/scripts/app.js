class Cart extends Component {
  items = [];

  constructor(renderHookId) {
    super(renderHookId, false);
    this.orderProduct = () => {
      console.log("주문중...");
      console.log(this.items);
    };
    this.render();
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
    const orderBtn = cartEl.querySelector("button");
    orderBtn.addEventListener("click", this.orderProduct);
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
  #products = [];
  constructor(renderHookId) {
    super(renderHookId, false);
    this.render();
    this.fetchProducts();
  }

  fetchProducts() {
    this.#products = [
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
    for (const prod of this.#products) {
      new ProductItem(prod, "#product-list");
    }
  }

  render() {
    this.createRootElement("ul", "product-list", [
      new ElementAttribute("id", "product-list"),
    ]);
    if (this.#products && this.#products.length > 0) this.renderProducts();
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
