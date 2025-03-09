import Ui from "./Ui.js";
import CourseManager from "./courseManager";

// Selecting buttons
const navButtons = document.querySelectorAll(".nav-button");
const courseForm = document.querySelector(".form--courses");
const courseName = document.querySelector(".form__input--course-name");
const courseCode = document.querySelector(".form__input--course-code");
const courseCredit = document.querySelector(".form__input--course-credit");

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

  const openFormOnClick = (id) => {
    const panel = document.querySelector(".panel__add");

    const form = document.querySelector(`.form-modal__${id}`);
    Ui.renderCourseOptions();

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

//   courseForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const modal = document.querySelector(".form-modal__courses");
//     const course = {
//       name: courseName.value,
//       code: courseCode.value,
//       credit: courseCredit.value,
//     };
//     CourseManager.addCourses(course);
//     Ui.closeForm(modal, courseForm.dataset.id);
//   });
    
    
    function validateCourseForm() {
   
    if (!courseName.value || !courseCode.value || !courseCredit.value) {
      return false;
    }
    // courseName.value && courseErrorName.style.visibility = "visible" 
    return true;
    }

    courseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const modal = document.querySelector(".form-modal__courses");
  
    if (validateCourseForm()) {
  
      const course = {
        name: courseName.value,
        code: courseCode.value,
        credit: courseCredit.value,
      };
  
      CourseManager.addCourses(course);
  
      Ui.closeForm(modal, courseForm.dataset.id);

      courseForm.reset();
    }
  });

  
  
});
