const Expense = require('../model/expense')

exports.addExpense = async (req, res, next) => {
    const { Amount, Description, Category } = req.body;
    // const user = req.user;
    console.log(user);
    const createdExp = await Expense.create({
        amount: Amount,
        description: Description,
        category: Category
    })
    try {
        res.status(201).json({ success: true, expense: createdExp, message: 'expense created successfully' })
    }
    catch (err) {
        console.log('Error while adding expense in DB :', err);
        res.json({ success: false, Error: err })
    }
}

exports.getAllExpenses = (req, res, next) => {
    Expense.findAll().then(expenses => {
        res.status(200).json(expenses)
    }).catch(err => {
        console.log('Error while fetching expenses from DB:', err);
    })
}

exports.getExpenseById = (req, res, next) => {
    let Id = req.params.id
    Expense.findByPk(Id)
        .then(expense => {
            res.status(200).send(expense)
        }).catch(err => {
            console.log('Error while fetching expense from dataBase by id', err);
        })
}

exports.updateExpense = (req, res, next) => {
    console.log('update enter');
    console.log(req.body);
    let Id = req.params.id;
    let {Amount, Description,Category} = req.body;
    // let Amount = req.body.Expense_Amount;
    // let Description = req.body.Description;
    // let Category = req.body.Category;

    Expense.update({
        amount: Amount,
        description: Description,
        category: Category
    }, {
        where: { id: Id }
    })
}

exports.deleteExpense = (req, res, next) => {
    let Id = req.params.id
    Expense.destroy({ where: { id: Id } }).then(() => {
        console.log(`Expense of id ${Id} is deleted successfully`);
    }).catch((err) => {
        console.log(err);
    })
}