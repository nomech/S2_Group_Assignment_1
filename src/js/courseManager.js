import Student from './student';
import Instructor from './instructor';
import Course from './course';

class CourseManager {
  static people = JSON.parse(localStorage.getItem('people')) || [];
  static courses = JSON.parse(localStorage.getItem('courses')) || [];

  /**
   * Adds a new person (Student or Instructor) to the CourseManager
   * @param {Object} person - Object containing person details
   */
  static addPerson(person) {
    let item;
    if (person.type === 'student') {
      item = new Student(
        person.name,
        person.email,
        person.phone,
        person.address
      ); // Removed enrolledCourses since it's already initialized

      CourseManager.people.push(item);
    } else if (person.type === 'instructor') {
      item = new Instructor(
        person.name,
        person.email,
        person.phone,
        person.address
      ); // Removed assignedCourses since it's already initialized

      CourseManager.people.push(item);
    } else {
      console.error('Invalid type');
      return;
    }

    CourseManager.savePeople(CourseManager.people);
  }

  /**
   * Adds a new course to the CourseManager
   * @param {Object} courseObject - Object containing course details
   */
  static addCourses(courseObject) {
    let item;
    if (courseObject.type === 'course') {
      item = new Course(
        courseObject.name,
        courseObject.code,
        courseObject.credit
      ); // Removed students & instructors since they're already initialized

      CourseManager.courses.push(item);
    } else {
      console.error('Invalid type');
      return;
    }

    CourseManager.saveCourses(CourseManager.courses);
  }

  /**
   * Saves the list of people to localStorage
   * @param {Array} people - Array of people to save
   */
  static savePeople(people) {
    localStorage.setItem('people', JSON.stringify(people));
  }

  /**
   * Saves the list of courses to localStorage
   * @param {Array} courses - Array of courses to save
   */
  static saveCourses(courses) {
    localStorage.setItem('courses', JSON.stringify(courses));
  }

  /**
   * Deletes a person by ID
   * @param {string} id - ID of the person to delete
   */
  static deletePerson(id) {
    const beforeDelete = CourseManager.people.length;
    CourseManager.people = CourseManager.people.filter(
      (person) => person.id !== id
    );

    if (CourseManager.people.length === beforeDelete) {
      console.error(`Person with ID ${id} not found.`);
    } else {
      CourseManager.savePeople(CourseManager.people);
    }
  }

  /**
   * Edits an existing person
   * @param {Object} editedPerson - Updated person object
   */
  static editPerson(editedPerson) {
    const index = CourseManager.people.findIndex(
      (person) => person.id === editedPerson.id
    );

    if (index !== -1) {
      CourseManager.people[index] = editedPerson;
      CourseManager.savePeople(CourseManager.people);
    } else {
      console.error('Person not found');
    }
  }
}

export default CourseManager;
