
// get output tag to display on browser
let output = document.getElementById('output');

window.addEventListener('load', function () {
    let storedItems = Object.keys(localStorage)
    for( let item of storedItems ) {
        let parsedData = JSON.parse(localStorage[item])
        showResult(parsedData.Category,parsedData.Expense_Amount, parsedData.Description, parsedData.Category)
    }
})

// add event on add expense
let add_expense = document.querySelector('#add')
add_expense.addEventListener('click', addExpense)



function getInputs() {
    // get inputs
    let amount = document.getElementById('amount')
    let description = document.getElementById('description')
    let category = document.getElementById('expense-category')

    // Expense Object
    return {
        Expense_Amount: amount.value,
        Description: description.value,
        Category: category.value
    }
}


function addExpense(event) {
    event.preventDefault()
    let currentExpense = getInputs()

    if (isDuplicateExpense()) {
        duplicateErrorMsg()
        setTimeout(() => {
            const secondChild = document.querySelector('#form :nth-child(2)');
            secondChild.remove()
        }, 3000)
    } else if (currentExpense.Expense_Amount == '' || currentExpense.Description == '' || currentExpense.Category == '') {
        errorMsg('Please fill all details.!!! 😒😒😒😒')
        setTimeout(() => {
            let err = document.getElementById('error')
            err.className = ''
            err.firstChild.remove()
        }, 3000)
    }
    else {
        localStorage.setItem(currentExpense.Category, JSON.stringify(currentExpense))
        showResult(currentExpense.Category,currentExpense.Expense_Amount,currentExpense.Description,currentExpense.Category)
    }

}

function showResult(Id,amount, description, category) {
    // Create div element
    let newDiv = document.createElement('div');

    // create unOrdered list of expenses
    let li = document.createElement('li');

    // create textNode for li content
    let text = document.createTextNode(`${amount} - ${description} - ${category}`);
    li.appendChild(text);

    // create delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm ms-2 delete ';
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.id = Id
    deleteBtn.onclick = deleteData

    // create edit button 
    let editBtn = document.createElement('button')
    editBtn.className = 'btn btn-success btn-sm ms-4 edit ';
    editBtn.innerHTML = 'Edit';
    editBtn.id = Id;
    editBtn.onclick = editData

    // append list item , edit button and delete button
    newDiv.appendChild(li)
    newDiv.appendChild(editBtn);
    newDiv.appendChild(deleteBtn);
    newDiv.className = 'd-flex my-2 flex-sm-wrap border border-2 border-dark p-2 rounded'
    // newDiv.style.backgroundColor = 'rgb(183, 143, 255)'

    // add new div in output
    output.style.display = 'inline'
    output.appendChild(newDiv);
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

        // delete old data from local storage
        localStorage.removeItem(e.target.id)
        e.target.innerHTML = 'Save'
        add_expense.disabled = true
    } else {
        saveData(e)
    }
}

function saveData(e) {
    let oldText = e.target.parentElement.firstChild
    let newExpense = getInputs()

    if (newExpense.Expense_Amount == '' || newExpense.Description == '' || newExpense.Category == '') {
        errorMsg('Please fill all details.!!! 😒')
        setTimeout(() => {
            let err = document.getElementById('error')
            err.className = ''
            err.firstChild.remove()
        }, 3000)
    } else {
        // update new data in output
        e.target.innerHTML = 'Edit'
        add_expense.disabled = false
        let newText = `${newExpense.Expense_Amount} - ${newExpense.Description} - ${newExpense.Category}`;
        oldText.textContent = newText

        // Update new data in local storage
        localStorage.setItem(newExpense.Category,JSON.stringify(newExpense))
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

    // delete data from local storage
    localStorage.removeItem(e.target.id)

    // disable output container
    if (output.children.length <= 0) {
        output.style.display = 'none'
    }
}

function errorMsg(text) {
    let div = document.getElementById('error')
    div.className = 'd-flex text-light border border-2 mt-1 rounded bg-danger'

    let p = document.createElement('p')
    p.className = 'd-flex pt-2 ps-2 h5'
    p.textContent = text
    p.style.fontFamily = 'Trebuchet MS'
    div.appendChild(p)
}

function isDuplicateExpense() {
    let flag = false
    let currentItem = getInputs()
    let storedItems = Object.keys(localStorage)
    for (let item of storedItems) {
        let parsedData = JSON.parse(localStorage[item])
        if(currentItem.Expense_Amount == parsedData.Expense_Amount && currentItem.Description == parsedData.Description && currentItem.Category == parsedData.Category ){
            flag = true
        }
    }
    return flag
}


function duplicateErrorMsg() {
    let form = document.getElementById('error')
    let newSpan = document.createElement('span')
    newSpan.className = 'd-flex text-light border mt-1 rounded border-2 bg-warning'
    let p = document.createElement('p')
    p.className = 'd-flex pt-2 ps-2 h5'
    p.textContent = 'This Expense Already Exist. 🤦‍♂️🤦‍♂️🤦‍♂️'
    p.style.fontFamily = 'Trebuchet MS'
    newSpan.appendChild(p)
    form.after(newSpan)
}
