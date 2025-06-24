import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    document.querySelector('div[data-carousel-holder]').append(new Carousel(slides)._elem);
    document.querySelector('div[data-ribbon-holder]').append(new RibbonMenu(categories)._elem);
    document.querySelector('div[data-slider-holder]').append(new StepSlider({steps: 5, value: 3})._elem);
    const cartIcon = new CartIcon();
    document.querySelector('div[data-cart-icon-holder]').append(cartIcon.elem);
    const cart = new Cart(cartIcon);


    //Создайте экземпляр компонента Cart передав ему как аргумент созданный ранее экземпляр компонента CartIcon.
  }
}
