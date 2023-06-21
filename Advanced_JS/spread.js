// Use of Spread Operator

// Copying an array
let old = [2, 4, 3, 5, 6, 8]
let curr = [...old, 9, 10, 11, 12]
console.log(curr)

// Concatenating or combining arrays
let odd = [1, 3, 5, 7]
let even = [2, 4, 6, 8]
let combined = [...odd, ...even]
console.log(combined);

// Using Math functions
const numbers = [37, -17, 7, 0]
console.log(Math.min(numbers)) // NaN
console.log(Math.min(...numbers)) // -17
console.log(Math.max(...numbers)) // 37

// Using an array as arguments
// Adding an item to a list
let fruits = ['apple', 'mango']
let moreFruits = ['guava', 'orange', 'banana', ...fruits]
console.log(moreFruits);

// Adding to state in React
// Combining objects
const objectOne = { hello: "🤪" }
const objectTwo = { world: "🐻" }
const objectThree = { ...objectOne, ...objectTwo, laugh: "😂" }
// let btn = document.getElementById('btn').addEventListener('click', () => { alert(objectThree) })
console.log(objectThree);
// Converting NodeList to an array
