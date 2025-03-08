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
    if (form.dataset.id === id) {
      form.classList.add("form-modal--show");
      if (id === "students" || id === "instructor") {
      }
    } 
  }

  static closeForm(form, id) {
    if (form.dataset.id === id) {
      form.classList.remove("form-modal--show");
    }
  }

  
  static renderCourses() {
    const coursesData = JSON.parse(localStorage.getItem("courses")) || [];
    const courseInputs = document.querySelectorAll(".form__select");  
    courseInputs.forEach((element) => {
      element.innerHTML = ""
      const defaultOption = document.createElement("option");
      defaultOption.value = "none";
      defaultOption.innerText = "Select Course";
      element.append(defaultOption);

      coursesData.forEach(course => {
        const option = document.createElement("option");
        option.value = course.code;
        option.innerText = course.name;
        element.append(option);
      });
    });
  }
  
  static validateForm(form) {
    const inputs = form.querySelectorAll("input, textarea, select");
    for (let input of inputs) {
      if (input.value.trim() === "") {
        return false;
      }
    }
    return true; 
  }
}

export default Ui;
