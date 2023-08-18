// import local modules ( import all function of local module at once )
const operations = require('./sample.js')

let addResult = operations.add(5,7)
console.log(addResult);

let subtractResult = operations.subtract(5,7);
console.log(subtractResult);