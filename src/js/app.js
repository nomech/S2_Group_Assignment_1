import Ui from './Ui.js';
import CourseManager from './courseManager';
import Person from './person.js';

// Selecting buttons
const navButtons = document.querySelectorAll('.nav-button');
const courseForm = document.querySelector('.form--courses');
const courseName = document.querySelector('.form__input--course-name');
const courseCode = document.querySelector('.form__input--course-code');
const courseCredit = document.querySelector('.form__input--course-credit');

const studentForm = document.querySelector('.form--students');
const studentName = document.querySelector('.form__input--student-name');
const studentEmail = document.querySelector('.form__input--student-email');
const studentPhone = document.querySelector('.form__input--student-phone');
const studentAddress = document.querySelector('.form__input--student-address');
const studentEnrolledCourses = document.querySelectorAll(
  '.form__select--student'
);

const instructorForm = document.querySelector('.form--instructors');
const instructorName = document.querySelector('.form__input--instructor-name');
const instructorEmail = document.querySelector(
  '.form__input--instructor-email'
);
const instructorPhone = document.querySelector(
  '.form__input--instructor-phone'
);
const instructorAddress = document.querySelector(
  '.form__input--instructor-address'
);
const instructorAssignedCourses = document.querySelectorAll(
  '.form__select--instructor'
);

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

  function validateCourseForm() {
    if (!courseName.value || !courseCode.value || !courseCredit.value) {
      return false;
    }
    // courseName.value && courseErrorName.style.visibility = "visible"
    return true;
  }

  courseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const modal = document.querySelector('.form-modal__courses');

    if (validateCourseForm()) {
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
    }
  });

  function validateStudentForm() {
    if (
      !studentName.value ||
      !studentEmail.value ||
      !studentPhone.value ||
      !studentAddress.value
      // !studentEnrolledCourses.value
    ) {
      return false;
    }
    return true;
  }

  studentForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const modal = document.querySelector('.form-modal__students');

    const enrolledCourses = Array.from(studentEnrolledCourses).map((course) => {
      return course.value;
    });

    if (validateStudentForm()) {
      const student = {
        name: studentName.value,
        email: studentEmail.value,
        phone: studentPhone.value,
        address: studentAddress.value,
        enrolledCourses: enrolledCourses,
        type: 'student',
      };

      const formButton = studentForm.querySelector('.form__button');

      if (formButton.dataset.action === 'edit') {
        student.id = formButton.dataset.studentId;
        CourseManager.editPerson(student);
      } else {
        CourseManager.addPerson(student);
      }
      Ui.closeForm(modal, studentForm.dataset.id);
      Ui.renderPage('students');
    }
  });

  function validateInstructorForm() {
    console.log(!instructorName.value);
    if (
      !instructorName.value ||
      !instructorEmail.value ||
      !instructorPhone.value ||
      !instructorAddress.value
      // !instructorAssignedCourses.value
    ) {
      return false;
    }
    return true;
  }
  instructorForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const modal = document.querySelector('.form-modal__instructors');

    const assignedCourses = Array.from(instructorAssignedCourses).map(
      (course) => {
        return course.value;
      }
    );

    if (validateInstructorForm()) {
      const instructor = {
        name: instructorName.value,
        email: instructorEmail.value,
        phone: instructorPhone.value,
        address: instructorAddress.value,
        assignedCourses: assignedCourses,
        type: 'instructor',
      };

      const formButton = instructorForm.querySelector('.form__button');

      if (formButton.dataset.action === 'edit') {
        instructor.id = formButton.dataset.instructorId;
        CourseManager.editPerson(instructor);
      } else {
        CourseManager.addPerson(instructor);
      }
      Ui.closeForm(modal, instructorForm.dataset.id);
      Ui.renderPage('instructors');
    }
  });
});
