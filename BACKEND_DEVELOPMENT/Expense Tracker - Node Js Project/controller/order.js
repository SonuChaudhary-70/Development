const Order = require('../model/order');
const User = require('../model/user');
const Razorpay = require('razorpay');

exports.purchasePremium = async (req, res, next) => {
    try {
        let rzpInstance = new Razorpay({
            key_id: 'rzp_test_SgVv7cJPgSAiJj',
            key_secret: 'a9J6i8kcLfkCIzygSA3eumli'
        });
        const amount = 2500
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
                .then(() => {
                    return res.status(201).json({ success: true, message: 'this user is premium member now' })
                })
                .catch(async (err) => {
                    await Order.update({ status: 'FAILED' }, { where: { orderId: validOrder.orderId } });
                    throw new Error(err)
                })
        }
        // else {
        //     await Order.update({ status: 'FAILED' }, { where: { orderId: validOrder.orderId } });
        // }
    }
    catch (err) {
        return res.status(403).json({ success: false, message: 'Something went wrong', Error: err })
    }
}