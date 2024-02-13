class Product {
  title = 'DEFAULT';
  imageUrl;
  description;
  price;

  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

class Component {
  constructor(renderHookId) {
    this.hookId = renderHookId;
  }

  createRootElement(tag, cssClasses, attribtutes) {
    const rootElement = document.createElement(tag);
    if (cssClasses) {
      rootElement.className = cssClasses;
    }

    if (attribtutes && attribtutes.length > 0) {
      for (const attr of attribtutes) {
        rootElement.setAttribute(attr.name, attr.value);
      }
    }
    document.getElementById(this.hookId).append(rootElement);

    return rootElement;
  }
}

class ShoppingCart extends Component {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce((prevValue, currentItem) => {
      return prevValue + currentItem.price;
    }, 0);
    return sum;
  }

  constructor(renderHookId) {
    super(renderHookId);
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  render() {
    const cartEl = this.createRootElement('section', 'cart');
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order now!</button>
    `;
    this.totalOutput = cartEl.querySelector('h2');
  }
}

class ProductList extends Component {
  products = [
    new Product(
      'A Pillow',
      'https://picsum.photos/200',
      'A soft pillow',
      19.99
    ),
    new Product(
      'A Carpet',
      'https://picsum.photos/200?random=1',
      'A carpet you might like, or not.',
      89.99
    ),
  ];

  constructor(renderHookId) {
    super(renderHookId);
  }

  render() {
    const prodList = this.createRootElement('ul', 'product-list', [
      new ElementAttribute('id', 'prod-list'),
    ]);

    for (const prod of this.products) {
      const item = new ProductListItem(prod, 'prod-list').render();
    }
  }
}

class ProductListItem extends Component {
  constructor(product, renderHookId) {
    super(renderHookId);
    this.product = product;
  }

  addtoCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const prodEl = this.createRootElement('li', 'product-item');
    prodEl.innerHTML = `
        <div>
          <img src=${this.product.imageUrl} alt="${this.product.title}" />
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to cart</button>
          </div>
        </div>
      `;

    const addCartbtn = prodEl.querySelector('button');
    addCartbtn.addEventListener('click', this.addtoCart.bind(this));
  }
}

class Shop {
  render() {
    this.cart = new ShoppingCart('app');
    this.cart.render();

    const productList = new ProductList('app');
    productList.render();
  }
}

class App {
  static cart;

  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
