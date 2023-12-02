// Global variables
const expForm = document.querySelector('#form')
const amount = document.querySelector('#amount')
const description = document.querySelector('#description')
const category = document.querySelector('#expense-category')
const errDiv = document.querySelector('#errMsg')
const expenseBody = document.querySelector('#expTabBody')
const expenseDate = document.querySelector('#expense-date')
const token = JSON.parse(localStorage.getItem('token'));
let totalExpenses = 0


// add event handlers to expense table
expenseBody.addEventListener('click', deleteData);
expenseBody.addEventListener('click', editData);

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
    let response = await axios.get('http://localhost:8001/expense/get-expenses', { headers: { 'Authorization': token } });
    try {
        showExpense(response.data);
        const decodedToken = parseJwt(token);
        // console.log(decodedToken.isPremiumUser);
        if (decodedToken.isPremiumUser) {
            document.getElementById('buy_premium').classList.add('d-none');
            document.getElementById('message').classList.remove('d-none')
            document.getElementById('leaderBoard').classList.remove('d-none');
            document.getElementById('generateReport').classList.remove('d-none');
            showLeaderBoard()
        }
    }
    catch (err) { console.log(err.message) }
})

// add expense to the backend
expForm.addEventListener('submit', async (e) => {
    // e.preventDefault();
    if (!expForm.checkValidity()) {
        console.log('Please fill all details.!!! 😒');
    }
    else {
        // create expense object to store in db
        let expense = {
            Amount: amount.value,
            Description: description.value,
            Category: category.value,
            date: expenseDate.value
        }
        try {
            let response = await axios.post('http://localhost:8001/expense/add-expense', expense, { headers: { 'Authorization': token } });
            console.log('response added :', response);
        }
        catch (err) {
            console.log('err while adding expense', err.message)
        }
    }
})

function showExpense(expenses) {
    if (expenses.success && expenses.data.length > 0) {
        const tr2 = document.createElement('tr')
        expenses.data.forEach((exp, index) => {
            const tr1 = document.createElement('tr');
            const html = `
            <th scope="row">${index + 1}</th>
            <td>${exp.description}</td>
            <td>${exp.category}</td>
            <td>${exp.date}</td>
            <td>${exp.amount}</td>
            <td>
            <button type="button" class="btn btn-outline-warning btn-sm edit text-dark" id="${exp.id}">Edit</button>
            <button type="button" onclick="${deleteData}" class="btn btn-outline-danger btn-sm ms-2 delete text-dark" id="${exp.id}">Delete</button>
            </td>`
            tr1.innerHTML = html;
            expenseBody.appendChild(tr1)
            totalExpenses += exp.amount
        })
        tr2.innerHTML = `<th scope="row" colspan="2" class="pe-0">Total Expenses (INR)&nbsp;:
        <td colspan="4" class="ps-0 text-danger h4">&#8377;${totalExpenses}</td>`
        expenseBody.appendChild(tr2)
    }
    // console.log('total exp :',total);
}

async function editData(e) {
    if (e.target.classList.contains('edit')) {
        if (e.target.innerHTML == 'Edit') {
            // focus on first input elements
            document.getElementById('amount').focus()

            // get expense data from DB and fill all input field with the expense
            let savedExp = await axios.get(`http://localhost:8001/expense/get-expense/${e.target.id}`, { headers: { 'Authorization': token } });
            try {
                if (savedExp.data.success) {
                    // fill the expense detail in input field with stored expense in db
                    amount.value = savedExp.data.expense[0].amount;
                    description.value = savedExp.data.expense[0].description;
                    category.value = savedExp.data.expense[0].category;
                    expenseDate.value = savedExp.data.expense[0].date;
                    // change edit button to save button after edit the expense
                    e.target.innerHTML = 'Save'
                }
            }
            catch (err) {
                console.log('error in edit expense :', err);
            }
        } else {
            saveData(e)
        }
    }
}

async function saveData(e) {
    // Update new expense in DB 
    try {
        let updatedExpense = {
            Expense_Amount: amount.value,
            Description: description.value,
            Category: category.value,
            date: expenseDate.value
        }
        await axios.put(`http://localhost:8001/expense/update-expense/${e.target.id}`, updatedExpense, { headers: { 'Authorization': token } });
        // change save button to edit button after update the expense and reload the page
        e.target.innerHTML = 'Edit'
        window.location.reload()
    }
    catch (err) {
        console.log('Error while updating expense :', err);
        showError(errDiv, 'Something went wrong. Please update or add the expense again. 😁')
    }
}

async function deleteData(e) {
    if (e.target.classList.contains('delete')) {
        // delete expense from db and reload the page
        try {
            axios.delete(`http://localhost:8001/expense/delete-expense/${e.target.id}`, { headers: { 'Authorization': token } })
        }
        catch (err) {
            console.log('Error while deleting expense :', err);
            showError(errDiv, 'Some Network Issue')
        }
        window.location.reload()
    }
}

function showError(element, errMsg) {
    element.innerHTML = errMsg;
    element.classList.replace('d-none', 'd-flex');
    setTimeout(() => {
        element.classList.replace('d-flex', 'd-none')
    }, 3000)
}


// premium user section
// global variables
const buyPremiumBtn = document.querySelector('#buy_premium');
const leaderBoardBtn = document.querySelector('#leaderBoard')
const leaderTableBody = document.querySelector('#leaderTabBody');
const generateReport = document.querySelector('#generateReport');

// add event handlers 
buyPremiumBtn.addEventListener('click', buyPremium);
leaderBoardBtn.addEventListener('click', showLeaderBoard);


async function showLeaderBoard() {
    let allUserTotalExpense = await axios.get('http://localhost:8001/premium/update-leaderBoard', { headers: { 'Authorization': token } });
    allUserTotalExpense.data.totalAmount.forEach((exp) => {
        const tr = document.createElement('tr');
        const html = `
        <td>1</td>
        <td>${exp.User.username}</td>
        <td>${exp.total_amount}</td>`
        tr.innerHTML = html;
        leaderTableBody.appendChild(tr)
    })
    // leaderBoardBtn.removeEventListener('click', showLeaderBoard);
}

async function buyPremium(e) {
    try {
        let response = await axios.get(`http://localhost:8001/purchase/purchase-premium-membership`, { headers: { 'Authorization': token } });
        if (response.status === 201) {
            let options = {
                'key': response.data.keyId,
                'order_id': response.data.order_detail.id,
                'handler': async (response) => {
                    let orderComp = await axios.post('http://localhost:8001/purchase/update-transaction-status', {
                        order_id: options.order_id,
                        payment_id: response.razorpay_payment_id,
                        success: true,
                        status: 200
                    }, { headers: { 'Authorization': token } });
                    console.log('payment success', orderComp.data.new_token);
                    localStorage.setItem('token', JSON.stringify(orderComp.data.new_token));
                    alert('You are premium user now.');
                    showLeaderBoard()
                    window.location.reload()
                }
            }
            const rzp1 = new Razorpay(options);
            rzp1.open();
            e.preventDefault();

            rzp1.on('payment.failed', async (response) => {
                let orderFailed = await axios.post('http://localhost:8001/purchase/update-transaction-status', {
                    order_id: response.error.metadata.order_id,
                    payment_id: response.error.metadata.payment_id,
                    success: false,
                    status: 102
                }, { headers: { 'Authorization': token } });
                console.log('payment failed', orderFailed);
                alert('Payment Failed')
            })
        }
    }
    catch (err) {
        console.log('premium feature error: ', err);
    }
}

// decode the token saved in local storage
function parseJwt(token) {
    if (!token) {
        return;
    }
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
}

generateReport.addEventListener('click', () => {
    console.log('clicked');
    axios.get('http://localhost:8001/report')
})