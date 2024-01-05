const Expense = require('../model/expense');

// pagination function middleware
exports.pagination = async (req, res, next) => {

    // let page = +req.query.page || 1;
    let page = Number(+req.query.page || 1)
    console.log('page number :', page);
    let expense_per_page = 5
    try {
        let totalExpense = await Expense.count();
        const limitedExp = await Expense.findAll({
            offset: (page - 1) * expense_per_page,//2*5
            limit: expense_per_page
        })
        // console.log('limited Expenses :', limitedExp)
        req.paginate = {
            success: true,
            expense: limitedExp,
            currPage: page,
            hasNextPage: expense_per_page * page < totalExpense,
            nextPage: page + 1,
            hasPrevPage: page > 1,
            prevPage: page - 1,
            lastPage: Math.ceil(totalExpense / expense_per_page)
        }
        // console.log('next page number :', req.paginate.nextPage);
        next();
    } catch (err) {
        console.log('error in limited expense :', err);
        res.status(500).json({ success: false, error: err })
    }
}