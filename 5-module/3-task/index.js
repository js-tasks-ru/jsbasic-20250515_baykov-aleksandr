function initCarousel() {
  const carousel__container = document.querySelector(".carousel");
  const carousel = carousel__container.querySelector(".carousel__inner");
  const carousel__slide = carousel.querySelector(".carousel__slide");
  const carousel__arrow_right = carousel__container.querySelector(
    ".carousel__arrow_right"
  );
  const carousel__arrow_left = carousel__container.querySelector(".carousel__arrow_left");
  const carousel__slide_width = carousel__slide.offsetWidth;

  let counter = 0;
  carousel__arrow_left.style.display = "none";

  carousel__container.addEventListener("click", (evt) => {
    const arrow = evt.target.closest('[class^="carousel"]');

    if (arrow.classList.contains("carousel__arrow_left") && counter < 0) {
      counter += 1;
      carousel.style.transform = `translateX(${
        carousel__slide_width * counter
      }px)`;
    }

    if (arrow.classList.contains("carousel__arrow_right") && counter < 3) {
      counter -= 1;
      carousel.style.transform = `translateX(${
        carousel__slide_width * counter
      }px)`;
    }

    carousel__arrow_right.style.display = counter === -3 ? "none" : "";
    carousel__arrow_left.style.display = counter === 0 ? "none" : "";
  });
}