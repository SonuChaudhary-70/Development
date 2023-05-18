// Make the 2nd item have green background color
let secondItem = document.querySelector('.list-group-item:nth-child(2)')
secondItem.style.backgroundColor = 'green'


// Make the 3rd item invisible
let thirdItem = document.querySelector('.list-group-item:nth-child(3')
thirdItem.style.display = 'none'


// Using QuerySelectorALL change the font color to green for 2nd item in the item list
let listItems = document.querySelectorAll('.list-group-item')
listItems[1].style.color = 'white'


// Choose all the odd elements and make their background green using QuerySelectorALL
let oddItems = document.querySelectorAll('.list-group-item:nth-child(odd)')
for (let item of oddItems) {
    item.style.backgroundColor = 'green'
}

