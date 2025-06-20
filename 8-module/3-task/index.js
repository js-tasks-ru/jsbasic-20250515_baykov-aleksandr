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
    // ваш код
  }

  isEmpty() {
    return Boolean(this.cartItems)
  }

  getTotalCount() {
    // ваш код
  }

  getTotalPrice() {
    // ваш код
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
