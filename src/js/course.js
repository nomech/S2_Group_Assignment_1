import { v4 as uuidv4 } from "uuid";

class Course {
  constructor(name, code, credit) {
    this.id = uuidv4();
    this.name = name;
    this.code = code;
    this.credit = credit;
    this.students = [];
    this.instructor = "";
    this.type = "course";
  }
}

export default Course;
