const Expense = require('../model/expense');
const Sequelize = require('../util/dbConfig');
const { Op } = require("sequelize");


exports.addExpense = async (req, res) => {
    const t = await Sequelize.transaction();
    const { Amount, Description, Category, date } = req.body;
    // const total = Number(req.user.total_amount) + Number(Amount)
    try {
        const createdExp = await req.user.createExpense({
            amount: Amount,
            description: Description,
            category: Category,
            date: date,
        }, { transaction: t })
        // const userUpdate = await req.user.update({ total_amount: total });
        await t.commit();
        return res.status(201).json({ success: true, data: createdExp, message: 'expense created successfully' })
    }
    catch (err) {
        console.log('Error while adding an updating the user total expense expense in DB :', err);
        await t.rollback();
        return res.json({ success: false, Error: err })
    }
}

exports.getAllExpenses = async (req, res) => {
    try {
        const expenses = await req.user.getExpenses();
        return res.status(200).json({ success: true, data: expenses })
    }
    catch (err) {
        console.log('Error while fetching expenses from DB:', err);
        return res.json({ success: false, Error: err })
    }
}

exports.getExpenseById = async (req, res) => {
    let Id = req.params.id;
    try {
        let expense = await req.user.getExpenses({ where: { id: Id } })
        return res.status(200).json({ success: true, expense: expense })
    }
    catch (err) {
        console.log('Error while fetching expense from dataBase by id', err);
        return res.json({ success: false, Error: err });
    }
}

exports.updateExpense = async (req, res) => {
    let Id = req.params.id;
    let { Expense_Amount, Description, Category, date } = req.body;
    console.log(req.body);
    const t = await Sequelize.transaction();
    try {
        let updateExp = Expense.update({
            amount: Expense_Amount,
            description: Description,
            category: Category,
            date: date
        }, {
            where: { id: Id, UserId: req.user.id }
        }, { transaction: t });
        await t.commit();
        return res.status(200).json({ success: true, message: 'Expense updated successfully', updatedExpense: updateExp });
    }
    catch (err) {
        console.log('Error while updating expense : ' + err);
        await t.rollback();
        return res.json({ success: false, Error: err });
    }
}

exports.deleteExpense = async (req, res) => {
    let Id = req.params.id
    const t = await Sequelize.transaction()
    try {
        let deletedExp = await Expense.destroy({ where: { id: Id, UserId: req.user.id } }, { transaction: t });
        await t.commit();
        return res.status(200).json({ success: true, message: 'expense deleted successfully', deletedExp: deletedExp });
    }
    catch (err) {
        console.log('Error while deleting expense : ', err.message);
        await t.rollback();
        return res.json({ success: false, Error: err })
    }
}

exports.getLimitedExpense = async (req, res) => {
    // console.log('req paginate :',req.paginate);
    const expenses = req.paginate
    try{
        if(req.paginate){
            res.status(200).json({ success: true, expenses})
        }
    }
    catch(err){
        res.status(401).json({ success: false, Error:err})
    }
}

// my logic for pagination
async function pagination() {
    console.log('page number : ', req.query.page);
    let page = req.query.page < 1 ? 1 : req.query.page;
    const limitedExp = await Expense.findAll({
        // where: { id: { [Op.between]: [page, ++page] } }
        where: { id: { [Op.between]: [page, ++page] } }
    });
    let hasPrevPage
    let hasNextPage
    let currPage
    let nextPage
    let prevPage
    console.log(page - 1);
    if (limitedExp.length == 0 && page - 1 < 2) {
        console.log('no expense');
        hasPrevPage = false;
        hasNextPage = false;
    } else if (limitedExp.length < 2 || limitedExp.length == 0) {
        hasNextPage = false;
    } else {
        hasPrevPage = limitedExp[0].id != 1 || limitedExp.length == 0
        hasNextPage = limitedExp.length == 2
        currPage = page - 1;
        nextPage = currPage + 1;
        prevPage = currPage - 1;
        console.log('prev', prevPage);
        console.log('curr', currPage);
        console.log('next', nextPage);
    }
    res.status(200).json({
        success: true,
        expense: limitedExp,
        hasPrevPage,
        hasNextPage,
        currPage,
        nextPage,
        prevPage
    })
}