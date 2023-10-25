// const obj1 = { 'key1': 1, "key2": 2, "key3": 1000 }
// const { key1, key3 } = { ...obj1 }
// console.log(key1, key3)



// const arr1 = ['value1', 'value2']
// const [ val1, val2 ] = arr1
// console.log(val1)
// console.log(val2)


// console.log(val1)

// console.log(val2)



const obj1 = {'key1': 1, "key2": 2, "key3": 1000}

let { key1, key3} = obj1

console.log(key1,key3);

key1 = 20;

key3 = 123

console.log(obj1.key1, obj1.key3)