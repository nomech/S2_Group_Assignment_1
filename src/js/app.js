import Ui from "./Ui.js";
import CourseManager from "./courseManager";

// DOM element selectors
// Navigation buttons
const navButtons = document.querySelectorAll(".nav-button");

// Course form elements
const courseForm = document.querySelector(".form--courses");
const courseName = document.querySelector(".form__input--course-name");
const courseCode = document.querySelector(".form__input--course-code");
const courseCredit = document.querySelector(".form__input--course-credit");

// Student form elements
const studentForm = document.querySelector(".form--students");
const studentName = document.querySelector(".form__input--student-name");
const studentEmail = document.querySelector(".form__input--student-email");
const studentPhone = document.querySelector(".form__input--student-phone");
const studentAddress = document.querySelector(".form__input--student-address");
const studentEnrolledCourses = document.querySelectorAll(".form__select--student");

// Instructor form elements
const instructorForm = document.querySelector(".form--instructors");
const instructorName = document.querySelector(".form__input--instructor-name");
const instructorEmail = document.querySelector(".form__input--instructor-email");
const instructorPhone = document.querySelector(".form__input--instructor-phone");
const instructorAddress = document.querySelector(".form__input--instructor-address");
const instructorAssignedCourses = document.querySelectorAll(".form__select--instructor");


document.addEventListener("DOMContentLoaded", () => {
  navButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      Ui.renderPage(event.target.dataset.id);
    });
  }); 

  // Update course options when a student course select changes.
  studentEnrolledCourses.forEach((select) => {
    select.addEventListener("change", (e) => {
      Ui.renderCourseOptions(e.target);
    });
  });

  // Update course options for instructor form when a select changes.
  instructorAssignedCourses.forEach((select) => {
    select.addEventListener("change", () => {
      Ui.renderCourseOptionsInstructor();
    });
  });

  // Validate course form.
  function validateCourseForm() {
    return courseName.value && courseCode.value && courseCredit.value;
  }

  // Course form submission.
  courseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const modal = document.querySelector(".form-modal__courses");

    if (validateCourseForm()) {
      const course = {
        name: courseName.value,
        code: courseCode.value,
        credit: courseCredit.value,
      };

      const formButton = courseForm.querySelector(".form__button");

      if (formButton.dataset.action === "edit") {
        course.id = formButton.dataset.courseId;
        CourseManager.editCourse(course);
      } else {
        CourseManager.addCourses(course);
      }

      // Clear form and close modal.
      courseForm.reset();
      Ui.closeForm(modal, "courses");
    }
  });

  // Validate student form.
  function validateStudentForm(enrolledCourses) {    
    return (
      studentName.value &&
      studentEmail.value &&
      studentPhone.value &&
      studentAddress.value &&
      enrolledCourses.length >= 1
    );
  }

  // Student form submission.
  studentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const modal = document.querySelector(".form-modal__students");

    const enrolledCourses = Array.from(studentEnrolledCourses)
      .filter((course) => course.value !== "")
      .map((course) => course.value);

    if (validateStudentForm(enrolledCourses)) {
      const student = {
        name: studentName.value,
        email: studentEmail.value,
        phone: studentPhone.value,
        address: studentAddress.value,
        enrolledCourses: enrolledCourses,
        type: "student",
      };

      const formButton = studentForm.querySelector(".form__button");

      if (formButton.dataset.action === "edit") {
        student.id = formButton.dataset.studentId;
        CourseManager.editStudent(student);
      } else {
        CourseManager.addStuddent(student);
      }

      // Clear form and close modal.
      studentForm.reset();
      Ui.closeForm(modal, "students");
    }
  });

  // Validate instructor form.
  function validateInstructorForm(assignedCourses) {
    return (
      instructorName.value &&
      instructorEmail.value &&
      instructorPhone.value &&
      instructorAddress.value &&
      assignedCourses.length >= 1
    );
  }

  // Instructor form submission.
  instructorForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const modal = document.querySelector(".form-modal__instructors");

    const assignedCourses = Array.from(instructorAssignedCourses)
      .filter((course) => course.value !== "")
      .map((course) => course.value);

    if (validateInstructorForm(assignedCourses)) {
      const instructor = {
        name: instructorName.value,
        email: instructorEmail.value,
        phone: instructorPhone.value,
        address: instructorAddress.value,
        assignedCourses: assignedCourses,
        type: "instructor",
      };

      const formButton = instructorForm.querySelector(".form__button");

      if (formButton.dataset.action === "edit") {
        instructor.id = formButton.dataset.instructorId;
        CourseManager.editInstructor(instructor);
      } else {
        CourseManager.addInstructor(instructor);
      }

      // Clear form and close modal.
      instructorForm.reset();
      Ui.closeForm(modal, "instructors");
    }
  });
});
