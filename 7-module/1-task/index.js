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
    const ribbon = createElement(`
      <div class="ribbon">
        <button class="ribbon__arrow ribbon__arrow_left ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
        <nav class="ribbon__inner"></nav>
        <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>
    `);

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
    const inner = this._elem.querySelector(".ribbon__inner");
    const leftArrow = this._elem.querySelector(".ribbon__arrow_left");
    const rightArrow = this._elem.querySelector(".ribbon__arrow_right");

    this._elem.addEventListener("click", (event) => {
      if (event.target.closest(".ribbon__arrow_right")) {
        inner.scrollBy(350, 0);
      } else if (event.target.closest(".ribbon__arrow_left")) {
        inner.scrollBy(-350, 0);
      }
    });

    inner.addEventListener("scroll", () => {
      const scrollWidth = inner.scrollWidth;
      const scrollLeft = inner.scrollLeft;
      const clientWidth = inner.clientWidth;
      const scrollRight = scrollWidth - scrollLeft - clientWidth;

      leftArrow.classList.toggle(
        "ribbon__arrow_visible",
        scrollLeft !== 0
      );
      rightArrow.classList.toggle("ribbon__arrow_visible", scrollRight > 1);
    });

    inner.addEventListener("click", (event) => {
      event.preventDefault();
      const target = event.target.closest(".ribbon__item");
      if (!target) return;

      const items = this._elem.querySelectorAll(".ribbon__item");
      items.forEach(item => item.classList.remove("ribbon__item_active"));
      target.classList.add("ribbon__item_active");
    });

    this._elem.addEventListener("click", (event) => {
      const item = event.target.closest(".ribbon__item_active");
      if (item) {
        this._elem.dispatchEvent(
          new CustomEvent('ribbon-select', { 
            detail: item.dataset.id, 
            bubbles: true 
          })
        );
      }
    });
  }  
}