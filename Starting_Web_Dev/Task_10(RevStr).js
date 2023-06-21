
// LOGIC - 1
function reverseString(str) {
    let revStr = ''
    for (let i = str.length - 1; i >= 0; i--) {
        revStr += str[i]
    }
    return revStr
}
console.log('Output By Logic - 1 :', reverseString('mango'));


// LOGIC - 2 ( By inbuilt function )
function reverseString2(str) {
    return str.split('').reverse().join('');
}

console.log('Output By Logic - 2 :', reverseString2('ram'));

