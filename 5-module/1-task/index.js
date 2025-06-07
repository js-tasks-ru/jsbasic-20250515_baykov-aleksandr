function hideSelf() {
  const button = document.querySelector(".hide-self-button");
  button.addEventListener("click", (evt) => {
    evt.preventDefault();
    evt.target.hidden = true;
  });
}
