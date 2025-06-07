function toggleText() {
  const button = document.querySelector(".toggle-text-button");
  const text = document.querySelector("#text");

  button.addEventListener("click", (evt) => {
    evt.preventDefault();
    text.hidden = text.hidden ? false : true;
  });
}
