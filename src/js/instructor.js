import Person from './person';

class Instructor extends Person {
  constructor(name, email, phone, address) {
    super(name, email, phone, address);
    this.assignedCourses = [];
    this.type = 'instructor';
  }
}

export default Instructor;
