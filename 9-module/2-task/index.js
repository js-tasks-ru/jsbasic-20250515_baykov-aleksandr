import Carousel from "../../6-module/3-task/index.js";
import slides from "../../6-module/3-task/slides.js";

import RibbonMenu from "../../7-module/1-task/index.js";
import categories from "../../7-module/1-task/categories.js";

import StepSlider from "../../7-module/4-task/index.js";
import ProductsGrid from "../../8-module/2-task/index.js";

import CartIcon from "../../8-module/1-task/index.js";
import Cart from "../../8-module/4-task/index.js";

export default class Main {
  constructor() {}

  async render() {
    document
      .querySelector("div[data-carousel-holder]")
      .append(new Carousel(slides)._elem);
    this.ribbonMenu = new RibbonMenu(categories);
    document
      .querySelector("div[data-ribbon-holder]")
      .append(this.ribbonMenu._elem);
    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    document
      .querySelector("div[data-slider-holder]")
      .append(this.stepSlider._elem);
    const cartIcon = new CartIcon();
    document.querySelector("div[data-cart-icon-holder]").append(cartIcon.elem);
    const cart = new Cart(cartIcon);

    await this.productGridRender();

    this.productsGrid.updateFilter({
      noNuts: document.getElementById("nuts-checkbox").checked,
      vegeterianOnly: document.getElementById("vegeterian-checkbox").checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value,
    });
  }

  async productGridRender() {
    try {
      let response = await fetch("products.json");

      if (!response.ok) {
        throw new Error("Нет данных");
      }

      let data = await response.json();

      let productGrid = document.querySelector(
        "div[data-products-grid-holder]"
      );
      productGrid.innerHTML = "";
      this.productsGrid = new ProductsGrid(data);
      productGrid.append(this.productsGrid.elem);
    } catch (e) {
      console.log(e.message);
    }
  }
}
