class Ui {
  //Add this to all nav buttonsj and pass the dataset id to the render page
  static renderPage(id) {
    this.clearPage();
    this.createPanel(id);
    //this.renderData(id);
  }

  static createPanel(id) {
    const panel = document.querySelector(".panel");
    const title = document.createElement("h2");
    title.classList.add("panel__title");
    title.textContent = id;

    const addButton = document.createElement("button");
    addButton.classList.add("panel__add", "button", "panel__button");
    addButton.textContent = `add ${id}`;
    addButton.dataset.id = id;

    panel.append(title, addButton);
  }

  static renderData(id) {
    const data = localStorage.getItem(id);
  }

  static clearPage() {
    const panel = document.querySelector(".panel");
    panel.innerHTML = "";

    const data = document.querySelector(".data");
    data.innerHTML = "";
  }

  static openForm(form, id) {
    console.log(form);
    
    if (form.dataset.id === id) {
      form.classList.add("form-modal--show");
    }
  }

  static createInputElement(type, name, placeholder) {
    const input = document.createElement("input");
    input.classList.add("panel__input", "panel__input--" + name);
    input.type = type;
    input.name = name;
    input.placeholder = placeholder;
    return input;
  }
}

export default Ui;
