import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render() {
    this.elem = createElement(`<div class="products-grid">
      <div class="products-grid__inner">
      </div>
    </div>`);

    const productInner = this.elem.querySelector(".products-grid__inner");
    this.products.forEach((item) => {
      const card = new ProductCard(item);
      productInner.append(card.elem);
    });
  }
}
