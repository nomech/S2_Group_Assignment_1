import Person from "./person";

class Student extends Person {
  constructor(name, email, phone, address, enrolledCourses) {
    super(name, email, phone, address);
    this.enrolledCourses = enrolledCourses;
    this.type = "student";
  }
}

export default Student;
