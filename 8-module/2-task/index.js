import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render(this.products);
  }

  render(products) {
    this.elem = createElement(`<div class="products-grid">
      <div class="products-grid__inner">
      </div>
    </div>`);

    let productInner = this.elem.querySelector(".products-grid__inner");
    productInner.innerHTML = "";
    products.forEach((item) => {
      const card = new ProductCard(item);
      productInner.append(card.elem);
    });
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);

    this.filteredProducts = this.filters.category
      ? [...this.products].filter(
          (product) => product.category === this.filters.category
        )
      : [...this.products];

    this.filteredProducts = this.filters.maxSpiciness
      ? this.filteredProducts.filter(
          (item) => item.spiciness <= this.filters.maxSpiciness
        )
      : this.filteredProducts;

    this.filteredProducts = this.filters.noNuts
      ? this.filteredProducts.filter(
          (product) =>
            (this.filters.noNuts && product.nuts === undefined) ||
            product.nuts === false
        )
      : this.filteredProducts;
    this.filteredProducts = this.filters.vegeterianOnly
      ? this.filteredProducts.filter(
          (product) =>
            this.filters.vegeterianOnly &&
            product.vegeterian == this.filters.vegeterianOnly
        )
      : this.filteredProducts;

    this.render(this.filteredProducts);
  }
}
