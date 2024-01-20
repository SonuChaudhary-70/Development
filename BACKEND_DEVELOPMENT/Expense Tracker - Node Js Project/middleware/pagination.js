const Expense = require('../model/expense');

// pagination function middleware
exports.pagination = async (req, res, next) => {
    let total = 0;

    // let page = +req.query.page || 1;
    let page = Number(+req.query.page || 1)
    let expense_per_page = Number(req.query.limit || 5)
    try {
        // console.log('page number :', page);
        // console.log('expense per page :',expense_per_page);
        let totalExpense = await Expense.count();
        // console.log('total expense :',totalExpense);
        const limitedExp = await Expense.findAll({
            offset: (page - 1) * expense_per_page,//2*5
            limit: expense_per_page
        })
        limitedExp.forEach((exp) => {
            total += (exp.amount)
        })
        req.paginate = {
            success: true,
            expense: limitedExp,
            currPage: page,
            hasNextPage: expense_per_page * page < totalExpense,
            nextPage: page + 1,
            hasPrevPage: page > 1,
            prevPage: page - 1,
            lastPage: Math.ceil(totalExpense / expense_per_page),
            total : total
        }
        // console.log('next page number :', req.paginate.nextPage);
        next();
    } catch (err) {
        console.log('error in limited expense :', err);
        res.status(500).json({ success: false, error: err })
    }
}