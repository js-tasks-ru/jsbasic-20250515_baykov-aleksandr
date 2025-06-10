import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlideIndex = 0;
    this._elem = this.#render();
    this.#initCarousel();
  }

  get elem() {
    return this._elem;
  }

  #render() {
    return createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left" style="display: none">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner">
          ${this.slides.map(slide => `
            <div class="carousel__slide" data-id="${slide.id}">
              <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="${slide.name}">
              <div class="carousel__caption">
                <span class="carousel__price">€${slide.price.toFixed(2)}</span>
                <div class="carousel__title">${slide.name}</div>
                <button type="button" class="carousel__button">
                  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                </button>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `);
  }

  #initCarousel() {
    const inner = this._elem.querySelector('.carousel__inner');
    setTimeout(() => {
      this.slideWidth = inner.offsetWidth;
      this.#updateCarousel();
    }, 0);
  

    

    this._elem.addEventListener('click', (event) => {
      // Обработка кнопки добавления товара
      const button = event.target.closest('.carousel__button');
      if (button) {
        const slide = button.closest('.carousel__slide');
        this._elem.dispatchEvent(new CustomEvent('product-add', {
          detail: slide.dataset.id,
          bubbles: true
        }));
        return;
      }

      // Обработка стрелок
      const arrow = event.target.closest('.carousel__arrow');
      if (!arrow) return;

      if (arrow.classList.contains('carousel__arrow_right')) {
        this.currentSlideIndex++;
      } else if (arrow.classList.contains('carousel__arrow_left')) {
        this.currentSlideIndex--;
      }

      this.#updateCarousel();
    });
  }

  #updateCarousel() {
    const inner = this._elem.querySelector('.carousel__inner');
    const arrowRight = this._elem.querySelector('.carousel__arrow_right');
    const arrowLeft = this._elem.querySelector('.carousel__arrow_left');
    const slides = this._elem.querySelectorAll('.carousel__slide');

    inner.style.transform = `translateX(-${this.currentSlideIndex * this.slideWidth}px)`;
    
    // Обновляем видимость стрелок
    arrowLeft.style.display = this.currentSlideIndex === 0 ? 'none' : '';
    arrowRight.style.display = this.currentSlideIndex === slides.length - 1 ? 'none' : '';
  }
}