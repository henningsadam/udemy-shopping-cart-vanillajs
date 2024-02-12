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

  render() {
    const cartEl = document.createElement('section');
    cartEl.innerHTML = `
      <h2>Total: \$${0}</h2>
      <button>Order now!</button>
    `;
    cartEl.className = 'cart';

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
    console.log('adding to cart');
    console.log(this.product);
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

    const cart = new ShoppingCart();
    const cartEl = cart.render();

    const productList = new ProductList();
    const productListEl = productList.render();

    renderHook.append(cartEl);
    renderHook.append(productListEl);
  }
}

const shop = new Shop();
shop.render();
