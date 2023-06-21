
class Person {
    constructor(fname, lname, age, dob) {
        this.firstName = fname;
        this.lastName = lname;
        this.age = age;
        this.dob = dob;
        this.detail = function () {
            return `${this.firstName} ${this.lastName} ${this.age}`;
        };
    }
    
    // add some method in Person constructor
    getFullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}

const person_1 = new Person('Sonu','Chauhdary',23,'23-12-1999')
const person_2 = new Person('monu','Chauhdary',20,'13-12-2003')
console.log(person_1.detail());


console.log(person_2.getFullName());