import Carousel from "../../6-module/3-task/index.js";
import slides from "../../6-module/3-task/slides.js";

import RibbonMenu from "../../7-module/1-task/index.js";
import categories from "../../7-module/1-task/categories.js";

import StepSlider from "../../7-module/4-task/index.js";
import ProductsGrid from "../../8-module/2-task/index.js";

import CartIcon from "../../8-module/1-task/index.js";
import Cart from "../../8-module/4-task/index.js";

export default class Main {
  constructor() {} // Оставляем конструктор пустым

  async render() {
    // Инициализируем поля класса здесь
    this.cart = null;
    this.cartIcon = null;
    this.productsGrid = null;
    this.stepSlider = null;
    this.ribbonMenu = null;

    return new Promise(async (resolve) => {
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
      
      this.cartIcon = new CartIcon();
      document.querySelector("div[data-cart-icon-holder]").append(this.cartIcon.elem);
      
      this.cart = new Cart(this.cartIcon);

      await this.productGridRender();

      this.productsGrid.updateFilter({
        noNuts: document.getElementById("nuts-checkbox").checked,
        vegeterianOnly: document.getElementById("vegeterian-checkbox").checked,
        maxSpiciness: this.stepSlider.value,
        category: this.ribbonMenu.value,
      });

      this.setupEventListeners();
      resolve();
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

  setupEventListeners() {
    document.body.addEventListener('product-add', (event) => {
      const productId = event.detail;
      const product = this.productsGrid.products.find(item => item.id === productId);
      if (product) {
        this.cart.addProduct(product);
      }
    });

    this.stepSlider.elem.addEventListener('slider-change', (event) => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail
      });
    });

    this.ribbonMenu.elem.addEventListener('ribbon-select', (event) => {
      this.productsGrid.updateFilter({
        category: event.detail
      });
    });

    document.getElementById('nuts-checkbox').addEventListener('change', (event) => {
      this.productsGrid.updateFilter({
        noNuts: event.target.checked
      });
    });

    document.getElementById('vegeterian-checkbox').addEventListener('change', (event) => {
      this.productsGrid.updateFilter({
        vegeterianOnly: event.target.checked
      });
    });
  }
}