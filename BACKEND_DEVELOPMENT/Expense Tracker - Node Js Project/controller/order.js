const Order = require('../model/order');
const jwt = require('jsonwebtoken');
const secret_Key = '8832d8ddb94a53d5fc43d7312597eef4f7f056b1ddb1dd416a0cb4171974b9fe9593dbf57dfdf53fe351cf74e0e01a3704efe90cd8bfe9639d9f68ef12312027'
const Razorpay = require('razorpay');

exports.purchasePremium = async (req, res, next) => {
    try {
        let rzpInstance = new Razorpay({
            key_id: 'rzp_test_SgVv7cJPgSAiJj',
            key_secret: 'a9J6i8kcLfkCIzygSA3eumli'
        });
        const amount = 25 * 100 // razorpay takes amount in paisa format that's we multiply with 100 to convert to rupees
        rzpInstance.orders.create({ amount, currency: 'INR' }, (err, order) => {
            if (err) {
                throw new Error(JSON.stringify(err));
            }
            req.user.createOrder({ orderId: order.id, status: 'PENDING' })
                .then(() => {
                    return res.status(201).json({ status: true, message: 'Payment initiated successfully!', order_detail: order, keyId: rzpInstance.key_id, authorization: true });
                })
                .catch(err => {
                    throw new Error(err);
                })
        })
    }
    catch (err) {
        console.log(err);
        return res.status(403).json({ status: false, message: 'something went wrong', error: err });
    }
}

exports.updateTransaction = async (req, res) => {
    const { order_id, payment_id } = req.body;
    try {
        const validOrder = await Order.findOne({ where: { orderId: order_id } });
        if (payment_id) {
            const orderUpdate = Order.update({ paymentId: payment_id, status: 'SUCCESSFUL' }, { where: { orderId: validOrder.orderId } });
            const premiumUserUpdate = req.user.update({ isPremiumMember: true });
            Promise.all([orderUpdate, premiumUserUpdate])
                .then((response) => {
                    const newTokenGenerated = jwt.sign({ userId: response[1].id, name: response[1].username, isPremiumUser: response[1].isPremiumMember }, secret_Key, { expiresIn: '365d' })
                    return res.status(201).json({ success: true, message: 'this user is premium member now', new_token: newTokenGenerated })
                })
                .catch(async (err) => {
                    await Order.update({ status: 'FAILED' }, { where: { orderId: validOrder.orderId } });
                    throw new Error(err)
                })
        }
    }
    catch (err) {
        return res.status(403).json({ success: false, message: 'Something went wrong', Error: err })
    }
}

// exports.getExpenses = async (req, res) => {
//     try {
//         const totalAmount = await Expense.findAll({
//             attributes: [
//                 'UserId','username',
//                 [sequelize.fn('sum', sequelize.col('amount')), 'total_amount'],
//             ],
//             group: ['UserId','username'],
//         });
//         console.log('total amount :',totalAmount);
//         return res.status(200).json({ success: true, data: totalAmount });
//     }
//     catch (err) {
//         console.log(err);
//         return res.status(403).json({ success: false, message: 'Something went wrong', Error: err })
//     }
// }