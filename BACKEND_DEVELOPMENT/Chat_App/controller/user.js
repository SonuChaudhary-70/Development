// Common js import export OR Old method of import and  export
// const User = require('../Model/user');
// const Sequelize = require('../util/db_config');

// ES6 Import and Export
import User from '../model/user.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// export any named function like this - export function function_name(parameters){}
export async function signUp(req, res) {
    const { username, email, phone_num, password } = req.body;
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
                phone: phone_num,
                password: hashedPassword
            });
            // const signUpToken = jwt.sign({ new_user:user }, process.env.JWT_SECRET_KEY, { expiresIn: '365d' })
            return res.status(200).json({ success: true, message: "User created successfully" });
        } else {
            return res.status(409).json({ success: false, message: "Email already exists" });
        }
    }
    catch (err) {
        console.log('Error while creating a user :', err);
    }
}

function isStringInvalid(string) {
    return !!(string == undefined || string.length === 0);
}