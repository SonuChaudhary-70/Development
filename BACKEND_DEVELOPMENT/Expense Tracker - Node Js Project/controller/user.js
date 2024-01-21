const User = require('../model/user');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
require('dotenv').config()


function isStringInvalid(string) {
    return !!(string == undefined || string.length === 0);
}

exports.login = async (req, res) => {
    console.log('enter in login');
    const { email, password } = req.body;
    let user = await User.findOne({ where: { email: email } })
    try {
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }
        // user found now validate the user by the password he/she entered
        let isValidUser = await bcrypt.compare(password, user.password);
        if (!isValidUser) {
            return res.status(401).json({ success: false, message: 'Password not correct' })
        }
        const loginToken = jwt.sign({ id: user.id, name: user.username, email: user.email, isPremiumUser: user.isPremiumMember }, process.env.JWT_SECRET_KEY, { expiresIn: '365d' });
        return res.status(200).json({ success: true, message: "User logged in successfully", authorized: true, token: loginToken });
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
            if (!hashedPassword) throw new Error('Error while hashing a password')
            await User.create({
                username: username,
                email: email,
                password: hashedPassword
            });
            // const signUpToken = jwt.sign({ new_user:user }, process.env.JWT_SECRET_KEY, { expiresIn: '365d' })
            return res.status(200).json({ success: true, message: "User created successfully"});
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
