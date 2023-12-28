// // first logic of pagination
// const prev = document.querySelector('#prev');
// const curr = document.querySelector('#curr');
// const next = document.querySelector('#next');
// next.addEventListener('click', (e) => pagination(e, null, true));
// prev.addEventListener('click', (e) => pagination(e, true, null));


// async function pagination(e, pre, nex) {
//     e.preventDefault();
//     currPage = curr.innerHTML
//     console.log(' page before :', currPage);
//     let response = await axios.get(`http://localhost:8001/expense/limited-expense?page=${currPage}`, { headers: { 'Authorization': token } });
//     // showExpense(response.data)

//     // PREVIOUS page condition
//     if (response.data.expenses.hasPrevPage || response.data.expenses.nextPage == 2) {
//         prev.classList.remove('disabled');
//         if (pre) {
//             console.log('response in prev :', response.data.expenses);
//             curr.innerHTML = response.data.expenses.prevPage
//         }
//     }
//     if ((response.data.expenses.prevPage == 1 && response.data.expenses.currPage == 2) && pre) {
//         prev.classList.add('disabled');
//     }

//     // NEXT page condition
//     if (response.data.expenses.hasNextPage) {
//         next.classList.remove('disabled');
//         if (nex) {
//             console.log('response in next :', response.data.expenses);
//             curr.innerHTML = response.data.expenses.nextPage;
//         }
//     }
//     if ((response.data.expenses.nextPage == response.data.expenses.lastPage) && nex) {
//         next.classList.add('disabled');
//     } else {
//         next.classList.remove('disabled');
//     }
//     currPage = curr.innerHTML
//     console.log('page after :', currPage);
// }

// ========================================================================================================================================================================

// second logic of pagination
// window reload section starts here
window.addEventListener('load', async () => {
    const page = 1
    // let response = await axios.get('http://localhost:8001/expense/get-expenses', { headers: { 'Authorization': token } });
    let response = await axios.get(`http://localhost:8001/expense/limited-expense?page=${page}`, { headers: { 'Authorization': token } });
    try {
        showExpense(response.data.expenses.expense);
        updatePageNumber(response.data.expenses)
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
// window reload section ENDs here
// Pagination section starts here
const prev = document.querySelector('#prev');
const currBtn = document.querySelector('#curr');
const next = document.querySelector('#next');

async function updatePageNumber({ expense, hasPrevPage, hasNextPage, nextPage, prevPage, currPage }) {
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
        next.addEventListener('click', () => {
            currBtn.innerHTML = nextPage;
            getExpense(nextPage);
        })
    }
}

async function getExpense(page) {
    expenseBody.innerHTML = ''
    console.log(page);
    let response = await axios.get(`http://localhost:8001/expense/limited-expense?page=${page}`, { headers: { 'Authorization': token } });
    // console.log(expenseBody.innerHTML);
    console.log('expenses :', response.data.expenses);
    showExpense(response.data.expenses.expense);
    updatePageNumber(response.data.expenses)
}