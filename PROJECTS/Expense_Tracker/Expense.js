// console.log(axios);
// add event on add expense
let add_expense = document.querySelector('#add')
add_expense.addEventListener('click', add)

// get output tag to display on browser
let output = document.getElementById('output');

// get inputs
let amount = document.getElementById('amount')
let description = document.getElementById('description')
let category = document.getElementById('expense-category')

function add(event) {
    event.preventDefault()

    if (isDuplicateExpense()) {
        duplicateError()
        setTimeout(() => {
            const secondChild = document.querySelector('#form :nth-child(2)');
            secondChild.remove()
        }, 1000)
    } else if (amount.value == '' || description.value == '' || category.value == '') {
        errorMsg()
        setTimeout(() => {
            let err = document.getElementById('error')
            err.className = ''
            err.firstChild.remove()
        }, 1000)
    }
    else {
        // create expense object from expenses to store data in local storage
        let expense = {
            Expense_Amount: amount.value,
            Description: description.value,
            Category: category.value
        }

        // add element in local storage
        let stringify = JSON.stringify(expense)
        localStorage.setItem(expense['Category'], stringify)

        // Create div element
        let newDiv = document.createElement('div');

        // create unOrdered list of expenses
        let li = document.createElement('li');

        // create textNode for li content
        let text = document.createTextNode(`${amount.value} - ${description.value} - ${category.value}`);
        li.appendChild(text);

        // create delete button
        let deleteBtn = document.createElement('button');
        deleteBtn.className = 'btn btn-danger btn-sm ms-2 delete ';
        deleteBtn.innerHTML = 'Delete';
        deleteBtn.onclick = deleteData

        // create edit button 
        let edit = document.createElement('button')
        edit.className = 'btn btn-success btn-sm ms-4 edit ';
        edit.innerHTML = 'Edit';
        edit.onclick = editData

        // append list item , edit button and delete button
        newDiv.appendChild(li)
        newDiv.appendChild(edit);
        newDiv.appendChild(deleteBtn);
        newDiv.className = 'd-flex my-2 flex-sm-wrap border border-2 border-dark p-2 rounded'
        // newDiv.style.backgroundColor = 'rgb(183, 143, 255)'

        // add new div in output
        output.style.display = 'inline'
        output.appendChild(newDiv);
    }

}

function editData(e) {
    e.preventDefault()
    if (e.target.innerHTML == 'Edit') {
        // focus on first input elements
        document.getElementById('amount').focus()

        // get all input tags and clear them
        let inputData = document.getElementsByClassName('inp')
        inputData['amount'].value = ''
        inputData['description'].value = ''
        inputData['expense-category'].value = ''

        // delete old data from local storage - so get key to delete from local storage
        let text = e.target.parentElement.firstChild.textContent.split('-')
        let key = text[2].trim()
        localStorage.removeItem(key)
        e.target.innerHTML = 'Save'
    } else {
        saveData(e)
    }
}

function saveData(e) {
    let oldText = e.target.parentElement.firstChild
    e.target.innerHTML = 'Edit'

    if (amount.value == '' || description.value == '' || category.value == '') {
        errorMsg()
        setTimeout(() => {
            let err = document.getElementById('error')
            err.className = ''
            err.firstChild.remove()
        }, 1000)
    } else {
        // update new data in output
        let newText = `${amount.value} - ${description.value} - ${category.value}`;
        oldText.textContent = newText

        // Update new data in local storage
        let expense = {
            Expense_Amount: amount.value,
            Description: description.value,
            Category: category.value
        }

        let stringify = JSON.stringify(expense)
        localStorage.setItem(expense['Category'], stringify)
    }
}

function deleteData(e) {

    // delete div Element of output window which contains li element and delete button
    e.target.parentNode.remove()

    // get all input tags and clear them
    let inputData = document.getElementsByClassName('inp')
    inputData['amount'].value = ''
    inputData['description'].value = ''
    inputData['expense-category'].value = ''

    // delete data from local storage - so get the key to delete from content of list
    let text = e.target.parentElement.firstChild.textContent.split('-')
    let key = text[2].trim()
    localStorage.removeItem(key)

    if (output.children.length <= 0) {
        output.style.display = 'none'
    }
}

function errorMsg() {
    let div = document.getElementById('error')
    div.className = 'd-flex text-light border border-2 mt-1 rounded bg-danger'

    let p = document.createElement('p')
    p.className = 'd-flex pt-2 ps-2 h5'
    p.textContent = 'Please fill all details'
    p.style.fontFamily = 'Trebuchet MS'
    div.appendChild(p)
}

function isDuplicateExpense() {
    let localStorageData = localStorage.getItem(`${category.value}`)
    let parsedData = JSON.parse(localStorageData)
    return (parsedData != null && (amount.value == parsedData['Expense_Amount'] && description.value == parsedData['Description'] && category.value == parsedData['Category']))
}

function duplicateError() {
    let form = document.getElementById('error')
    let newSpan = document.createElement('span')
    newSpan.className = 'd-flex text-light border mt-1 rounded border-2 bg-warning'
    let p = document.createElement('p')
    p.className = 'd-flex pt-2 ps-2 h5'
    p.textContent = 'This Expense Already Exist !!!'
    p.style.fontFamily = 'Trebuchet MS'
    newSpan.appendChild(p)
    form.after(newSpan)
}
// localStorage.clear()