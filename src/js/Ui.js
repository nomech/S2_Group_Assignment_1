class Ui {
  //Add this to all nav buttonsj and pass the dataset id to the render page
  static renderPage(id) {
    this.clearPage();
    this.createPanel(id);
    this.renderData(id);
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
    const data = JSON.parse(localStorage.getItem(id)) || [];
    const dataContainer = document.querySelector(".data");

    data.forEach((item) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.id = item.id;

      const cardTitle = document.createElement("h3");
      cardTitle.classList.add("data__title");
      cardTitle.textContent = item.name;

      const cardContent = document.createElement("div");
      cardContent.classList.add("card__item");

      if (id === "students") {
        cardListItem.textContent = item.email;
      } else if (id === "instructors") {
        cardListItem.textContent = item.email;
      } else if (id === "courses") {
        const cardCode = document.createElement("p");
        const cardInstructor = document.createElement("p");
        const cardStudents = document.createElement("p");

        cardCode.classList.add("card__code");
        cardInstructor.classList.add("card__instructor");
        cardStudents.classList.add("card__students");

        cardCode.textContent = item.code;
        cardInstructor.textContent = `Instructor: ${item.instructor}`;
        
        const studentsList = document.createElement("ul");

        item.students.forEach((student) => {
          const listItem = document.createElement("li");
          listItem.textContent = student.name;
          studentsList.append(listItem);
        });

        const buttonGroup = document.createElement("div");
        buttonGroup.classList.add("card__button-group");

        const editButton = document.createElement("button");
        editButton.classList.add("button", "card__edit");
        editButton.textContent = "Edit";
        editButton.dataset.id = item.id;

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("button", "card__delete");
        deleteButton.textContent = "Delete";
        deleteButton.dataset.id = item.id;

        buttonGroup.append(editButton, deleteButton);

        cardContent.append(cardCode, cardInstructor, studentsList, buttonGroup);
      }
      card.append(cardTitle, cardContent);
      dataContainer.append(card);
    });
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

  static renderCourseOptions() {
    const coursesData = JSON.parse(localStorage.getItem("courses")) || [];
    const courseInputs = document.querySelectorAll(".form__select");
    courseInputs.forEach((element) => {
      element.innerHTML = "";
      const defaultOption = document.createElement("option");
      defaultOption.value = "none";
      defaultOption.innerText = "Select Course";
      element.append(defaultOption);

      coursesData.forEach((course) => {
        const option = document.createElement("option");
        option.value = course.code;
        option.innerText = course.name;
        option.dataset.id = course.id;
        element.append(option);
      });
    });
  }  
}

export default Ui;
