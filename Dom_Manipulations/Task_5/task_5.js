// Add a new li element WITHOUT the same class Name
let li = document.createElement('li');
li.innerHTML = 'Item 5';
let ul = document.querySelector('#items')
ul.appendChild(li);

li.className = 'list-group-item'

// Get element by className
let listItems = document.getElementsByClassName('list-group-item')
listItems[listItems.length - 1].innerHTML = 'hello'
listItems[listItems.length - 1].style.color = 'green'
listItems[listItems.length - 1].style.border = '2px solid black'
listItems[listItems.length - 1].style.backgroundColor = 'orange'


// Get element by tag name
let tagListItems = document.getElementsByTagName('li')
tagListItems[tagListItems.length - 1].style.fontWeight = 'bold'