// DOM Traversing

// get parent node
let itemList = document.querySelector('#items')

let parentNode = itemList.parentNode
console.log(parentNode);

// Get count of children of parent node
console.log(parentNode.childElementCount);

// change background color of parent node
parentNode.style.backgroundColor = 'rgb(210, 214, 211)'

// Get parent of parent 
console.log(itemList.parentNode.parentNode.parentNode);

console.log('parent element :',itemList.parentElement);
console.log('parent Node :',itemList.parentNode);

console.log(itemList.parentElement.parentElement.parentElement);


// Child Nodes
console.log('Child node of items list :',itemList.childNodes[0]);

// Children
console.log('Child node of items list :',itemList.children[0].innerHTML);

// Change backgroundColor of 2nd list
itemList.children[1].style.backgroundColor = 'yellow'

// get first Child
console.log('First child :',itemList.firstChild);

console.log('First Element child :',itemList.firstElementChild);


console.log('Last Element child :',itemList.lastElementChild);

// Siblings of element
console.log('Next siblings of ul',itemList.nextSibling);
console.log('Next siblings element of ul',itemList.nextElementSibling);

// Previous siblings
console.log('Previous siblings of ul',itemList.previousSibling);
console.log('Previous Element siblings of ul',itemList.previousElementSibling);


// Creating elements or tags in DOM by using js
// Create Element
let newDiv = document.createElement('div');

// Add Class and id to div
newDiv.className = 'list-group-item';
newDiv.id = 'newDivId';


// Add attribute to div
newDiv.setAttribute('title', 'Hello World');

// Make content of div
let content = document.createTextNode('Hello World')

// Add content in div
newDiv.appendChild(content);

// Now new div is ready add it to the DOM
// now select where we want to add it
let container = document.querySelector('.container')
let h1 = document.querySelector('h1')

// now append newDiv before h1 of container class
container.insertBefore(newDiv, h1)
newDiv.style.fontSize = '20px'


// now append newDiv before Item 1 of ul items 
itemList.insertBefore(newDiv,itemList.firstChild)
