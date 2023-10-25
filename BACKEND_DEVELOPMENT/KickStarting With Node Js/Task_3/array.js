let array1 = ['apple', 'oranges', ' ', 'mango', ' ', 'lemon']

array1.map((ele, index) => {
    if (ele == ' ') {
        array1[index] = 'empty string'
    }
    // return array1
})

const obj1 = {'key1': 1 , 'key2' : 2}

const obj2 = { ...obj1, key1: 1000}

console.log(obj1);
console.log(obj2);