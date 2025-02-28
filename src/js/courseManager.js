import Student from "./student";
import Instructor from "./instructor";
import Course from "./course";

class CourseManager {
  static people = JSON.parse(localStorage.getItem("people")) || [];
  static courses = JSON.parse(localStorage.getItem("courses")) || [];

  static addPerson(person) {
    let item;
    if (person.type === "student") {
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
    } else if (person.type === "instructor") {
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
      console.error("Invalid type");
      return;
    }

    CourseManager.saveData("courses", CourseManager.courses);
    CourseManager.saveData("people", CourseManager.people);
  }

  static addCourses(courseObject) {
    let item;

      item = new Course(
        courseObject.name,
        courseObject.code,
        courseObject.credit
      );

      CourseManager.courses.push(item);


    CourseManager.saveData("courses", CourseManager.courses);
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
      CourseManager.saveData("people", CourseManager.people);
    }
  }

  static editPerson(editedPerson) {
    const index = CourseManager.people.findIndex(
      (person) => person.id === editedPerson.id
    );

    if (index !== -1) {
      CourseManager.people[index] = editedPerson;
      CourseManager.saveData("people", CourseManager.people);
    } else {
      console.error("Person not found");
    }
  }
}

export default CourseManager;
