let product = (n1, n2) => { return n1 * n2 }
console.log('Product of 5 and 4 :',product(5, 4));

let student = {
    name:'Sonu Chaudhary',
    age:23,
    greet(){
        console.log(`Hello myself ${this.name}`);
    }
}

student.greet()