function add(n1, n2) {
    return n1 + n2;
}

function subtract(n1, n2) {
    if(n1 > n2) return n1 - n2;
    else return n2 - n1;
}

function multiply(n1, n2){
    return n1 * n2
}

function divide(n1, n2){
    return n1 / n2;
}

// first way to export a local module by exporting all function at once
module.exports = {add, subtract, multiply, divide}