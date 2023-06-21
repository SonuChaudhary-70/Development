class Student{
    constructor(username,roll,stream){
        this.name = username;
        this.rollNumber = roll;
        this.stream = stream
    }

    print(){
        let details = {
            name: this.name,
            RollNumber : this.rollNumber,
            stream : this.stream
        }
        console.log(details);
    }
}

let stud1 = new Student('sonu',2,'science')
stud1.print()