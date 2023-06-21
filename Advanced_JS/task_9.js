// function x() {
//     let a = 10
//     function y() {
//         console.log(a);
//     }
//     return y;
// }

// let z = console.log(x())
// console.log(z);

// function z() {
//     let b = 20
//     function x() {
//         let a = 10
//         function y() {
//             console.log(a,b);
//         }
//         y();
//     }
//     x()
// }

function x() {

    let a = 10;

    function y() {

        console.log(a);

    }

    a = 500;

    return y;

}



const z = x()

console.log(z());

