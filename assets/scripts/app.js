class Product {
  constructor(title, imgUrl, price, description) {
    this.title = title;
    this.imgUrl = imgUrl;
    this.price = price;
    this.description = description;
  }
}

class Cart {
  item = [];
  constructor() {}

  addProduct(prod) {
    this.item.push(prod);
    this.totalOutput.innerHTML = `<h2>\$ ${1}</h2>`;
  }
  render() {
    const cartEl = document.createElement("section");
    cartEl.innerHTML = `
        <h2>\$ ${0}</h2>
        <button>주문하기</button>
    `;
    cartEl.className = "cart";
    this.totalOutput = cartEl.querySelector("h2");
    return cartEl;
  }
}

class ProductItem {
  constructor(prod) {
    this.prod = prod;
  }
  addToCart() {
    App.addProductToCart(this.prod);
  }
  render() {
    const prodEl = document.createElement("li");
    prodEl.className = "product-item";
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
    return prodEl;
  }
}

class ProductList {
  products = [
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

  constructor() {}

  render() {
    const prodList = document.createElement("ul");
    prodList.className = "product-list";
    for (const prod of this.products) {
      const productItemEl = new ProductItem(prod).render();
      prodList.append(productItemEl);
    }
    return prodList;
  }
}

class Shop {
  static cart;

  render() {
    const renderHook = document.querySelector("#app");
    this.cart = new Cart();
    this.productList = new ProductList();
    const cartEl = this.cart.render();
    const productListEl = this.productList.render();

    renderHook.append(cartEl, productListEl);
  }
}

class App {
  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }

  static addProductToCart(prod) {
    this.cart.addProduct(prod);
  }
}

App.init();
