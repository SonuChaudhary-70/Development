// make border around the title
let titleContainer = document.querySelector('#main-header');
titleContainer.style.border = '4px solid black'

let title = document.querySelector('#header-title');
title.style.border = '2px solid white'
title.style.display = 'inline'
title.style.padding = '5px 25px'
title.style.borderRadius = '35px'

// get list items adn modified them
let items = document.querySelectorAll('.list-group-item')
items[2].style.backgroundColor = 'green'

for (let ele of items) {
    ele.style.fontWeight = 'bold'
    ele.style.border = '2px solid black'
}

let itemsContainer = document.querySelector('#main')
itemsContainer.style.border = '2px solid gray'
itemsContainer.style.backgroundColor = 'gray'