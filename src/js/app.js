import Ui from './Ui.js';
import CourseManager from './courseManager';

// Selecting buttons
const navButtons = document.querySelectorAll('.nav-button');
const courseForm = document.querySelector('.form--courses');
const courseName = document.querySelector('.form__input--course-name');
const courseCode = document.querySelector('.form__input--course-code');
const courseCredit = document.querySelector('.form__input--course-credit');

// DOMContentLoaded to initialize panel
document.addEventListener('DOMContentLoaded', () => {
  // Adding event listeners
  navButtons.forEach((button) => {
    button.addEventListener('click', function (event) {
      const buttonId = event.target.dataset.id;
      Ui.renderPage(buttonId);
      Ui.openFormOnClick(buttonId);
    });
  });

  courseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const modal = document.querySelector('.form-modal__courses');

    const course = {
      name: courseName.value,
      code: courseCode.value,
      credit: courseCredit.value,
    };

    const formButton = courseForm.querySelector('.form__button');

    if (formButton.dataset.action === 'edit') {
      course.id = formButton.dataset.courseId;
      CourseManager.editCourse(course);
    } else {
      CourseManager.addCourses(course);
    }
    Ui.closeForm(modal, courseForm.dataset.id);
    Ui.renderPage('courses');
  });
});
