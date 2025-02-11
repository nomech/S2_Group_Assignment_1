import Person from "./person";

class Instructor extends Person {
    constructor(name, email, phone, adress, id, instruct) {
        super(name, email, phone, adress, id);
        this.instruct = instruct;
        
    }
}

export default Instructor;