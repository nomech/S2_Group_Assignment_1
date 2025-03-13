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
const studentName = document.querySelector(".form__input--student-name");
const studentEmail = document.querySelector(".form__input--student-email");
const studentPhone = document.querySelector(".form__input--student-phone");
const studentAddress = document.querySelector(".form__input--student-address");
const studentEnrolledCourses = document.querySelectorAll(
  ".form__select--student",
);

const instructorForm = document.querySelector(".form--instructors");
const instructorName = document.querySelector(".form__input--instructor-name");
const instructorEmail = document.querySelector(
  ".form__input--instructor-email",
);
const instructorPhone = document.querySelector(
  ".form__input--instructor-phone",
);
const instructorAddress = document.querySelector(
  ".form__input--instructor-address",
);
const instructorAssignedCourses = document.querySelectorAll(
  ".form__select--instructor",
);

// DOMContentLoaded to initialize panel
document.addEventListener("DOMContentLoaded", () => {
  // Adding event listeners
  navButtons.forEach((button) => {
    button.addEventListener("click", function (event) {
      const buttonId = event.target.dataset.id;
      Ui.renderPage(buttonId);
      Ui.openFormOnClick(buttonId);
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
    const storedCourses = JSON.parse(localStorage.getItem("courses"));
    console.log(storedCourses);
    const findCode = storedCourses.find((course) => {
      return course.code === courseCode.value;
    });

    if (findCode) {
      showErrorModal();
      return;
    } else {
      return courseName.value && courseCode.value && courseCredit.value;
    }
  }

  // Function to display course code error modal
  function showErrorModal() {
    const errorModal = document.querySelector(".error-modal");

    errorModal.style.display = "block";

    setTimeout(() => {
      errorModal.style.display = "none";
    }, 3000);
  }

  courseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const modal = document.querySelector(".form-modal__courses");

    // Validate course form.
    if (validateCourseForm()) {
      // Create course object.
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
      Ui.closeForm(modal, courseForm.dataset.id);
      Ui.renderPage("courses");
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

  studentForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const modal = document.querySelector(".form-modal__students");

    // Get enrolled courses.
    const enrolledCourses = Array.from(studentEnrolledCourses)
      .filter((course) => course.value !== "")
      .map((course) => course.value);

    // Validate student form.
    if (validateStudentForm(enrolledCourses)) {
      // Create student object.
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
        CourseManager.editPerson(student);
      } else {
        CourseManager.addPerson(student);
      }
      Ui.closeForm(modal, studentForm.dataset.id);
      Ui.renderPage("students");
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
      // Retrieve courses data.
      const coursesData = JSON.parse(localStorage.getItem("courses")) || [];
      // Get the current instructor id (if editing).
      const formButton = instructorForm.querySelector(".form__button");
      const currentInstructorId = formButton.dataset.instructorId || "";

      // Loop through each selected course.
      for (let courseCode of assignedCourses) {
        const course = coursesData.find((course) => course.code === courseCode);
        if (course && course.instructor && course.instructor.id) {
          // If we're editing and the course is already assigned to the current instructor, skip it.
          if (
            currentInstructorId &&
            course.instructor.id === currentInstructorId
          ) {
            continue;
          }

          // Display error message if the course is already assigned to an instructor.
          if (errorContainer) {
            errorContainer.innerText = `Course "${course.name}" already has an instructor. Please select another course.`;
          }
          return false;
        }
      }
      return true;
    }

    if (errorContainer) {
      errorContainer.innerText =
        "Please fill in all required fields and select at least one course.";
    }
    return false;
  }
  instructorForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const modal = document.querySelector(".form-modal__instructors");

    // Get assigned courses.
    const assignedCourses = Array.from(instructorAssignedCourses)
      .filter((course) => course.value !== "")
      .map((course) => course.value);

    // Validate instructor form.
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
        CourseManager.editPerson(instructor);
      } else {
        CourseManager.addPerson(instructor);
      }
      Ui.closeForm(modal, instructorForm.dataset.id);
      Ui.renderPage("instructors");
    }
  });
});
