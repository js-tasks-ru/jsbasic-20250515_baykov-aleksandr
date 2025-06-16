import createElement from '../../assets/lib/create-element.js';

export default class CartIcon {
  constructor() {
    this.render();

    this.addEventListeners();
  }

  render() {
    this.elem = createElement('<div class="cart-icon"></div>');
  }

  update(cart) {
    if (!cart.isEmpty()) {
      this.elem.classList.add('cart-icon_visible');

      this.elem.innerHTML = `
        <div class="cart-icon__inner">
          <span class="cart-icon__count">${cart.getTotalCount()}</span>
          <span class="cart-icon__price">€${cart.getTotalPrice().toFixed(2)}</span>
        </div>`;

      this.updatePosition();

      this.elem.classList.add('shake');
      this.elem.addEventListener('transitionend', () => {
        this.elem.classList.remove('shake');
      }, {once: true});

    } else {
      this.elem.classList.remove('cart-icon_visible');
    }
  }

  addEventListeners() {
    document.addEventListener('scroll', () => this.updatePosition());
    window.addEventListener('resize', () => this.updatePosition());
  }

  updatePosition() {
    const initialTopCoord = this.elem.getBoundingClientRect().top + window.pageYOffset;

    if (window.pageYOffset > initialTopCoord) {
      // плавающая корзина
      this.elem.style.position = 'fixed';
      this.elem.style.top = 50 + 'px';
      this.elem.style.right = 10 + 'px';
    } else {
      // корзина сверху
    }

    let isMobile = document.documentElement.clientWidth <= 767;

// Если условие выполняется, обнуляем стили к исходным
if (document.documentElement.clientWidth <= 767) {
  Object.assign(this.elem.style, {
    position: '',
    top: '',
    left: '',
    zIndex: ''
  });
}

  }
}
