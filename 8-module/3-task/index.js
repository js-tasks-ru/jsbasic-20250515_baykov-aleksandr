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

    /*В качестве аргумента принимает объект товара вида:

let product = {
  name: "Laab kai chicken salad", // название товара
  price: 10, // цена товара
  category: "salads",
  image: "laab_kai_chicken_salad.png",
  id: "laab-kai-chicken-salad"
};

cart.addProduct(product);
Требования к реализации метода:

Если товара еще нет в корзине, то добавить его в массив cartItems с количеством 1:
Если товар уже есть в корзине, то увеличить его количество на единицу.
С обновлённым элементом cartItem вызвать метод onProductUpdate:*/
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    // ваш код
  }

  isEmpty() {
    // ваш код
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
