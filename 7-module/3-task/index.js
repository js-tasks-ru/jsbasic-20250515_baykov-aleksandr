export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this._elem = this.#render();
    this.changeValue();
  }

  get elem() {
    return this._elem;
  }

  #render() {
    const body = document.body;

    const slider = document.createElement("div");
    slider.className = "slider";

    const sliderThumb = document.createElement("div");
    sliderThumb.className = "slider__thumb";

    const sliderValue = document.createElement("span");
    sliderValue.className = "slider__value";
    sliderValue.textContent = "0";

    sliderThumb.appendChild(sliderValue);

    const sliderProgress = document.createElement("div");
    sliderProgress.className = "slider__progress";

    const sliderSteps = document.createElement("div");
    sliderSteps.className = "slider__steps";

    for (let i = 0; i < this.steps; i++) {
      const step = document.createElement("span");
      if (i === 0) {
        step.className = "slider__step-active";
      }
      step.dataset.stepValue = i;
      sliderSteps.appendChild(step);
    }

    slider.appendChild(sliderThumb);
    slider.appendChild(sliderProgress);
    slider.appendChild(sliderSteps);

    body.appendChild(slider);

    return slider;
  }

  changeValue() {
    this._elem.addEventListener("click", (event) => {
      if (event.target.closest(".slider__thumb")) return;

      const stepsContainer = this._elem.querySelector(".slider__steps");
      if (!stepsContainer) return;

      const steps = Array.from(stepsContainer.children);
      if (!steps.length) return;

      const rect = stepsContainer.getBoundingClientRect();
      const clickPos = (event.clientX - rect.left) / rect.width;

      const stepIndex = Math.round(clickPos * (steps.length - 1));
      const closestStep = steps[stepIndex];

      this.updateValueFromStep(closestStep);
    });
  }

  updateValueFromStep(step) {
    const newValue = parseInt(step.dataset.stepValue);

    if (isNaN(newValue)) return;

    const previousActive = this._elem.querySelector(".slider__step-active");
    if (previousActive) previousActive.classList.remove("slider__step-active");
    step.classList.add("slider__step-active");

    this.value = newValue;

    let progress = this._elem.querySelector(".slider__progress");
    const thumb = this._elem.querySelector(".slider__thumb");
    thumb.querySelector(".slider__value").textContent = newValue;

    const segments = this.steps - 1;
    const leftPercents = (newValue / segments) * 100;

    thumb.style.left = `${leftPercents}%`;
    progress.style.width = `${leftPercents}%`;
    this._elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      })
    );
  }
}
