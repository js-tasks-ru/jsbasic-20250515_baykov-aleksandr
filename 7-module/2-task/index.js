import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor(title, node) {
    this.elem = this.#createModal();
    this.open();
    this.setTitle(title);
    this.setBody(node);
    this.setupEventListeners();
  }

  #createModal() {
    return createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>
      </div>
    `);
  }

  open() {
    document.body.classList.add("is-modal-open");
    document.body.insertAdjacentElement("afterbegin", this.elem);
  }

  setTitle(title) {
    let titleName = this.elem.querySelector(".modal__title");
    titleName.textContent = title;
  }

  setBody(node) {
    let modalBody = this.elem.querySelector(".modal__body");
    modalBody.innerHTML = "";
    modalBody.append(node);
  }

  close() {
    document.body.classList.remove("is-modal-open");
    this.elem.remove();
    document.removeEventListener("keydown", this.escHandler);
  }

  setupEventListeners() {
    this.elem.querySelector(".modal__close").addEventListener("click", () => {
      this.close();
    });

    this.escHandler = (event) => {
      if (event.code === "Escape") {
        this.close();
      }
    };

    document.addEventListener("keydown", this.escHandler);
  }
}
