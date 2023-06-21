// // LOGIC - 1
// // let count = 0
// // const name = (arr) => {
// //     return (() => {
// //         console.log(`Hello ${arr[count]}`);
// //         count++
// //     })
// // }

// // let fun = name(["Ram", "Shyam"]);

// // fun()// Print Hello Ram

// // fun()//print Hello Shyam




// // LOGIC - 2
// // const name = (arr) => {
// //     let count = 0
// //     return (() => {
// //         console.log(`Hello ${arr[count]}`);
// //         count++
// //     })
// // }

// // let fun = name(["Ram", "Shyam"]);

// // fun()// Print Hello Ram

// // fun()//print Hello Shyam

// setTimeout(() => console.log('timer1 expired'), 1000)



// setTimeout(() => console.log('timer2 expired'), 0)



// function x(y) {

// console.log('inside x');

// y();

// }



// x(function y(){

// setTimeout(() => console.log('inside y'), 0)

// })
let num = 150
function sum(a, b) {
    console.log(a + b);
    function sub(c, d) {
        console.log(d - c);
    }
    sub(10,5)

}
// sum(8,5)
// sub(10,5)
// console.log();
// console.log(window.d);


