// console.dir(document.URL)
// console.log(document.domain);
// console.log(document.title);
// // document.title = 542
// console.log(document.head);
// console.log(document.body);
// console.log(document.all);
// console.log(document.all[9]);
// console.log(document.forms);

// Three methods to change text of a ELEMENT
// 1. Text content
// let title = document.getElementById('header-title')
// title.textContent = 'Hello'

// 2. Inner Html
// title.innerHTML = 'Hello World'

// 3. Inner Text
// title.innerText = 'Namaste'
// console.log(title.textContent);



let items = document.getElementsByClassName('list-group-item')
let start = 1
// items[2].style.backgroundColor = 'red'
for (let ele of items) {
    ele.innerHTML = `Hello ${start}`
    ele.style.margin = '5px'
    ele.style.border = '2px solid black'
    start++
}

// Query Selector
let header = document.querySelector('#main-header')
header.style.border = '5px solid black'

// query selector : pseudo selector
let even = document.querySelector('.list-group-item:nth-child(even)')
console.log(even.value);

let add = document.querySelector('.title')
add.style.fontWeight = 'bold'
add.style.color = 'green'