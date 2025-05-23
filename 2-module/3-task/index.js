let calculator = {
  read(a, b) {
    this.a = +prompt('Число a');
    this.b = +prompt('Число b');
  },

  sum(a, b) {
    return this.a + this.b;
  },

  mul(a, b) {
    return this.a * this.b;
  }

};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
