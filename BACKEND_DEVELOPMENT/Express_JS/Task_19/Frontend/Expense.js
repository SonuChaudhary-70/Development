let baseUrl = 'https://crudcrud.com/api/fdd17f437ea0479693893ac721ddb53c/Expense_Record'

// get output tag to display on browser
let output = document.getElementById('output');

window.addEventListener('load', function () {
    axios.get('http://localhost:7048/expense')
        .then((response) => {
            for (let expense of response.data) {
                showResult(expense.id, expense.amount, expense.description, expense.category)
            }
        })
        .catch((err) => console.log(err.message));
})

// add event on add expense
let add_expense = document.querySelector('#add')
add_expense.addEventListener('click', addExpense)

// get inputs
let amount = document.getElementById('amount')
let description = document.getElementById('description')
let category = document.getElementById('expense-category')

async function addExpense(event) {
    event.preventDefault()

    if (await isDuplicateExpense()) {
        duplicateError()
        setTimeout(() => {
            const secondChild = document.querySelector('#form :nth-child(2)');
            secondChild.remove()
        }, 3000)
    } else if (amount.value == '' || description.value == '' || category.value == '') {
        errorMsg('Please fill all details.!!! 😒', 'Empty field')
        setTimeout(() => {
            let err = document.getElementById('error')
            err.className = ''
            err.firstChild.remove()
        }, 3000)
    }
    else {
        // create expense object from expenses to store data in local storage
        let expense = {
            Expense_Amount: amount.value,
            Description: description.value,
            Category: category.value
        }

        // add element in local storage
        await axios.post('http://localhost:7048/expense/add-expense', expense)
            .then((expense) => {
                showResult(expense.data.id, expense.data.amount, expense.data.description, expense.data.category)
            }).catch(err => console.log(err.message))
    }

}

function showResult(Id, amount, description, category) {
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

async function editData(e) {
    e.preventDefault()
    if (e.target.innerHTML == 'Edit') {
        // focus on first input elements
        document.getElementById('amount').focus()

        // get expense data from DB and fill all input field with the expense
        let expenseData = await axios.get(`http://localhost:7048/expense/${e.target.id}`);

        let inputData = document.getElementsByClassName('inp')
        inputData['amount'].value = expenseData.data.amount
        inputData['description'].value = expenseData.data.description
        inputData['expense-category'].value = expenseData.data.category

        // change edit button to save button
        e.target.innerHTML = 'Save'
    } else {
        saveData(e)
    }
}

async function saveData(e) {
    let oldText = e.target.parentElement.firstChild;
    // change save button to edit button
    e.target.innerHTML = 'Edit'

    if (amount.value == '' || description.value == '' || category.value == '') {
        errorMsg('Please fill all details.!!! 😒', 'Empty Field')
        setTimeout(() => {
            let err = document.getElementById('error')
            err.className = ''
            err.firstChild.remove()
        }, 3000)
    } else {
        // update new data in output
        let newText = `${amount.value} - ${description.value} - ${category.value}`;
        oldText.textContent = newText

        // Update new data in DB
        let expense = {
            Expense_Amount: amount.value,
            Description: description.value,
            Category: category.value
        }
        await axios.put(`http://localhost:7048/expense/update-expense/${e.target.id}`, expense)
            .then((response) => console.log("Data updated :", response))
            .catch((err) => {
                errorMsg('Something went wrong. Please update or add the expense again. 😁', err)
                setTimeout(() => {
                    let err = document.getElementById('error')
                    err.className = ''
                    err.firstChild.remove()
                }, 3000)
            })
    }
}

async function deleteData(e) {

    // delete div Element of output window which contains li element and delete button
    e.target.parentNode.remove()

    // get all input tags and clear them
    // let inputData = document.getElementsByClassName('inp')
    // inputData['amount'].value = ''
    // inputData['description'].value = ''
    // inputData['expense-category'].value = ''

    // delete data from dataBase by id of target button
    try {
        axios.delete(`http://localhost:7048/expense/delete-expense/${e.target.id}`)
    }
    catch (err) {
        errorMsg("Some Network Issue. If the Expense doesn't delete Please refresh the page 😃", err)
        setTimeout(() => {
            let err = document.getElementById('error')
            err.className = ''
            err.firstChild.remove()
        }, 3000)
    }
    if (output.children.length <= 0) {
        output.style.display = 'none'
    }
}

function errorMsg(text, err) {
    console.log('Error :', err);
    let div = document.getElementById('error')
    div.className = 'd-flex text-light border border-2 mt-1 rounded bg-danger'

    let p = document.createElement('p')
    p.className = 'd-flex pt-2 ps-2 h5'
    p.textContent = text
    p.style.fontFamily = 'Trebuchet MS'
    div.appendChild(p)
}

async function isDuplicateExpense() {
    let flag = false
    await axios.get('http://localhost:7048/expense')
        .then((response) => {
            for (let item of response.data) {
                if ((item.description == description.value && item.category == category.value)) {
                    flag = true;
                    break;
                }
            }
            return flag
        })
        .catch((error) => { console.log(error.message); })
}

let result = isDuplicateExpense()

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