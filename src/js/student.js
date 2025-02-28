import Person from './person';

class Student extends Person {
  constructor(name, email, phone, address) {
    super(name, email, phone, address);
    this.enrolledCourses = [];
    this.type = 'student';
  }
}

export default Student;
