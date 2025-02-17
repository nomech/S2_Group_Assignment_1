import Person from "./person";

class Student extends Person {
    constructor(name, email, phone, adress, id, enroll) {
        super(name, email, phone, adress, id);
        this.enroll = enroll;
        
    }
}

export default Student;