class Student {
    constructor(name, age, marks) {
        this.name = name;
        this.age = age;
        this.marks = marks;
    }

    // currying the function
    setPlacementAge(minPlacementAge) {
        return function eligibleForPlacementAge(minMarks) {
            if (this.marks > minMarks && this.age > minPlacementAge) {
                console.log(`${this.name} is eligible for placement`);
            } else {
                console.log(`${this.name} is not eligible for placement`);
            }
        }
    }
}

const yash = new Student('yash', 23, 45)
const sonu = new Student('sonu', 22, 55)

yash.setPlacementAge(21)(30)
sonu.setPlacementAge(21)(30)

