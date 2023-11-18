const jwt = require('jsonwebtoken');
const secret_Key = '8832d8ddb94a53d5fc43d7312597eef4f7f056b1ddb1dd416a0cb4171974b9fe9593dbf57dfdf53fe351cf74e0e01a3704efe90cd8bfe9639d9f68ef12312027'
const User = require('../model/user');


exports.authenticate = async (req, res, next) => {
    try {
        const token = req.header('Authorization');
        // console.log('token :', token);
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