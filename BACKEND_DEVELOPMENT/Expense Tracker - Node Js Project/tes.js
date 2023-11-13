// function isStringInvalid(string) {
//     return (string == undefined || string.length === 0 || string === '');
// }

function isStringInvalid(string) {
    return !!(string == undefined || string.length === 0);
}
console.log(isStringInvalid());