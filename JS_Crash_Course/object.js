// Object is key value pair DS
// It is used to store data in form key-value pair

let person = {
    firstName: 'John',
    lastName: 'Doe',
    age: 30,
    fruitsLove: ['apple', 'mango', 'orange', ''],
    addresses: {
        H_No: 220,
        street_no: 5
    }
}

// add key-value in object
person.addresses['city'] = 'San Francisco'
person.email = 'john@gmail.com'

console.log(person);
// console.log(person.addresses);

// Object destructuring - Destructuring makes multiple variable assignment into one
// Note = variables name from array or object and variable name in Destructuring should be same. Like firstName, lastName
let { firstName, lastName, age,addresses : {city} } = person;
console.log(city);

