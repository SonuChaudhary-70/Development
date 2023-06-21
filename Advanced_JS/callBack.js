// setTimeout(() => {
//     console.log("Chauhdary");
// }, 2000)

// function greet() {
//     console.log('Hello');
// }
// greet()

// function name() {
//     console.log('Sonu');
// }

// name()

// let click = document.getElementById('clickMe');
// click.addEventListener('click', add)

// function add() {
//     let output = document.getElementById('output')
//     output.innerHTML = 'Button clicked';
// }


// let click = document.getElementById('clickMe');
// click.addEventListener('click', add)


// closure demo with event listener
// function add() {
//     let counter = 0;
//     function xyz() {
//         console.log('Button Clicked', ++counter);
//         let output = document.getElementById('output')
//         output.innerHTML = 'Button clicked';
//     }
//     return xyz()
// }


function add(){
    let count = 0;
    document.getElementById('clickMe').addEventListener('click',()=>{
        console.log('Button Clicked', ++count);
    });
}

add()

// garbage collection and remove eventListeners