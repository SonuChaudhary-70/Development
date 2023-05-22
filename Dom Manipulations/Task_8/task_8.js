let form = document.querySelector('#addForm')
let itemList = document.querySelector('#items')
let filter = document.querySelector('#filter')

form.addEventListener('submit', addItem)
itemList.addEventListener('click', removeItem)

// Add Items function
function addItem(event) {
    event.preventDefault()

    // Get new item from input
    let newItem = document.querySelector('#newItem').value

    // check if task is already present in list or not
    let taskPresent = false
    for (let item of itemList.children) {
        if (newItem == item.firstChild.textContent) {
            taskPresent = true
            break;
        }
    }

    // Check if new item is empty or not
    if (newItem == '') {
        alert('Please Add Some Item')
    } else if (taskPresent) {
        alert('Task already added ')
    } else {
        // create new li element
        let li = document.createElement('li')
        li.className = 'list-group-item d-flex justify-content-between'
        li.style.fontWeight = 'bold'
        li.style.fontSize = '1.2rem'
        li.style.fontFamily = 'Geneva'
        li.style.border = '1px solid black'
        li.style.marginBottom = '0.5rem';
        li.style.borderRadius = '5px';

        // append value of newItem to li element
        li.innerHTML = newItem

        // append li to item list
        itemList.appendChild(li)

        // create Edit button
        let editBtn = document.createElement('button')
        editBtn.className = 'btn btn-success btn-sm float-right edit'
        editBtn.innerHTML = 'Edit'

        // create delete button
        let deleteBtn = document.createElement('button')
        deleteBtn.className = 'ms-2 btn btn-danger btn-sm float-right delete'
        deleteBtn.innerHTML = 'Delete'

        // put Edit button and Delete button in one box/div
        let newDiv = document.createElement('div')
        newDiv.className = 'd-flex justify-content-end'
        newDiv.id = 'one'

        // append Edit and Delete button with newly created item in one Section/Container/Div
        li.appendChild(newDiv)
        newDiv.appendChild(editBtn)
        newDiv.appendChild(deleteBtn)
    }
}

// remove items function
function removeItem(e) {
    if (e.target.classList.contains('delete')) {
        let li = e.target.parentElement.parentElement
        itemList.removeChild(li)
    }
}
