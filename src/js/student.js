import Person from "./person";

class Student extends Person {
    constructor(name, email, phone, address, enrollCourse) {
        super(name, email, phone, address);
        this.enrollCourse = enrollCourse;
        
    }
}

export default Student;