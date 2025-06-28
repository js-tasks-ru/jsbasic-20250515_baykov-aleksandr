import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render() {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `);

    this.updateFilter(this.filters);
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    const gridInner = this.elem.querySelector(".products-grid__inner");
    gridInner.innerHTML = "";

    for (const product of this.products) {
      if (this.filters.category && product.category !== this.filters.category) {
        continue;
      }

      if (
        this.filters.maxSpiciness !== undefined &&
        product.spiciness > this.filters.maxSpiciness
      ) {
        continue;
      }

      if (this.filters.noNuts) {
        if (product.nuts === true) {
          continue;
        }
      }

      if (this.filters.vegeterianOnly && !product.vegeterian) {
        continue;
      }

      const productCard = new ProductCard(product);
      gridInner.append(productCard.elem);
    }
  }
}
