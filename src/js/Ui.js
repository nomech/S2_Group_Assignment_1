import CourseManager from './courseManager';
class Ui {
  //Add this to all nav buttonsj and pass the dataset id to the render page
  static renderPage(id) {
    this.clearPage();
    this.createPanel(id);
    this.renderData(id);
  }

  static openFormOnClick = (id) => {
    const panel = document.querySelector('.panel__add');

    const form = document.querySelector(`.form-modal__${id}`);
    Ui.renderCourseOptions();

    // Adding event listener to panel button
    panel.addEventListener('click', (e) => {
      const panel = document.querySelector('.panel__add');
      Ui.openForm(form, id);
    });

    const close = document.querySelectorAll('.form-modal__close');
    close.forEach((button) => {
      button.addEventListener('click', (e) => {
        Ui.closeForm(form, id);
      });
    });
  };

  static createPanel(id) {
    const panel = document.querySelector('.panel');
    const title = document.createElement('h2');
    title.classList.add('panel__title');
    title.textContent = id;

    const addButton = document.createElement('button');
    addButton.classList.add('panel__add', 'button', 'panel__button');
    addButton.textContent = `add ${id}`;
    addButton.dataset.id = id;

    panel.append(title, addButton);
  }

  static renderData(id) {
    const data = JSON.parse(localStorage.getItem(id)) || [];
    const dataContainer = document.querySelector('.data');

    data.forEach((item) => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.dataset.id = item.id;

      const cardTitle = document.createElement('h3');
      cardTitle.classList.add('data__title');
      cardTitle.textContent = item.name;

      const cardContent = document.createElement('div');
      cardContent.classList.add('card__item');

      const deleteButton = document.createElement('button');
      const editButton = document.createElement('button');

      if (id === 'students') {
        deleteButton.addEventListener('click', () => {
          CourseManager.deletePerson(item.id);
        });
        editButton.addEventListener('click', () => {
          CourseManager.editPerson(item);
        });
        cardListItem.textContent = item.email;
      } else if (id === 'instructors') {
        deleteButton.addEventListener('click', () => {
          CourseManager.deletePerson(item.id);
        });
        editButton.addEventListener('click', () => {
          const instructorForm = document.querySelector(
            `.form-modal__instructors`
          );

          if (!instructorForm) {
            console.error('Instructor form not found!');
            return;
          }

          const nameInput = instructorForm.querySelector('#name');
          const emailInput = instructorForm.querySelector('#email');
          const phoneInput = instructorForm.querySelector('#phone');
          const addressInput = instructorForm.querySelector('#address');
          const courseSelect = instructorForm.querySelector('#course');
          const formButton = instructorForm.querySelector('.form__button');

          if (
            !nameInput ||
            !emailInput ||
            !phoneInput ||
            !addressInput ||
            !phoneInput
          ) {
            console.error('Form inputs not found!');
            return;
          }

          nameInput.value = item.name;
          emailInput.value = item.email;
          phoneInput.value = item.phone;
          addressInput.value = item.address;
          courseSelect.value = item.assignedCourses;

          formButton.textContent = 'Edit Instructor';
          formButton.dataset.action = 'edit';
          formButton.dataset.instructorId = item.id; // Store the course ID for later to be used in app.js

          this.openForm(instructorForm, 'courses');
          CourseManager.editPerson(item);
        });
        cardListItem.textContent = item.email;
      } else if (id === 'courses') {
        deleteButton.addEventListener('click', () => {
          CourseManager.deleteCourses(item.id);
        });
        editButton.addEventListener('click', () => {
          const courseForm = document.querySelector(`.form-modal__courses`);

          if (!courseForm) {
            console.error('Course form not found!');
            return;
          }

          const nameInput = courseForm.querySelector(
            '.form__input--course-name'
          );
          const codeInput = courseForm.querySelector(
            '.form__input--course-code'
          );
          const creditInput = courseForm.querySelector(
            '.form__input--course-credit'
          );
          const formButton = courseForm.querySelector('.form__button');

          if (!nameInput || !codeInput || !creditInput) {
            console.error('Form inputs not found!');
            return;
          }

          nameInput.value = item.name;
          codeInput.value = item.code;
          creditInput.value = item.credit;

          formButton.textContent = 'Edit Course';
          formButton.dataset.action = 'edit';
          formButton.dataset.courseId = item.id;

          this.openForm(courseForm, 'courses');
          CourseManager.editCourse(item);
        });

        const cardCode = document.createElement('p');
        const cardInstructor = document.createElement('p');
        const cardStudents = document.createElement('p');

        cardCode.classList.add('card__code');
        cardInstructor.classList.add('card__instructor');
        cardStudents.classList.add('card__students');

        cardCode.textContent = item.code;
        cardInstructor.textContent = `Instructor: ${item.instructor}`;

        const studentsList = document.createElement('ul');

        item.students.forEach((student) => {
          const listItem = document.createElement('li');
          listItem.textContent = student.name;
          studentsList.append(listItem);
        });

        const buttonGroup = document.createElement('div');
        buttonGroup.classList.add('card__button-group');

        editButton.classList.add('button', 'card__edit');
        editButton.textContent = 'Edit';
        editButton.dataset.id = item.id;

        deleteButton.classList.add('button', 'card__delete');
        deleteButton.textContent = 'Delete';
        deleteButton.dataset.id = item.id;

        buttonGroup.append(editButton, deleteButton);

        cardContent.append(cardCode, cardInstructor, studentsList, buttonGroup);
      }
      card.append(cardTitle, cardContent);
      dataContainer.append(card);
    });
  }

  static clearPage() {
    const panel = document.querySelector('.panel');
    panel.innerHTML = '';

    const data = document.querySelector('.data');
    data.innerHTML = '';
  }

  static openForm(form, id) {
    if (form.dataset.id === id) {
      form.classList.add('form-modal--show');
      if (id === 'students' || id === 'instructor') {
      }
    }
  }

  static closeForm(form, id) {
    if (form.dataset.id === id) {
      form.classList.remove('form-modal--show');
    }
  }

  static renderCourseOptions() {
    const coursesData = JSON.parse(localStorage.getItem('courses')) || [];
    const courseInputs = document.querySelectorAll('.form__select');
    courseInputs.forEach((element) => {
      element.innerHTML = '';
      const defaultOption = document.createElement('option');
      defaultOption.value = 'none';
      defaultOption.innerText = 'Select Course';
      element.append(defaultOption);

      coursesData.forEach((course) => {
        const option = document.createElement('option');
        option.value = course.code;
        option.innerText = course.name;
        option.dataset.id = course.id;
        element.append(option);
      });
    });
  }
}

export default Ui;
