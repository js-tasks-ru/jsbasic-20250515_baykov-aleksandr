function initCarousel() {
  const carousel__container = document.querySelector('.carousel');
  const carousel = carousel__container.querySelector('.carousel__inner');
  const carousel__slide = carousel.querySelector('.carousel__slide');
  const carousel__slide_width = carousel__slide.offsetWidth;

  let counter = 0; //счетчик переключения слайдов влево/вправо

  carousel__container.addEventListener('click', (evt) => {
    const arrow = evt.target.closest('[class^="carousel"]');
    

    if (arrow.classList.contains('carousel__arrow_left')) {
      counter -= 1;
      carousel.style.transform = `translateX(${carousel__slide_width * counter}px)`;

    }

    if (arrow.classList.contains('carousel__arrow_right')) {
      counter += 1;
      carousel.style.transform = `translateX(${carousel__slide_width * counter}px)`;

    }
  })
}
/*Слайды должны перемещаться влево/вправо при клике по кнопкам вперёд/назад.

Их CSS классы:
- `.carousel__arrow_right` - класс кнопки переключения на слайд вперёд;
- `.carousel__arrow_left` - класс кнопки переключения на слайд назад;

Все слайды равны по ширине. В этом задании их для простоты ровно 4, и на это количество можно опираться в коде.

### Как (технически) переключается карусель?

Структура карусели такова, что есть внешний элемент, в котором находится "лента" из подряд идущих слайдов. Внешний элемент имеет фиксированную ширину, поэтому видна только часть ленты (один слайд).

CSS класс элемента-ленты, в котором находятся все слайды - `.carousel__inner`. Для переключения слайда мы будем сдвигать его на ширину одного слайда.

Допустим, что ширина одного слайда `300px`. Она может быть любой, точную ширину элемента, независимо от вёрстки, можно получить при помощи его свойства `offsetWidth`. Там хранится только число, без `px`. [Подробнее про offsetWidth](https://learn.javascript.ru/size-and-scroll#offsetwidth-height).

Чтобы переключить на второй слайд, нужно переместить элемент с классом `.carousel__inner` на `300px` влево. Это можно сделать, изменив его свойство transform следующим образом: `elem.style.transform = 'translateX(-300px)'`. 

Мы используем отрицательное значение пикселей, т.к. нам нужно сдвинуть весь элемент влево, если бы значение было положительное, он переместился бы наоборот вправо. [Подробнее про свойство style](https://learn.javascript.ru/styles-and-classes#element-style).

 Чтобы переключить ещё на один слайд вперёд, нужно наш элемент сдвинуть ещё на `300px`, вот так: `elem.style.transform = 'translateX(-600px)` и т.д. 

### Скрываем кнопки переключения при достижении крайних слайдов

Когда пользователь дошёл до 4-ого слайда, нужно скрыть кнопку переключения вперёд, и наоборот, когда пользователь видит первый слайд, нужно скрыть кнопку переключения назад. 

Скрывать и показывать кнопки нужно с помощью CSS свойства `display`, вот так: 
- `carouselArrow.style.display = 'none'` - скрыть кнопку,
- `carouselArrow.style.display = ''` - показать кнопку,

(Предполагается, что в переменной `carouselArrow` содержится ссылка на кнопку переключения слайдов). */