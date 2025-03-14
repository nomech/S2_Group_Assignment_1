import CourseManager from "./courseManager";
import edit from "../assets/icons/edit.svg";
import deleteIconSvg from "../assets/icons/delete.svg";
import addressIconSvg from "../assets/icons/address.svg";
import emailIconSvg from "../assets/icons/email.svg";
import phoneIconSvg from "../assets/icons/phone.svg";
import coursesSvg from "../assets/icons/courses.svg";
import addIcon from "../assets/icons/add.svg";
import star from "../assets/icons/star.svg";
import tag from "../assets/icons/tag.svg";
import instructorIconSvg from "../assets/icons/instructor.svg";
import studentIconSvg from "../assets/icons/users.svg";

class Ui {
  // Render the page: clear previous content, create a panel, and render stored data.
  static renderPage(id) {
    this.clearPage();
    this.createPanel(id);
    this.renderData(id);
  }

  // Create a navigation panel with a title and an add button.
  static createPanel(id) {
    // Select the panel and form elements.
    const panel = document.querySelector(".panel");
    const form = document.querySelector(`.form-modal__${id}`);

    // Create the panel title and add button.
    const title = document.createElement("h2");
    const addButton = document.createElement("button");
    const addButtonText = document.createElement("p");
    const addIconElement = document.createElement("img");

    // Add classes
    title.classList.add("panel__title");
    addButton.classList.add("panel__add", "button", "panel__button");
    addButtonText.classList.add("panel__add-text");
    addIconElement.classList.add("panel__add-icon");

    // Set text content
    title.textContent = id;
    addButtonText.textContent = `add ${id}`;

    //Add icon
    addIconElement.src = addIcon;

    // Set data attributes.
    addButton.dataset.id = id;

    addButton.append(addIconElement, addButtonText);

    // Append elements to the panel.
    panel.append(title, addButton);
    Ui.openFormOnClick(form, id);
  }

  // Open the form when the add button is clicked.
  static openFormOnClick = (form, id) => {
    // Select the add and close buttons.
    const addButton = document.querySelector(".panel__add");
    const closeButton = document.querySelectorAll(".form-modal__close");

    // Open the form when the add button is clicked.
    addButton.addEventListener("click", () => {
      Ui.openForm(form, id);
      // Render course options.
      if (id === "students") {
        Ui.renderCourseOptions();
      } else if (id === "instructors") {
        Ui.renderCourseOptionsInstructor();
      }
    });

    // Close the form when the close button is clicked.
    closeButton.forEach((button) => {
      button.addEventListener("click", () => {
        Ui.closeForm(form, id);
      });
    });
  };

  // Render stored data cards for the given id (courses, students, or instructors).
  static renderData(id) {
    // Get the data from local storage or an empty array.
    const data = JSON.parse(localStorage.getItem(id)) || [];

    // Select the data container.
    const dataContainer = document.querySelector(".data");

    // Render the data cards.
    data.forEach((item) => {
      // Create card elements.
      const dataContainer = document.querySelector(".data");
      const card = document.createElement("div");
      const cardTitle = document.createElement("h3");
      const cardContent = document.createElement("div");
      const deleteButton = document.createElement("button");
      const deleteIcon = document.createElement("img");
      const editButton = document.createElement("button");
      const editIcon = document.createElement("img");

      // Add classes.
      card.classList.add("card");
      cardTitle.classList.add("data__title");
      cardContent.classList.add("card__item");
      deleteButton.classList.add("button", "card__delete");
      editButton.classList.add("button", "card__edit");
      deleteIcon.classList.add("card__edit-icon");
      editIcon.classList.add("card__delete-icon");

      editIcon.src = edit;
      editButton.append(editIcon, `Edit`);

      deleteIcon.src = deleteIconSvg;
      deleteButton.append(deleteIcon, `Delete`);

      // Set data attributes.
      card.dataset.id = item.id;
      if (item.type === "student") {
        // Create student card elements.

        // Create group elements.
        const emailGroup = document.createElement("div");
        const phoneGroup = document.createElement("div");
        const addressGroup = document.createElement("div");
        const enrolledCoursesGroup = document.createElement("div");
        const buttonGroup = document.createElement("div");

        // Create text elements.
        const email = document.createElement("p");
        const phone = document.createElement("p");
        const address = document.createElement("p");
        const enrolledCourses = document.createElement("p");

        // Create icon elements.
        const emailIcon = document.createElement("img");
        const phoneIcon = document.createElement("img");
        const addressIcon = document.createElement("img");
        const coursesIcon = document.createElement("img");

        // Set text content and classes.
        cardTitle.textContent = item.name;
        email.textContent = item.email;
        phone.textContent = item.phone;
        address.textContent = item.address;
        enrolledCourses.textContent = `Enrolled Courses: ${item.enrolledCourses}`;

        // Add classes
        dataContainer.classList.add("data--students");
        cardContent.classList.add("card__item--students");
        emailGroup.classList.add("card__group");
        phoneGroup.classList.add("card__group");
        addressGroup.classList.add("card__group");
        emailIcon.classList.add("card__icon");
        phoneIcon.classList.add("card__icon");
        addressIcon.classList.add("card__icon");
        coursesIcon.classList.add("card__icon");
        enrolledCoursesGroup.classList.add(
          "card__group",
          "card__group--courses"
        );
        buttonGroup.classList.add("card__button-group");

        // Set icons
        emailIcon.src = emailIconSvg;
        phoneIcon.src = phoneIconSvg;
        addressIcon.src = addressIconSvg;
        coursesIcon.src = coursesSvg;

        // Set data attributes.
        editButton.dataset.id = item.id;
        deleteButton.dataset.id = item.id;

        // Append elements to the card.

        emailGroup.append(emailIcon, email);
        phoneGroup.append(phoneIcon, phone);
        addressGroup.append(addressIcon, address);
        enrolledCoursesGroup.append(coursesIcon, enrolledCourses);
        cardContent.append(
          emailGroup,
          phoneGroup,
          addressGroup,
          enrolledCoursesGroup
        );
        buttonGroup.append(editButton, deleteButton);
        cardContent.append(buttonGroup);

        // Delete student event.
        deleteButton.addEventListener("click", () => {
          Ui.promptDeleteConfirmation(() => {
            CourseManager.deleteStudent(item.id, "students");
          });
        });

        // Edit student event: pre-fill the form for editing.
        editButton.addEventListener("click", () => {
          const studentForm = document.querySelector(`.form-modal__students`);
          const nameInput = studentForm.querySelector(
            ".form__input--student-name"
          );
          const emailInput = studentForm.querySelector(
            ".form__input--student-email"
          );
          const phoneInput = studentForm.querySelector(
            ".form__input--student-phone"
          );
          const addressInput = studentForm.querySelector(
            ".form__input--student-address"
          );
          const courseSelect = studentForm.querySelectorAll(
            ".form__select--student"
          );
          const formButton = studentForm.querySelector(".form__button");

          // Pre-fill the form with the student data.
          nameInput.value = item.name;
          emailInput.value = item.email;
          phoneInput.value = item.phone;
          addressInput.value = item.address;

          // Pre-fill the course select dropdowns.
          courseSelect.forEach((select, index) => {
            if (item.enrolledCourses[index]) {
              select.value = item.enrolledCourses[index];
            }
          });

          // Set the form button text
          formButton.textContent = "Edit Student";

          // Set the form button data attributes.
          formButton.dataset.action = "edit";
          formButton.dataset.studentId = item.id;

          // Add the show class to the form modal.
          Ui.openForm(studentForm, "students");
          Ui.renderCourseOptionsStudentEdit(item.enrolledCourses);
        });
      } else if (item.type === "instructor") {
        // Create instructor card elements.
        const emailGroup = document.createElement("div");
        const phoneGroup = document.createElement("div");
        const addressGroup = document.createElement("div");
        const assignedCoursesGroup = document.createElement("div");
        const buttonGroup = document.createElement("div");

        const emailIcon = document.createElement("img");
        const phoneIcon = document.createElement("img");
        const addressIcon = document.createElement("img");
        const coursesIcon = document.createElement("img");

        const email = document.createElement("p");
        const phone = document.createElement("p");
        const address = document.createElement("p");
        const assignedCourses = document.createElement("p");

        // Set text content and classes.
        cardTitle.textContent = item.name;
        email.textContent = item.email;
        phone.textContent = item.phone;
        address.textContent = item.address;
        assignedCourses.textContent = `Assigned Courses: ${item.assignedCourses}`;

        // Add classes.
        dataContainer.classList.add("data--instructors");
        cardContent.classList.add("card__item--instructors");
        emailGroup.classList.add("card__group");
        phoneGroup.classList.add("card__group");
        addressGroup.classList.add("card__group");
        emailIcon.classList.add("card__icon");
        phoneIcon.classList.add("card__icon");
        addressIcon.classList.add("card__icon");
        coursesIcon.classList.add("card__icon");
        assignedCoursesGroup.classList.add(
          "card__group",
          "card__group--courses"
        );
        buttonGroup.classList.add("card__button-group");

        // Set icons.
        emailIcon.src = emailIconSvg;
        phoneIcon.src = phoneIconSvg;
        addressIcon.src = addressIconSvg;
        coursesIcon.src = coursesSvg;

        // Set data attributes for buttons.
        deleteButton.dataset.id = item.id;
        editButton.dataset.id = item.id;

        // Append buttons to the card.

        emailGroup.append(emailIcon, email);
        phoneGroup.append(phoneIcon, phone);
        addressGroup.append(addressIcon, address);
        assignedCoursesGroup.append(coursesIcon, assignedCourses);
        cardContent.append(
          emailGroup,
          phoneGroup,
          addressGroup,
          assignedCoursesGroup
        );
        buttonGroup.append(editButton, deleteButton);
        cardContent.append(buttonGroup);

        // Add event listeners for delete and edit buttons.
        deleteButton.addEventListener("click", () => {
          Ui.promptDeleteConfirmation(() => {
            CourseManager.deleteInstructor(item.id, "instructors");
          });
        });

        editButton.addEventListener("click", () => {
          // Pre-fill the form for editing.
          const instructorForm = document.querySelector(
            `.form-modal__instructors`
          );
          const nameInput = instructorForm.querySelector(
            ".form__input--instructor-name"
          );
          const emailInput = instructorForm.querySelector(
            ".form__input--instructor-email"
          );
          const phoneInput = instructorForm.querySelector(
            ".form__input--instructor-phone"
          );
          const addressInput = instructorForm.querySelector(
            ".form__input--instructor-address"
          );
          const courseSelect = instructorForm.querySelectorAll(
            ".form__select--instructor"
          );
          const formButton = instructorForm.querySelector(".form__button");

          // Pre-fill the form with the instructor data.
          nameInput.value = item.name;
          emailInput.value = item.email;
          phoneInput.value = item.phone;
          addressInput.value = item.address;

          // Pre-fill the course select dropdowns.
          courseSelect.forEach((select, index) => {
            if (item.assignedCourses[index]) {
              select.value = item.assignedCourses[index];
            }
          });

          // Set the form button text and data attributes.
          formButton.textContent = "Edit Instructor";
          formButton.dataset.action = "edit";
          formButton.dataset.instructorId = item.id;

          // Add the show class to the form modal.
          Ui.openForm(instructorForm, "instructors");
          Ui.renderCourseOptionsInstructorEdit(item.assignedCourses);
        });
      } else if (id === "courses") {
        // Create course card elements.
        const codeGroup = document.createElement("div");
        const creditGroup = document.createElement("div");
        const instructorGroup = document.createElement("div");
        const studentsGroup = document.createElement("div");
        const studentsListGroup = document.createElement("div");

        const tagIcon = document.createElement("img");
        const starIcon = document.createElement("img");
        const studentsIcon = document.createElement("img");
        const instructorIcon = document.createElement("img");

        const cardCode = document.createElement("p");
        const cardCredit = document.createElement("p");
        const cardInstructor = document.createElement("p");

        // Add classes to the elements.
        dataContainer.className = "data";
        card.classList.add("card--course");
        cardContent.classList.add("card__item--course");
        cardCode.classList.add("card__code");
        cardCredit.classList.add("card__credit");
        cardInstructor.classList.add("card__instructor");
        codeGroup.classList.add("card__group");
        creditGroup.classList.add("card__group");
        instructorGroup.classList.add("card__group");
        studentsGroup.classList.add("card__group", "card__group--students");
        tagIcon.classList.add("card__icon");
        starIcon.classList.add("card__icon");
        studentsIcon.classList.add("card__icon");
        instructorIcon.classList.add("card__icon");

        // Set text content.
        cardTitle.textContent = item.name;
        cardCode.textContent = `Code: ${item.code}`;
        cardCredit.textContent = `Credits: ${item.credit}`;
        cardInstructor.textContent = `Instructor: ${
          item.instructor.name || "None"
        }`;

        // Set icons
        tagIcon.src = tag;
        starIcon.src = star;
        studentsIcon.src = studentIconSvg;
        instructorIcon.src = instructorIconSvg;

        // Append elements to the card.
        codeGroup.append(tagIcon, cardCode);
        creditGroup.append(starIcon, cardCredit);
        instructorGroup.append(instructorIcon, cardInstructor);
        studentsGroup.append(studentsIcon);

        // Add enrolled students to the card.
        if (item.students && item.students.length > 0) {
          // Create a list of enrolled students.
          const studentsListTitle = document.createElement("h4");
          studentsListTitle.textContent = "Enrolled Students:";

          const studentsList = document.createElement("ul");
          studentsList.classList.add("card__group-list");

          // Append students to the list.
          item.students.forEach((student) => {
            const listItem = document.createElement("li");
            listItem.textContent = student.name || student;
            studentsList.append(listItem);
          });

          // Append the list to the card.
          studentsListGroup.append(studentsListTitle, studentsList);
          studentsGroup.append(studentsListGroup);
        }

        cardContent.append(
          instructorGroup,
          codeGroup,
          creditGroup,
          studentsGroup
        );

        // Add buttons to the card.
        const buttonGroup = document.createElement("div");

        // Add classes to the button group and buttons.
        buttonGroup.classList.add("card__button-group");

        // Set data attributes.
        editButton.dataset.id = item.id;
        deleteButton.dataset.id = item.id;

        // Append buttons to the card.
        buttonGroup.append(editButton, deleteButton);
        cardContent.append(buttonGroup);

        // Add event listeners for delete and edit buttons.
        deleteButton.addEventListener("click", () => {
          Ui.promptDeleteConfirmation(() => {
            CourseManager.deleteCourses(item.id, "courses");
          });
        });

        // Edit course event.
        editButton.addEventListener("click", () => {
          // Pre-fill the form for editing.
          const courseForm = document.querySelector(`.form-modal__courses`);
          const nameInput = courseForm.querySelector(
            ".form__input--course-name"
          );
          const codeInput = courseForm.querySelector(
            ".form__input--course-code"
          );
          const creditInput = courseForm.querySelector(
            ".form__input--course-credit"
          );
          const formButton = courseForm.querySelector(".form__button");

          // Pre-fill the form with the course data.
          nameInput.value = item.name;
          codeInput.value = item.code;
          creditInput.value = item.credit;

          // Set the form button text.
          formButton.textContent = "Edit Course";

          // Set the form button data attributes.
          formButton.dataset.action = "edit";
          formButton.dataset.courseId = item.id;

          // Rely on the submit event in the app file for handling the edit.
          Ui.openForm(courseForm, "courses");
        });
      }
      card.append(cardTitle, cardContent);
      dataContainer.append(card);
    });
  }

  // Clear the panel and data container.
  static clearPage() {
    // Select the panel and data elements.
    const panel = document.querySelector(".panel");
    panel.innerHTML = "";

    // Select the data container.
    const data = document.querySelector(".data");
    data.innerHTML = "";
  }

  // Add the show class to the modal if the data-id matches.
  static openForm(form, id) {
    if (form.dataset.id === id) {
      form.classList.add("form-modal--show");
    }
  }

  // Remove the show class from the modal and reset its inputs.
  static closeForm(form, id) {
    if (form.dataset.id === id) {
      // Select the form button .
      const formButton = form.querySelector(".form__button");

      // Remove the show class from the modal.
      form.classList.remove("form-modal--show");

      // Reset the form button text and data attributes.
      formButton.dataset.action = "add";

      // Reset the form button text.
      formButton.textContent = `Add ${id}`;

      // Reset the form inputs.
      const inputs = form.querySelectorAll("input, select");
      inputs.forEach((input) => {
        if (input.tagName.toLowerCase() === "select") {
          input.selectedIndex = 0;
        } else {
          input.value = "";
        }
      });
    }
  }

  // Render course options for student form select dropdowns.
  static renderCourseOptions() {
    // Get courses data from local storage.
    const coursesData = JSON.parse(localStorage.getItem("courses")) || [];

    // Select all student dropdowns
    const courseInputs = document.querySelectorAll(".form__select");

    // Get the selected values across all dropdowns.
    const selectedValues = Array.from(courseInputs)
      .map((select) => select.value)
      .filter((value) => value !== "");

    // Loop through each dropdown.
    courseInputs.forEach((element) => {
      // Get the current value from the selected courses array.
      const currentValue = element.value;
      element.innerHTML = "";

      // Create a default option.
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.innerText = "Select Course";
      element.append(defaultOption);

      // Loop through each course.
      coursesData.forEach((course) => {
        // Skip the course if it's already selected in another dropdown (and isn't the current value)
        // or if the course has 30 or more students.
        if (
          (selectedValues.includes(course.code) &&
            course.code !== currentValue) ||
          course.students.length >= 30
        ) {
          return;
        }

        // Create an option element.
        const option = document.createElement("option");
        option.value = course.code;
        option.innerText = course.name;
        option.dataset.id = course.id;
        element.append(option);
      });

      // Restore current selection.
      element.value = currentValue;
    });
  }

  static renderCourseOptionsStudentEdit(selectedCourses) {
    // Get all courses from local storage.
    const coursesData = JSON.parse(localStorage.getItem("courses")) || [];
    // Select all student dropdown elements (using, for example, .form__select--student).
    const courseInputs = document.querySelectorAll(".form__select--student");

    // Create a list of already selected course codes (ignoring empty values).
    const selectedValues = selectedCourses.filter((val) => val !== "");

    // Loop through each dropdown.
    courseInputs.forEach((element, index) => {
      const currentValue = selectedCourses[index] || "";
      element.innerHTML = "";

      // Create a default option.
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.innerText = "Select Course";
      element.append(defaultOption);

      coursesData.forEach((course) => {
        // If this course code is already selected in another dropdown and isn't the current value, skip it.
        if (
          selectedValues.includes(course.code) &&
          course.code !== currentValue
        ) {
          return;
        }

        // Create an option element.
        const option = document.createElement("option");
        option.value = course.code;
        option.innerText = course.name;
        option.dataset.id = course.id;

        // Set the selected attribute if the course code matches the current value.
        if (course.code === currentValue) {
          option.selected = true;
        }

        // Append the option to the select element.
        element.append(option);
      });
      element.value = currentValue;
    });
  }

  static renderCourseOptionsInstructor() {
    // Get all courses from local storage.
    const coursesData = JSON.parse(localStorage.getItem("courses")) || [];
    // Select all instructor dropdowns.
    const courseInputs = document.querySelectorAll(".form__select--instructor");

    // Get the selected values from the instructor dropdowns.
    const selectedValues = Array.from(courseInputs)
      .map((select) => select.value)
      .filter((value) => value !== "");

    // Loop through each dropdown.
    courseInputs.forEach((element) => {
      // Get the current value from the selected courses array.
      const currentValue = element.value;
      element.innerHTML = "";

      // Create a default option.
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.innerText = "Select Course";
      element.append(defaultOption);

      // Loop through each course.
      coursesData.forEach((course) => {
        // Skip if the course is already selected elsewhere (unless it's the current value).
        if (
          selectedValues.includes(course.code) &&
          course.code !== currentValue
        ) {
          return;
        }

        // Create an option element.
        const option = document.createElement("option");
        option.value = course.code;
        option.innerText = course.name;
        option.dataset.id = course.id;

        // Set the selected attribute if the course code matches the current value.
        if (course.code === currentValue) {
          option.selected = true;
        }

        // Append the option to the select element.
        element.append(option);
      });

      // Restore the current selection.
      element.value = currentValue;
    });
  }

  static renderCourseOptionsInstructorEdit(selectedCourses) {
    // Get all courses from local storage.
    const coursesData = JSON.parse(localStorage.getItem("courses")) || [];
    // Select all instructor dropdowns.
    const selectElements = document.querySelectorAll(
      ".form__select--instructor"
    );

    // Filter out empty selections.
    const selectedValues = selectedCourses.filter((val) => val !== "");

    // Loop through each dropdown.
    selectElements.forEach((select, index) => {
      // Get the current value from the selected courses array.
      const currentValue = selectedCourses[index] || "";
      select.innerHTML = "";

      // Create a default option.
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "Select Course";

      // Append the default option to the select element.
      select.append(defaultOption);

      // Loop through each course.
      coursesData.forEach((course) => {
        // Skip duplicate options unless it's the current selection.
        if (
          selectedValues.includes(course.code) &&
          course.code !== currentValue
        ) {
          return;
        }

        // Create an option element.
        const option = document.createElement("option");
        option.value = course.code;
        option.textContent = course.name;
        option.dataset.id = course.id;

        // Set the selected if the course code matches the current value.
        if (course.code === currentValue) {
          option.selected = true;
        }

        // Append the option to the select element.
        select.append(option);
      });

      // Restore the current selection.
      select.value = currentValue;
    });
  }

  // New method to handle delete confirmation using descriptive names
  static promptDeleteConfirmation(deleteAction) {
    const confirmModal = document.querySelector(".confirm-modal");
    const confirmButton = document.querySelector(".button__confirm");
    const cancelButton = document.querySelector(".button__no");

    // Display the confirmation modal.
    confirmModal.style.display = "flex";

    // Handler for confirming the deletion.
    const handleConfirmDeletion = () => {
      deleteAction(); // Execute the deletion action.
      resetConfirmationModal();
    };

    // Handler for canceling the deletion.
    const handleCancelDeletion = () => {
      resetConfirmationModal();
    };

    // Reset the modal by hiding it and removing event listeners.
    function resetConfirmationModal() {
      confirmModal.style.display = "none";
      confirmButton.removeEventListener("click", handleConfirmDeletion);
      cancelButton.removeEventListener("click", handleCancelDeletion);
    }

    // Add event listeners to the confirm and cancel buttons.
    confirmButton.addEventListener("click", handleConfirmDeletion);
    cancelButton.addEventListener("click", handleCancelDeletion);
  }
}

export default Ui;
