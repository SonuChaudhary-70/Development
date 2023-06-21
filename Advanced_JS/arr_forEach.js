const staffsDetails = [
    { name: "Jam Josh", age: 44, salary: 4000, currency: "USD" },
    { name: "Justina Kap", age: 34, salary: 3000, currency: "USD" },
    { name: "Chris Colt", age: 37, salary: 3700, currency: "USD" },
    { name: "Jane Doe", age: 24, salary: 4200, currency: "USD" }
];


// staffsDetails.forEach((currElement, index) => {
//     if (currElement.age > 30) console.log(currElement.name);
// })

// array destructuring

// staffsDetails.forEach(({ name, salary }, index) => {
//     if (salary > 3000) console.log(name);
// })

let salarySum = 0
let result = staffsDetails.forEach(({ salary }) => {
    salarySum += salary
})
console.log(salarySum);