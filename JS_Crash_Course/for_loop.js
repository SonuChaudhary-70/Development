// Simple for loop
for (let i = 1; i < 11; i++) {
    console.log(i);
}

let numbers = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50]
// Using forEach
numbers.forEach((element, i) => {
    console.log(`Element :${element} at ${i} `);
})

// using for-of
for (let ele of numbers) {
    console.log(`\nElement : ${ele}`);
}