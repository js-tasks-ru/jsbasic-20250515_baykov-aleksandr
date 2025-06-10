import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.currentSlideIndex = 0;
    this._elem = this.#render();  // Сохраняем элемент в this._elem
    this.#initCarousel();
  }

  get elem() {
    return this._elem;  // Добавляем требуемый геттер
  }

  #render() {
    const carousel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left" style="display: none">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner"></div>
      </div>
    `);

    const inner = carousel.querySelector('.carousel__inner');
    
    this.slides.forEach(slide => {
      inner.append(createElement(`
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
      `));
    });

    return carousel;
  }

  #initCarousel() {
    const carouselInner = this._elem.querySelector('.carousel__inner');
    const arrowRight = this._elem.querySelector('.carousel__arrow_right');
    const arrowLeft = this._elem.querySelector('.carousel__arrow_left');
    const slidesCount = this.slides.length;
    const slideWidth = carouselInner.querySelector('.carousel__slide').offsetWidth;

    this._elem.addEventListener('click', (event) => {
      // Обработка кнопки добавления товара
      if (event.target.closest('.carousel__button')) {
        const slide = event.target.closest('.carousel__slide');
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

      // Правильное смещение слайдов
      carouselInner.style.transform = `translateX(-${slideWidth * this.currentSlideIndex}px)`;
      
      // Обновление видимости стрелок
      arrowRight.style.display = this.currentSlideIndex >= slidesCount - 1 ? 'none' : '';
      arrowLeft.style.display = this.currentSlideIndex <= 0 ? 'none' : '';
    });
  }
}
