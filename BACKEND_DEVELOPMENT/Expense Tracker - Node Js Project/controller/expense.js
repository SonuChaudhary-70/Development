const Expense = require('../model/expense');
const User = require('../model/user');

exports.addExpense = async (req, res) => {
    const { Amount, Description, Category, date } = req.body;
    const total = Number(req.user.total_amount) + Number(Amount)
    try {
        const createdExp = await req.user.createExpense({
            amount: Amount,
            description: Description,
            category: Category,
            date: date,
        })
        // const userUpdate = await req.user.update({ total_amount: total });
        return res.status(201).json({ success: true, data: createdExp, message: 'expense created successfully' })
    }
    catch (err) {
        console.log('Error while adding an updating the user total expense expense in DB :', err);
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
    let { Amount, Description, Category, date } = req.body;
    try {
        let updateExp = Expense.update({
            amount: Amount,
            description: Description,
            category: Category,
            date: date
        }, {
            where: { id: Id, UserId: req.user.id }
        })
        return res.status(200).json({ success: true, message: 'Expense updated successfully', updatedExpense: updateExp });
    }
    catch (err) {
        console.log('Error while updating expense : ' + err);
        return res.json({ success: false, Error: err });
    }
}

exports.deleteExpense = async (req, res) => {
    let Id = req.params.id
    try {
        let deletedExp = await Expense.destroy({ where: { id: Id, UserId: req.user.id } });
        return res.status(200).json({ success: true, message: 'expense deleted successfully', deletedExp: deletedExp });
    }
    catch (err) {
        console.log('Error while deleting expense : ', err.message);
        return res.json({ success: false, Error: err })
    }
}

// function updateUser(req, res) {
//     const Amount = req.body
// }