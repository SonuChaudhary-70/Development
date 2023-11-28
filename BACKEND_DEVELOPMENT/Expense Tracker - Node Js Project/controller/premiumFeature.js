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

// exports.leader = async (req, res) => {
//     const response = await req.user.update({ total_amount: req.body.total_amount },
//         {
//             attributes: ['id', 'username', 'total_amount'],
//             returning: false, // Enable returning the updated record
//             plain: true, // Return only the updated row (not an array)
//         });
//     // const response = await User.update({ total_amount: req.body.total_amount }, { where: { id: req.user.id } });
//     return res.status(200).json({ success: true, message: 'total expense updated in user table', data: response })
// }