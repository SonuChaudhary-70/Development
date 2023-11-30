const jwt = require('jsonwebtoken');
const User = require('../model/user')
require('dotenv').config()
const secret_Key = process.env.SECRET_KEY


exports.authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        const user = jwt.verify(token, secret_Key)
        const userFound = await User.findByPk(user.userId);
        req.user = userFound
        next();
    }
    catch (err) {
        console.log('error while authenticating the user :', err);
        return res.status(401).json({ success: false, error: err });
    }
}   