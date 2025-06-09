import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this._slides = slides;
    this._elem = createElement('<div class="carousel"></div>');
    const carouselInner = createElement('<div class="carousel__inner"></div>');

    this._slides.forEach((slide) => {
      const slideElement = createElement(`
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/products/${slide.image}" alt="${slide.name}">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `);
      carouselInner.append(slideElement);
    });

    this._elem.append(carouselInner);

    this._elem.addEventListener("click", (evt) => {
      const button = evt.target.closest(".carousel__button");
      const slideElement = button.closest(".carousel__slide");
      const id = slideElement.dataset.id;

      let customEvent = new CustomEvent("product-add", {
        detail: id,
        bubbles: true,
      });

      this._elem.dispatchEvent(customEvent);
    });
  }

  get elem() {
    return this._elem;
  }
}
