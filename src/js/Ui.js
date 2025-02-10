class Ui {
  //Add this to all nav buttonsj and pass the dataset id to the render page
  static renderPage(id) {
    this.clearPage();
    this.createPanel(id);
    //this.renderData(id);
  }

  static createPanel(id) {
    console.log(id);
    const panel = document.querySelector(".panel");
    const title = document.createElement("h2");
    title.classList.add("panel__title");
    title.textContent = id;

    const addButton = document.createElement("button");
    addButton.classList.add("panel__add");
    addButton.textContent = `add ${id}`;
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
}

export default Ui;
