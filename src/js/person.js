import { v4 as uuidv4 } from "uuid";

class Person {
  constructor(name, email, phone, address) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.phone = phone;
    this.address = address;
  }
}
export default Person;
