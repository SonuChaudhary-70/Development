// Currying - It is a technique in functional programming, that transforms the function of multiple arguments into several functions of a single argument in sequence. 

function sum(a, b) {
    return a + b;
}

// by currying
function curried(a) {
    return function anotherFunction(b) {
        return a + b
    }
}

// let result = curried(5)(9)
// console.log(result);

function sum5(a) {
    console.log('a :', a);
    return function b(b) {
        console.log('b :', b);
        return function c(c) {
            console.log('c :', c);
            return function d(d) {
                console.log('d :', d);
                return function e(e) {
                    console.log('e :', e);
                    return a + b + c + d + e
                }
            }
        }
    }
}

let result1 = sum5(5)(6)(7)(8)(9)
console.log(result1);