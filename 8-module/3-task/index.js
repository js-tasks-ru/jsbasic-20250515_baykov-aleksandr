export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) {
      return;
    }

    let cartItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );

    if (!cartItem) {
      cartItem = {
        product,
        count: 1,
      };

      this.cartItems.push(cartItem);
    } else {
      cartItem.count += 1;
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find((item) => item.product.id === productId);

    amount === 1
      ? (cartItem.count += 1)
      : amount === -1
      ? (cartItem.count -= 1)
      : cartItem.count;

    if (cartItem.count === 0) {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return Boolean(this.cartItems);
  }

  getTotalCount() {
    return this.cartItems.reduce((acc, el) => acc + el.count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (acc, el) => acc + el.count * el.product.price,
      0
    );
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
