import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
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

    if (!cartItem) {
      return;
    }

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
    return !this.cartItems.length;
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

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    const modalContent = document.createElement("div");

    this.cartItems.forEach(({ product, count }) => {
      const productElement = this.renderProduct(product, count);
      modalContent.append(productElement);
    });

    const orderForm = this.renderOrderForm();
    modalContent.append(orderForm);

    this.modal = new Modal("Your order", modalContent);

    orderForm.addEventListener("submit", (event) => {
      event.preventDefault();
      this.onSubmit(event);
    });

    modalContent.addEventListener("click", (event) => {
      const target = event.target;
      const productElement = target.closest(".cart-product");

      if (!productElement) return;

      const productId = productElement.dataset.productId;

      if (target.closest(".cart-counter__button_plus")) {
        this.updateProductCount(productId, 1);
      } else if (target.closest(".cart-counter__button_minus")) {
        this.updateProductCount(productId, -1);
      }
    });
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    if (document.body.classList.contains("is-modal-open")) {
      const productId = cartItem.product.id;

      const modal = document.querySelector(".modal");
      if (!modal) return;

      if (this.isEmpty()) {
        this.modal.close();
        return;
      }

      const productCountElem = modal.querySelector(
        `[data-product-id="${productId}"] .cart-counter__count`
      );
      const productPriceElem = modal.querySelector(
        `[data-product-id="${productId}"] .cart-product__price`
      );
      const infoPriceElem = modal.querySelector(".cart-buttons__info-price");

      if (productCountElem) {
        productCountElem.textContent = cartItem.count;
      }

      if (productPriceElem) {
        productPriceElem.textContent = `€${(
          cartItem.product.price * cartItem.count
        ).toFixed(2)}`;
      }

      if (infoPriceElem) {
        infoPriceElem.textContent = `€${this.getTotalPrice().toFixed(2)}`;
      }
    }
  }

  onSubmit(event) {
    event.preventDefault();
    //Добавить класс is-loading кнопке с атрибутом type="submit".
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.classList.add("is-loading");
    const formData = new FormData(form);

    fetch("https://httpbin.org/post", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          this.modal.setTitle("Success!");
          this.cartItems = [];
          this.cartIcon.update(this);
          const modal = document.querySelector(".modal");
          modal.innerHTML = `
      <div class="modal__body-inner">
    <p>
      Order successful! Your order is being cooked :) <br>
      We’ll notify you about delivery time shortly.<br>
      <img src="/assets/images/delivery.gif">
    </p>
  </div>
  `;
        }
      })
      .catch((error) => console.log(error));
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
