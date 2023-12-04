const Expense = require('../model/expense');
const User = require('../model/user');
const ReportFiles = require('../model/reportFiles')
const sequelize = require('sequelize');
require('dotenv').config();
const UserServices = require('../services/user_services');
const S3Services = require('../services/s3services');

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

exports.downloadExpenseReport = async (req, res) => {
    const isPremiumUser = req.user.isPremiumMember;
    try {
        if (isPremiumUser) {
            const expenses = await UserServices.getExpenses(req);
            const stringified = JSON.stringify(expenses);
            let fileName = `Expense${req.user.id}/${new Date()}.txt`
            const fileUrl = await S3Services.uploadToS3(stringified, fileName);
            ReportFiles.create({ fileUrls: fileUrl })
            return res.status(200).json({ success: true, fileUrl })
        } else {
            return res.status(401).json({ success: false, message: 'Not a premium user' })
        }
    }
    catch (err) {
        console.log('error while creating file url', err);
        return res.status(400).json({ success: false, err })
    }
}
