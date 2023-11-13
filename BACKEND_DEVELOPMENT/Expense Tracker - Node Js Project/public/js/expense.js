// Global variables
let expForm = document.querySelector('#form')
let amount = document.querySelector('#amount')
let description = document.querySelector('#description')
let category = document.querySelector('#expense-category')
let errDiv = document.querySelector('#errMsg')
let output = document.querySelector('#output');

// Example starter JavaScript for disabling form submissions if there are invalid fields
// this is Immediately Invoked Function Expression (IIFE) 
(function () {
    'use strict'

    // Fetch all the forms we want to apply validation styles to
    let forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    // Array.prototype.slice.call(forms)
    forms.forEach(function (form) {
        form.addEventListener('submit', function (event) {
            // checkValidity method Returns true if an input element contains valid data.
            if (!form.checkValidity()) {
                event.preventDefault()
                // stopPropagation() method prevents propagation of the same event from being called.
                // matlab stop propagation method event to propagate or we can say execute karne se rok deta hai
                event.stopPropagation()
            }
            form.classList.add('was-validated');
            // false as an argument is liye pass kiye jisse capturing disable ho jaye
            // capturing means event propagation from parent to child
        }, false)
    })
})()

window.addEventListener('load', async () => {
    let expenses = await axios.get('http://localhost:8001/expense/get-expenses')
    try {
        for (let expense of expenses.data) {
            showResult(expense.id, expense.amount, expense.description, expense.category)
        }
    }
    catch (err) { console.log(err.message) }

})

// add event on add expense
expForm.addEventListener('submit', async (e) => {
    e.preventDefault()
    if (!expForm.checkValidity()) {
        console.log('Please fill all details.!!! 😒');
    }
    else {
        // create expense object to store in db
        let expense = {
            Amount: amount.value,
            Description: description.value,
            Category: category.value
        }
        try {
            let result = await axios.post('http://localhost:8001/expense/add-expense', expense);
            showResult(result.data.expense.id, result.data.expense.amount, result.data.expense.description, result.data.expense.category);
        }
        catch (err) {
            console.log('err while adding expense', err.message)
        }
    }
})


function showResult(Id, amount, description, category) {
    // Create div element
    let newDiv = document.createElement('div');

    // create unOrdered list of expenses
    let li = document.createElement('li');

    // create textNode for li content
    let text = document.createTextNode(`${amount} - ${description} - ${category}`);
    li.appendChild(text);
    li.className = 'h6'

    // create delete button
    let deleteBtn = document.createElement('button');
    deleteBtn.className = 'btn btn-danger btn-sm ms-2 delete ';
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.id = Id
    deleteBtn.onclick = deleteData

    // create edit button 
    let editBtn = document.createElement('button')
    editBtn.className = 'btn btn-warning btn-sm ms-4 edit ';
    editBtn.innerHTML = 'Edit';
    editBtn.id = Id;
    editBtn.onclick = editData

    // append list item , edit button and delete button
    newDiv.appendChild(li)
    newDiv.appendChild(editBtn);
    newDiv.appendChild(deleteBtn);
    newDiv.className = 'd-flex my-2 flex-sm-wrap border border-2 border-dark align-items-center py-2 px-1 rounded'
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
        let savedExp = await axios.get(`http://localhost:8001/expense/get-expense/${e.target.id}`);
        try {
            // fill the expense detail in input field with stored expense in db
            amount.value = savedExp.data.amount;
            description.value = savedExp.data.description;
            console.log('cat :', savedExp.data.category);
            category.value = savedExp.data.category;

            // change edit button to save button
            e.target.innerHTML = 'Save'
        }
        catch (err) {
            console.log('error in edit expense :', err);
        }
    } else {
        saveData(e)
    }
}

async function saveData(e) {
    let oldText = e.target.parentElement.firstChild;
    if (amount.value == '' || description.value == '' || category.value == '') {
        showError(errDiv, 'Please fill all details.!!! 😒')
    } else {
        // update new data in output window
        let newText = `${amount.value} - ${description.value} - ${category.value}`;
        oldText.textContent = newText

        // Update new data in DB
        let updatedExpense = {
            Expense_Amount: amount.value,
            Description: description.value,
            Category: category.value
        }
        let response = await axios.put(`http://localhost:8001/expense/update-expense/${e.target.id}`, updatedExpense)
        try {
            // change save button to edit button
            e.target.innerHTML = 'Edit'
            console.log('saved changed :', e.target.innerHTML);
            console.log("Data updated :", response)
        }
        catch (err) {
            console.log('hello');
            console.log('Error while updating expense :', err);
            showError(errDiv, 'Something went wrong. Please update or add the expense again. 😁')
        }
    }
}

async function deleteData(e) {
    e.preventDefault()

    // delete div Element of output window which contains li element and delete button
    e.target.parentNode.remove()
    try {
        axios.delete(`http://localhost:8001/expense/delete-expense/${e.target.id}`)
    }
    catch (err) {
        console.log('Error while deleting expense :', err);
        showError(errDiv, 'Some Network Issue')
    }
    if (output.children.length <= 0) {
        output.style.display = 'none'
    }
}

function showError(element, errMsg) {
    element.innerHTML = errMsg;
    element.classList.replace('d-none', 'd-flex');
    setTimeout(() => {
        element.classList.replace('d-flex', 'd-none')
    }, 3000)
}