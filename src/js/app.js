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
const studentEnrolledCourses = document.querySelectorAll(
  ".form__select--student",
);

// Instructor form elements
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

  // Function to display error modal
  function showErrorModal(message) {
    const errorModal = document.querySelector(".error-modal");
    const errorMessage = document.querySelector(".error-modal-message");

    errorMessage.textContent = message;
    errorModal.style.display = "block";

    setTimeout(() => {
      errorModal.style.display = "none";
    }, 3000);
  }

  // Validate course form.
  function validateCourseForm() {
    const storedCourses = JSON.parse(localStorage.getItem("courses"));
    const findCode = storedCourses.find((course) => {
      return course.code === courseCode.value;
    });

    if (!courseName.value || !courseCode.value || !courseCredit.value) {
      showErrorModal("All fields are required!");
      return false;
    }

    if (findCode) {
      showErrorModal("This course code is already in use!");
      return false;
    }
    return true;
  }

  // Course form submission.
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

      // Get form button.
      const formButton = courseForm.querySelector(".form__button");

      // Check if we're editing or adding a course.
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
    if (
      !studentName.value ||
      !studentEmail.value ||
      !studentPhone.value ||
      !studentAddress.value
    ) {
      showErrorModal("All student fields are required!");
      return false;
    }

    if (enrolledCourses.length < 1) {
      showErrorModal("Please enroll at least one course!");
      return false;
    }
    return true;
  }

  // Student form submission.
  studentForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get student modal.
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

      // Get form button.
      const formButton = studentForm.querySelector(".form__button");

      // Check if we're editing or adding a student.
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

  function validateInstructorForm(assignedCourses) {
    // Get error message container in the instructor form.
    const errorContainer = instructorForm.querySelector(".form-error");
    if (errorContainer) errorContainer.innerText = ""; // clear previous messages

    if (
      !instructorName.value ||
      !instructorEmail.value ||
      !instructorPhone.value ||
      !instructorAddress.value
    ) {
      showErrorModal("All instructor fields are required!");
      return false;
    }

    if (assignedCourses.length < 1) {
      showErrorModal("Please assign at least one course!");
      return false;
    }

    // Basic field validation.
    if (
      instructorName.value &&
      instructorEmail.value &&
      instructorPhone.value &&
      instructorAddress.value &&
      assignedCourses.length >= 1
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

          // Display error modal if the course is already assigned to an instructor.
          showErrorModal(
            `Course "${course.name}" already has an instructor. Please select another course.`,
          );
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

  // Instructor form submission.
  instructorForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get instructor modal.
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

      // Get form button.
      const formButton = instructorForm.querySelector(".form__button");

      // Check if we're editing or adding an instructor.
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
