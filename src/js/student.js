import Person from "./person";

class Student extends Person {
    constructor(name, email, phone, address) {
        super(name, email, phone, address);
        this.enrolledCourses = [];
        
    }

    enrollCourse(course) {
        this.enrolledCourses.push(course);
    }
}

export default Student;