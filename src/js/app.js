import Ui from "./Ui.js";
import CourseManager from "./courseManager";

// Selecting buttons
const navButtons = document.querySelectorAll(".nav-button");

// DOMContentLoaded to initialize panel
document.addEventListener("DOMContentLoaded", () => {
  // Adding event listeners
  navButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const buttonId = event.target.dataset.id;
      Ui.renderPage(buttonId);
      openFormOnClick(buttonId);
    });
  });

  const course = {
    name: "Course 1",
    code: "CRS-1",
    credit: 5,
    type: "course",
  };

  CourseManager.addCourses(course);

  const person = {
    name: "Christoffer",
    email: "christoffer@test.no",
    phone: "123 45 678",
    address: "testveien 123",
    enrolledCourses: [
      {
        name: "Course 1",
        code: "CRS-1",
        credits: 5,
        id:"7943f435-f16f-479a-9770-ab4a25e3dfa4"
      }
    ],
    type: "student",
  };

  CourseManager.addPerson(person);

  const openFormOnClick = (id) => {
    const panel = document.querySelector(".panel__add");

    const form = document.querySelector(`.form-modal__${id}`);
    console.log(form);

    // Adding event listener to panel button
    panel.addEventListener("click", (e) => {
      const panel = document.querySelector(".panel__add");
      Ui.openForm(form, id);
    });

    const close = document.querySelectorAll(".form-modal__close");
    close.forEach((button) => {
      button.addEventListener("click", (e) => {
        Ui.closeForm(form, id);
      });
    });
  };
});
