const Expense = require('../model/expense');
const User = require('../model/user');
const sequelize = require('sequelize');


exports.updateLeaderBoard = async (req, res) => {
    try {
        const total = await Expense.findAll({
            attributes: [
                'UserId', [sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],
            ], include: {
                model: User,
                attributes: ['username']
            },
            group: ['UserId'],
            order: [[sequelize.col('total_amount'), 'DESC'],]
        });
        return res.status(200).json({ success: true, totalAmount: total });
    }
    catch (err) {
        console.log(err);
        return res.status(403).json({ success: false, message: 'Something went wrong', Error: err })
    }
}
