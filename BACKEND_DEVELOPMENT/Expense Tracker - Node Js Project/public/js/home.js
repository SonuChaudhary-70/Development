// Global variables
const expForm = document.querySelector('#expense-form')
const addExpModalCont = document.querySelector('#add_expense_modal_content')
const expenseBody = document.querySelector('#exp_table_body')
const exp_price = document.querySelector('#exp_price')
const exp_description = document.querySelector('#exp_desc')
const exp_category = document.querySelector('#category')
const exp_date = document.querySelector('#exp_date_picker')
const token = JSON.parse(localStorage.getItem('token'));

// add event handlers for edit and delete expense data in expense table
expenseBody.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('editBtn')) editData(e)
    if (e.target && e.target.classList.contains('deleteBtn')) deleteData(e)
});

// window reload section starts here
window.addEventListener('load', async () => {
    const page = 1
    const limit = 5
    // let response = await axios.get('http://localhost:8001/expense/get-expenses', { headers: { 'Authorization': token } });
    let response = await axios.get(`http://localhost:8001/expense/limited-expense?page=${page}&limit=${limit}`, { headers: { 'Authorization': token } });
    try {
        showExpense(response.data.expenses);
        showBarChart(response.data.expenses);
        updatePageNumber(response.data.expenses)
        const decodedToken = parseJwt(token);
        // console.log(decodedToken.isPremiumUser);
        if (decodedToken.isPremiumUser) {
            document.getElementById('buy_premium').classList.add('disabled');
            document.getElementById('user_type').innerHTML = 'Premium user';
            document.getElementById('prem_user_ic').classList.remove('d-none')
            document.getElementById('leaderBoard').classList.remove('disabled');
            document.getElementById('generateReport').classList.remove('disabled');
        }
    }
    catch (err) { console.log(err) }
})
// window reload section ENDs here


// Expense Add section starts here 
// (add expense to the backend)
expForm.addEventListener('submit', async (e) => {
    // e.preventDefault();
    if (!expForm.checkValidity()) {
        console.log('Please fill all details.!!! 😒');
    }
    else {
        // create expense object to store in db
        let expense = {
            Amount: exp_price.value,
            Description: exp_description.value,
            Category: exp_category.value,
            date: exp_date.value
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
    // if (expenses.success && expenses.expense.length > 0) {
    if (expenses.expense.length > 0) {
        const tr2 = document.createElement('tr');
        expenses.expense.forEach((exp, index) => {
            const tr1 = document.createElement('tr');
            tr1.className = 'bg-gray-50  border-b hover:bg-blue-100'
            let html = `
            <td class="lg:px-6 sm:px-2 lg:py-3 sm:py-1 text-gray-900">${index + 1}
            </td>
            <th scope="row" class="lg:px-6 sm:px-2 lg:py-3 sm:py-1 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                ${exp.description}
            </th>
            <td class="lg:px-6 sm:px-2 lg:py-3 sm:py-1 text-gray-900">
                ${exp.category}
            </td>
            <td class="lg:px-6 sm:px-2 lg:py-3 sm:py-1 text-gray-900">
                ${exp.date}
            </td>
            <td class="lg:px-6 sm:px-2 lg:py-3 sm:py-1 text-gray-900">
                ${exp.amount}
            </td>
            <td class="lg:px-6 sm:px-2 lg:py-3 sm:py-1 lg: md:px-2">
            <button type="button" class="deleteBtn btn btn-outline-danger btn-sm xl:ms-2 sm:mt-1 md:mt-0.5 delete text-dark" id="${exp.id}">Delete</button>
            </td>`
            // to add edit functionality put below button under above table data tag with delete button
            // <button type="" data-modal-toggle="add_expense_modal" data-modal-target="#add_expense_modal" class="editBtn btn btn-outline-warning btn-sm edit text-dark" id="${exp.id}">Edit</button>
            tr1.innerHTML = html;
            expenseBody.appendChild(tr1)
        })
        tr2.innerHTML = `<th scope="row" colspan="4" class="h4 px-4 text-black py-2 bg-gray-300">Total Expenses (INR)&nbsp;:
        <td colspan="2" class="ps-2 border-s border-s-2 text-black h3 bg-gray-300">&#8377;${expenses.total}</td>`
        expenseBody.appendChild(tr2)
    }
}

// edit saved expense 
async function editData(event) {
    if (event.target.innerHTML == 'Edit') {
        let updateBtn = document.getElementById('update_btn');
        let addBtn = document.getElementById('addNewExpBtn');
        let closeBtn = document.getElementById('close_expense_modal')
        $("#add_expense_modal").show();
        // get expense data from DB and fill all input field with the expense
        let savedExp = await axios.get(`http://localhost:8001/expense/get-expense/${event.target.id}`, { headers: { 'Authorization': token } });
        try {
            if (savedExp.data.success) {
                // fill the expense detail in input field with stored expense in db
                exp_price.value = savedExp.data.expense[0].amount;
                exp_description.value = savedExp.data.expense[0].description;
                exp_category.value = savedExp.data.expense[0].category;
                exp_date.value = savedExp.data.expense[0].date;
                // change edit button to save button after edit the expense
                event.target.innerHTML = 'Save'
            }
            addBtn.classList.add('d-none');
            updateBtn.classList.remove('d-none');
            closeBtn.addEventListener('click', () => {
                updateBtn.classList.add('d-none');
                addBtn.classList.remove('d-none');
                $("#add_expense_modal").modal('hide');
                // window.location.reload()
            })
            updateBtn.addEventListener('click',(e) => {saveData(event,updateBtn)})
            // document.getElementById('add_expense_modal').addEventListener('click', ()=>{
            //     console.log('save button clicked');
            //     saveData(e)
            // })
            // console.log('expense modal:', addExpModalCont.children[0].children[1]);
        }
        catch (err) {
            console.log('error in edit expense :', err);
        }
    }
}

// saved newly updated expense in backend
async function saveData(e,btn) {
    console.log('enter in save',e.target);
    console.log('enter in save',btn);
    // e.preventDefault();
    // Update new expense in DB 
    try {
        let updatedExpense = {
            Expense_Amount: exp_price.value,
            Description: exp_description.value,
            Category: exp_category.value,
            date: exp_date.value
        }
        console.log('updated exp :', updatedExpense);
        // await axios.put(`http://localhost:8001/expense/update-expense/${e.target.id}`, updatedExpense, { headers: { 'Authorization': token } });
        // change save button to edit button after update the expense and reload the page
        $("#add_expense_modal").hide();
        e.target.innerHTML = 'Edit'
        // window.location.reload()
    }
    catch (err) {
        console.log('Error while updating expense :', err);
        // showError(errDiv, 'Something went wrong. Please update or add the expense again. 😁')
    }
}

// delete saved expense
async function deleteData(e) {
    e.preventDefault();
    if (e.target.classList.contains('delete')) {
        // delete expense from db and reload the page
        try {
            await axios.delete(`http://localhost:8001/expense/delete-expense/${e.target.id}`, { headers: { 'Authorization': token } })
        }
        catch (err) {
            console.log('Error while deleting expense :', err);
            // showError(errDiv, 'Some Network Issue')
        }
        window.location.reload()
    }
}
// Expense Add section ENDS here (add expense to the backend)

function showError(element, errMsg) {
    element.innerHTML = errMsg;
    element.classList.replace('d-none', 'd-flex');
    setTimeout(() => {
        element.classList.replace('d-flex', 'd-none')
    }, 3000)
}

// Premium user section start here
// global variables
const buyPremiumBtn = document.querySelector('#buy_premium');
const leaderBoardBtn = document.querySelector('#leaderBoard')
const leaderTableBody = document.querySelector('#leader_table');
const generateReport = document.querySelector('#generateReport');

// add event handlers 
buyPremiumBtn.addEventListener('click', buyPremium);
leaderBoardBtn.addEventListener('click', showLeaderBoard);


async function showLeaderBoard() {
    let allUserTotalExpense = await axios.get('http://localhost:8001/premium/update-leaderBoard', { headers: { 'Authorization': token } });
    allUserTotalExpense.data.totalAmount.forEach((exp, index) => {
        const tr = document.createElement('tr');
        tr.className = 'bg-gray-200 border-b hover:bg-blue-200'
        const html2 = `                                    
        <th scope="row" class="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">${index + 1}</th>
        <td class="px-6 py-3 text-gray-900">${exp.User.username}</td>
        <td class="px-6 py-3 text-gray-900">${exp.total_amount}</td>`
        tr.innerHTML = html2;
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

// generate and download the expense report
generateReport.addEventListener('click', async () => {
    try {
        let response = await axios.get('http://localhost:8001/premium/report/download', { headers: { 'Authorization': token } });
        // make anchor tag and assign its href to file url that we get from backend
        console.log(response);
        let a = document.createElement('a');
        a.href = response.data.fileUrl
        // this will click that anchor tag/link automatically
        a.click()
    }
    catch (error) {
        console.log('Error in generating report', error.response.data.err);
    }
})
// Premium user section ENDs here

// Pagination section starts here
const prev = document.querySelector('#prev');
const currBtn = document.querySelector('#curr');
const next = document.querySelector('#next');
const expandExpDropdown = document.querySelector('.dropdown-menu')
const dropDownBtn = document.querySelector('#limitExpDropdown')
expandExpDropdown.addEventListener('click', (e) => {
    let currentPage = currBtn.innerHTML;
    let maxExp = e.target.innerHTML
    dropDownBtn.innerHTML = e.target.innerHTML
    getExpense(currentPage, maxExp)
})

async function updatePageNumber({ expense, hasPrevPage, hasNextPage, nextPage, prevPage, currPage }) {
    // console.log(expandExpDropdown.innerHTML);
    // previous page condition
    if (hasPrevPage) {
        prev.classList.remove('disabled');
        prev.addEventListener('click', () => {
            console.log('prev page number :', prevPage);
            currBtn.innerHTML = prevPage;
            getExpense(prevPage)
        }
        )
    }
    // current page condition
    currBtn.innerHTML = currPage
    // showExpense(expense);
    // next page condition
    if (hasNextPage) {
        next.classList.remove('disabled');
        next.addEventListener('click', (e) => {
            e.preventDefault();
            currBtn.innerHTML = nextPage;
            getExpense(nextPage);
        })
    }
}

async function getExpense(page, limit) {
    limit = limit || 5
    expenseBody.innerHTML = ''
    let response = await axios.get(`http://localhost:8001/expense/limited-expense?page=${page}&limit=${limit}`, { headers: { 'Authorization': token } });
    showExpense(response.data.expenses);
    updatePageNumber(response.data.expenses)
}

// SIDE BAR FUNCTIONALITY
const dashboard = document.querySelector('#dashboard')
const dashboardTarget = document.querySelector('#dashboardDiv')
const analysis = document.querySelector('#analysis');
const analysisTarget = document.querySelector('#analysisDiv');
const addExpense = document.querySelector('#addExpense')

analysis.addEventListener('click', (e) => {
    analysisTarget.classList.replace('d-none', 'd-flex');
    dashboardTarget.classList.add('d-none');
})

addExpense.addEventListener('click', showData)
dashboard.addEventListener('click', showData)

function showData() {
    dashboardTarget.classList.remove('d-none');
    analysisTarget.classList.replace('d-flex', 'd-none');
}

function showBarChart(expenses) {
    document.getElementById('total_exp').innerHTML = "$" + expenses.total
    let amountArr = []
    let monthArr = []
    expenses.expense.forEach((exp) => {
        let date = new Date(exp.date)
        let shortMonth = date.toLocaleString('en-us', { month: 'short' }); /* Jun */
        amountArr.push(exp.amount);
        monthArr.push(shortMonth);
    })
    let options = {
        series: [
            {
                name: "Expense",
                // data: ["788", "810", "866", "788", "1100", "1200"],
                data: amountArr,
                color: "#F05252",
            }
        ],
        chart: {
            sparkline: {
                enabled: false,
            },
            type: "bar",
            width: "100%",
            height: 400,
            toolbar: {
                show: false,
            }
        },
        fill: {
            opacity: 1,
        },
        plotOptions: {
            bar: {
                horizontal: false,
                vertical: true,
                columnWidth: "30%",
                borderRadiusApplication: "end",
                borderRadius: 6,
                dataLabels: {
                    position: "top",
                },
            },
        },
        legend: {
            show: true,
            position: "bottom",
        },
        dataLabels: {
            enabled: false,
        },
        tooltip: {
            shared: true,
            intersect: false,
            formatter: function (value) {
                return "$" + value
            }
        },
        xaxis: {
            labels: {
                show: true,
                style: {
                    fontFamily: "Inter, sans-serif",
                    cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
                },
                formatter: function (value) {
                    return "$" + value
                }
            },
            // categories: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            categories: monthArr,
            axisTicks: {
                show: false,
            },
            axisBorder: {
                show: false,
            },
        },
        yaxis: {
            labels: {
                show: true,
                style: {
                    fontFamily: "Inter, sans-serif",
                    cssClass: 'text-xs font-normal fill-gray-500 dark:fill-gray-400'
                }
            }
        },
        grid: {
            show: true,
            strokeDashArray: 4,
            padding: {
                left: 2,
                right: 2,
                top: -20
            },
        },
        fill: {
            opacity: 1,
        }
    }

    if (document.getElementById("bar-chart") && typeof ApexCharts !== 'undefined') {
        const chart = new ApexCharts(document.getElementById("bar-chart"), options);
        chart.render();
    }
}
