import Ui from "./Ui.js";
import CourseManager from "./courseManager";
import Person from "./person.js";

// Selecting buttons
const navButtons = document.querySelectorAll(".nav-button");
const courseForm = document.querySelector(".form--courses");
const courseName = document.querySelector(".form__input--course-name");
const courseCode = document.querySelector(".form__input--course-code");
const courseCredit = document.querySelector(".form__input--course-credit");
const studentForm = document.querySelector(".form--students");
const studentName = document.querySelector(".form__input");
const studentEmail = document.querySelector(".form__input");
const studentPhone = document.querySelector(".form__input");
const studentAdress = document.querySelector(".form__input");
const studentEnrolledCourses = document.querySelector(".form__select");
const instructorForm = document.querySelector(".form--instructors");
const instructorName = document.querySelector(".form__input");
const instructorEmail = document.querySelector(".form__input");
const instructorPhone = document.querySelector(".form__input");
const instructorAdress = document.querySelector(".form__input");
const instructorAssignedCourses = document.querySelector(".form__select");

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

    function validateStudentForm () {
        if (!studentName.value || !studentEmail.value || !studentPhone.value || !studentAdress.value || !studentEnrolledCourses.value ) {
            return false;
        } 
        return true;
    }
    studentForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const modal = document.querySelector(".form-modal__students");
        
        
        if (validateStudentForm()) {
            const student = {
                name: studentName.value,
                email: studentEmail.value,
                phone: studentPhone,
                adress: studentAdress.value,
                course: studentEnrolledCourses.value,
                type: "student"
                
            }
            CourseManager.addPerson(student);

            Ui.closeForm(modal, studentForm.dataset.id);  
        }
        
        studentForm.reset ();
    });

    function validateInstructorForm () {
        if (!instructorName.value || !instructorEmail.value || !instructorPhone.value || !instructorAdress.value || !instructorAssignedCourses.value ) {
            return false;
        } 
        return true;
    }
    instructorForm.addEventListener("submit", (e) => {
        e.preventDefault()
        const modal = document.querySelector(".form-modal__instructors");

        if (validateInstructorForm()) {
            const instructor = {
                name: instructorName.value,
                email: instructorEmail.value,
                phone: instructorPhone,
                adress: instructorAdress.value,
                course: instructorAssignedCourses.value
            }
        }

        CourseManager.addInstructor("instructor");

        Ui.closeForm(modal, instructorForm.dataset.id);

        instructorForm.reset ();
    });

  
  
});
