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
    this.cart = null;
    this.cartIcon = null;
    this.productsGrid = null;
    this.stepSlider = null;
    this.ribbonMenu = null;

    const carouselHolder = document.querySelector("[data-carousel-holder]");
    const carousel = new Carousel(slides);
    carouselHolder.innerHTML = "";
    carouselHolder.append(carousel.elem);

    const ribbonHolder = document.querySelector("[data-ribbon-holder]");
    this.ribbonMenu = new RibbonMenu(categories);
    ribbonHolder.innerHTML = "";
    ribbonHolder.append(this.ribbonMenu.elem);

    const sliderHolder = document.querySelector("[data-slider-holder]");
    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    sliderHolder.innerHTML = "";
    sliderHolder.append(this.stepSlider.elem);

    const cartIconHolder = document.querySelector("[data-cart-icon-holder]");
    this.cartIcon = new CartIcon();
    cartIconHolder.append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    await this.productsGridRender();

    this.productsGrid.updateFilter({
      noNuts: document.getElementById("nuts-checkbox").checked,
      vegeterianOnly: document.getElementById("vegeterian-checkbox").checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value,
    });

    this.setupEventListeners();
  }

  async productsGridRender() {
    const response = await fetch("products.json");
    const products = await response.json();

    const gridHolder = document.querySelector("[data-products-grid-holder]");
    gridHolder.innerHTML = "";

    this.productsGrid = new ProductsGrid(products);
    gridHolder.append(this.productsGrid.elem);
  }

  setupEventListeners() {
    document.body.addEventListener("product-add", (event) => {
      const productId = event.detail;
      const product = this.productsGrid.products.find(
        (item) => item.id === productId
      );
      this.cart.addProduct(product);
    });

    this.stepSlider.elem.addEventListener("slider-change", (event) => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail,
      });
    });

    this.ribbonMenu.elem.addEventListener("ribbon-select", (event) => {
      this.productsGrid.updateFilter({
        category: event.detail,
      });
    });

    document
      .getElementById("nuts-checkbox")
      .addEventListener("change", (event) => {
        this.productsGrid.updateFilter({
          noNuts: event.target.checked,
        });
      });

    document
      .getElementById("vegeterian-checkbox")
      .addEventListener("change", (event) => {
        this.productsGrid.updateFilter({
          vegeterianOnly: event.target.checked,
        });
      });
  }
}
