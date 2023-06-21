// Higher Order Function
// Both array.forEach and array.map have 3 arguments current element, index and array

// Array for each method return undefined at the end of the result
let emp = []
let arr = [1, 2, 3, 4, 5, 6]
let result = arr.forEach((element,index,array) => {
    console.log(`Element : ${element}, Index : ${index}, Array : ${array}`);
    emp.push(element+index)
    return emp
})

console.log(result);

// array.map return the updated array at the end of the result
let result_2 = arr.map((element,index,array) => {
    console.log(`Element : ${element}, Index : ${index}, Array : ${array}`);
    return element+index;
})

console.log(result_2);