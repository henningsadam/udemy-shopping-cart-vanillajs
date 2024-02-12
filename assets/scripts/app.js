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

class ShoppingCart {
  items = [];

  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total: \$${this.totalAmount.toFixed(2)}</h2>`;
  }

  get totalAmount() {
    const sum = this.items.reduce((prevValue, currentItem) => {
      return prevValue + currentItem.price;
    }, 0);
    return sum;
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product)
    this.cartItems = updatedItems
  }

  render() {
    const cartEl = document.createElement('section');
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order now!</button>
    `;
    cartEl.className = 'cart';
    this.totalOutput = cartEl.querySelector('h2');

    return cartEl;
  }
}

class ProductList {
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

  constructor() {}

  render() {
    const prodList = document.createElement('ul');
    prodList.className = 'product-list';

    for (const prod of this.products) {
      const item = new ProductListItem(prod).render();
      prodList.append(item);
    }

    return prodList;
  }
}

class ProductListItem {
  constructor(product) {
    this.product = product;
  }

  addtoCart() {
    App.addProductToCart(this.product);
  }

  render() {
    const listItem = document.createElement('li');
    listItem.className = 'product-item';
    listItem.innerHTML = `
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

    const addCartbtn = listItem.querySelector('button');
    addCartbtn.addEventListener('click', this.addtoCart.bind(this));
    return listItem;
  }
}

class Shop {
  render() {
    const renderHook = document.getElementById('app');

    this.cart = new ShoppingCart();
    const cartEl = this.cart.render();

    const productList = new ProductList();
    const productListEl = productList.render();

    renderHook.append(cartEl);
    renderHook.append(productListEl);
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
