import createElement from "../../assets/lib/create-element.js";

export default class ProductCard {
  constructor(product) {
    this._product = product;
    this._elem = createElement(`<div id="holder" class="container_half">
      <div class="card">
        <div class="card__top">
          <img src="/assets/images/products/${
            this._product.image
          }" class="card__image" alt="product">
          <span class="card__price">€${Number(this._product.price).toFixed(
            2
          )}</span>
        </div>
        <div class="card__body">
          <div class="card__title">${this._product.name}</div>
          <button type="button" class="card__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    </div>
    `);

    const addButton = this._elem.querySelector(".card__button");
    addButton.addEventListener("click", () => {
      let evt = new CustomEvent("product-add", {
        detail: this._product.id,
        bubbles: true,
      });

      addButton.dispatchEvent(evt);
    });
  }

  get elem() {
    return this._elem;
  }
}
