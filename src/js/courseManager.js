import Student from './student';
import Instructor from './instructor';
import Course from './course';
import Ui from './Ui.js';

class CourseManager {
  static people = JSON.parse(localStorage.getItem('people')) || [];
  static courses = JSON.parse(localStorage.getItem('courses')) || [];

  static addPerson(person) {
    let item;
    if (person.type === 'student') {
      item = new Student(
        person.name,
        person.email,
        person.phone,
        person.address,
        person.enrolledCourses
      );

      person.enrolledCourses.forEach((course) => {
        const courseToUpdate = CourseManager.courses.findIndex((item) => {
          return item.id === course.id;
        });
        CourseManager.courses[courseToUpdate].students.push(person);
      });

      CourseManager.people.push(item);
    } else if (person.type === 'instructor') {
      item = new Instructor(
        person.name,
        person.email,
        person.phone,
        person.address,
        person.assignedCourses
      );

      person.assignedCourses.forEach((course) => {
        const courseToUpdate = CourseManager.courses.findIndex((item) => {
          return item.id === course.id;
        });
        CourseManager.courses[courseToUpdate].instructor = person.name;
      });

      CourseManager.people.push(item);
    } else {
      console.error('Invalid type');
      return;
    }

    CourseManager.saveData('courses', CourseManager.courses);
    CourseManager.saveData('people', CourseManager.people);
  }

  static addCourses(courseObject) {
    let item;

    item = new Course(
      courseObject.name,
      courseObject.code,
      courseObject.credit
    );

    CourseManager.courses.push(item);

    CourseManager.saveData('courses', CourseManager.courses);
  }

  static saveData(item, data) {
    localStorage.setItem(item, JSON.stringify(data));
  }

  static deletePerson(id) {
    const beforeDelete = CourseManager.people.length;
    CourseManager.people = CourseManager.people.filter(
      (person) => person.id !== id
    );

    if (CourseManager.people.length === beforeDelete) {
      console.error(`Person with ID ${id} not found.`);
    } else {
      CourseManager.saveData('people', CourseManager.people);

      Ui.renderPage('people');
    }
  }

  static deleteCourses(id) {
    const beforeDelete = CourseManager.courses.length;
    CourseManager.courses = CourseManager.courses.filter(
      (course) => course.id !== id
    );

    if (CourseManager.courses.length === beforeDelete) {
      console.error(`course with ID ${id} not found.`);
    } else {
      CourseManager.saveData('courses', CourseManager.courses);

      Ui.renderPage('courses');
    }
  }

  static editPerson(editedPerson) {
    const index = CourseManager.people.findIndex(
      (person) => person.id === editedPerson.id
    );

    if (index !== -1) {
      CourseManager.people[index].name = editedPerson.name;
      CourseManager.people[index].email = editedPerson.email;
      CourseManager.people[index].phone = editedPerson.phone;
      CourseManager.people[index].address = editedPerson.address;
      CourseManager.people[index].enrolledCourses =
        editedPerson.enrolledCourses;
      CourseManager.people[index].assignedCourses =
        editedPerson.assignedCourses;

      CourseManager.saveData('people', CourseManager.people);
      Ui.renderPage('people');
    } else {
      console.error('Person not found');
    }
  }

  static editCourse(editedCourse) {
    const index = CourseManager.courses.findIndex(
      (course) => String(course.id) === String(editedCourse.id)
    );

    if (index !== -1) {
      CourseManager.courses[index].name = editedCourse.name;
      CourseManager.courses[index].code = editedCourse.code;
      CourseManager.courses[index].credit = editedCourse.credit;

      CourseManager.saveData('courses', CourseManager.courses);

      Ui.renderPage('courses');
    } else {
      console.error('Course not found');
    }
  }
}

export default CourseManager;
