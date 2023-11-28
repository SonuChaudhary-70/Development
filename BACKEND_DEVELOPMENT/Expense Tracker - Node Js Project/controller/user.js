const User = require('../model/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const secret_Key = '8832d8ddb94a53d5fc43d7312597eef4f7f056b1ddb1dd416a0cb4171974b9fe9593dbf57dfdf53fe351cf74e0e01a3704efe90cd8bfe9639d9f68ef12312027'

function isStringInvalid(string) {
    return !!(string == undefined || string.length === 0);
}

exports.login = async (req, res) => {
    const { email, password } = req.body;
    let user = await User.findOne({ where: { email: email } })
    try {
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }
        // user found now validate the user
        let isValidUser = await bcrypt.compare(password, user.password);
        if (!isValidUser) {
            return res.status(401).json({ success: false, message: 'Password not correct' })
        }
        const generateToken = jwt.sign({ userId: user.id, name: user.username, email: user.email, isPremiumUser: user.isPremiumMember }, secret_Key, { expiresIn: '365d' })
        return res.status(200).json({ success: true, message: "User logged in successfully", authorized: true, token: generateToken });
    }
    catch (error) {
        console.log('Error while login :', error);
    }
}

exports.signUp = async (req, res) => {
    const { username, email, password } = req.body;
    const saltRounds = 10
    if (isStringInvalid(username) || isStringInvalid(email || isStringInvalid(password))) {
        return res.status(400).json({ err: "Bad parameters. Something is missing" })
    }
    try {
        // check if user exist with same email id or not
        let user = await User.findOne({ where: { email: email } });
        if (!user) {
            let hashedPassword = await bcrypt.hash(password, saltRounds)
            User.create({
                username: username,
                email: email,
                password: hashedPassword
            });
            if (!hashedPassword) throw new Error('Error while hashing password')
            return res.status(200).json({ success: true, message: "User created successfully" })
        } else {
            return res.status(409).json({ success: false, message: "Email already exists" });
        }
    }
    catch (err) {
        console.log('Error while creating a user :', err);
    }
}

exports.isUserExist = async (req, res) => {
    let user = await User.findOne({ where: { email: req.params.id } });
    try {
        if (user) {
            return res.status(200).json({ success: true, message: "user found", user: user });
        } else {
            return res.status(409).json({ success: false, message: 'user not found ' })
        }
    }
    catch (err) {
        console.log("Error in checking the user", err);
    }
}

exports.forgotPassword = async (req, res) => {
    console.log('forgot route work :', req.body);
    return res.status(200).json({ success: true, data: req.body })
}