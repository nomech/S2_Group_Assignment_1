import Person from "./person";

class Instructor extends Person {
  constructor(name, email, phone, address, assignedCourses) {
    super(name, email, phone, address);
    this.assignedCourses = assignedCourses;
    this.type = "instructor";
  }
}

export default Instructor;
