import { v4 as uuidv4 } from "uuid";

class Person {
  constructor(name, email, phone, adress, id, enrollCourse, assignCourse) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.adress = adress;
    this.enrollCourseCourse = enrollCourse;
    this.assignCourse = assignCourse;
  }
}
export default Person;
