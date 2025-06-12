import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this._elem = this.#render();
    this.#initRibbonMenu();
  }

  get elem() {
    return this._elem;
  }

  #render() {
    const ribbon = createElement(`<div class="container">
  <div class="ribbon"> 
    <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
    <nav class="ribbon__inner"></nav>
    <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
    </button>
  </div>`);

    const inner = ribbon.querySelector(".ribbon__inner");

    this.categories.forEach((category) => {
      inner.append(
        createElement(`
          <a href="#" class="ribbon__item" data-id="${category.id}">${category.name}</a>
        `)
      );
    });
    return ribbon;
  }

  #initRibbonMenu() {
    const ribbon = this._elem.querySelector(".ribbon");
    const inner = ribbon.querySelector(".ribbon__inner");

    ribbon.addEventListener("click", (event) => {
      if (event.target.closest(".ribbon__arrow_right")) {
        inner.scrollBy(350, 0);
      } else if (event.target.closest(".ribbon__arrow_left")) {
        inner.scrollBy(-350, 0);
      }
      return;

      //this.#updateCarousel();
    });

    inner.addEventListener("scroll", () => {
      const leftArrow = ribbon.querySelector(".ribbon__arrow_left");
      const rightArrow = ribbon.querySelector(".ribbon__arrow_right");
      let scrollWidth = inner.scrollWidth;
      let scrollLeft = inner.scrollLeft;
      let clientWidth = inner.clientWidth;

      let scrollRight = scrollWidth - scrollLeft - clientWidth;

      leftArrow.classList.toggle(
        "ribbon__arrow_visible",
        inner.scrollLeft !== 0
      );
      rightArrow.classList.toggle("ribbon__arrow_visible", scrollRight > 1);
    });
  }
}
