const Order = require('../model/order');
require('dotenv').config();
const secret_Key = process.env.JWT_SECRET_KEY
const jwt = require('jsonwebtoken');
const Razorpay = require('razorpay');


exports.purchasePremium = async (req, res, next) => {
    try {
        let rzpInstance = new Razorpay({
            key_id: process.env.RAZORPAY_KEY_ID,
            key_secret: process.env.RAZORPAY_KEY_SECRET
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
    const { order_id, payment_id, success, status } = req.body;
    try {
        const validOrder = await Order.findOne({ where: { orderId: order_id } });
        if (success && status === 200) {
            const orderUpdate = Order.update({ paymentId: payment_id, status: 'SUCCESSFUL' }, { where: { orderId: validOrder.orderId } });
            const premiumUserUpdate = req.user.update({ isPremiumMember: true });
            Promise.all([orderUpdate, premiumUserUpdate])
                .then((response) => {
                    const newTokenGenerated = jwt.sign({ userId: response[1].id, name: response[1].username, isPremiumUser: response[1].isPremiumMember }, secret_Key, { expiresIn: '365d' })
                    return res.status(201).json({ success: true, message: 'this user is premium member now', new_token: newTokenGenerated })
                })
                .catch(async (err) => {
                    await Order.update({ paymentId: payment_id, orderId: validOrder.orderId, status: 'FAILED' }, { where: { orderId: validOrder.orderId } });
                    throw new Error(err)
                })
        }
        else {
            throw new Error('something went wrong at frontend');
        }
    }
    catch (err) {
        await Order.update({ paymentId: payment_id, orderId: order_id, status: 'FAILED' }, { where: { orderId: order_id } });
        return res.status(403).json({ success: false, message: 'Something went wrong', Error: err })
    }
}