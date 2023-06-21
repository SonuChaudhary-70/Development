function findStudent(obj, age) {
    //Complete this function by yourself
    //it takes in student Object and age of student which is to be found
    //should return name of student whose age matches
    //If nothing matches return -1

    // LOGIC - 1
    let entries = Object.entries(obj)
    for (const element of entries) {
        if (element[1] == age) {
            return element[0]
        } 
    }

    // LOGIC - 2
    // for (let key in obj) {
    //     if (obj[key] == age) {
    //         return key
    //     } 
    // }
    return -1
}

studentObj = {
    'yash': 26,
    'vaibhav': 24,
    'rajesh': 25,
}
console.log(Object.values(studentObj));
console.log(findStudent(studentObj, 25));

let len = Object.keys(studentObj).length
