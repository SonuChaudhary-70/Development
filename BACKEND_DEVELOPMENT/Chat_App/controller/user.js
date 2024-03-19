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
        throw new SyntaxError('Bad parameters. Something is missing')
        // return res.status(400).json({ err: "Bad parameters. Something is missing" })
    }
    try {
        // check if user exist with same email id or not
        const user = await User.findOne({ where: { email: email } });
        if (!user) {
            const hashedPassword = await bcrypt.hash(password, saltRounds)
            if (!hashedPassword) { throw new Error('Error while hashing a password') }
            console.log('ready to create a new user');
            await User.create({
                username: username,
                email: email,
                phone: phone_num,
                password: hashedPassword
            });
            // const signUpToken = jwt.sign({ new_user:user }, process.env.JWT_SECRET_KEY, { expiresIn: '365d' })
            return res.status(201).json({ success: true, message: "User created successfully" });
        } else {
            console.log('user found no need to create a new user:', user);
            throw new Error('Email already exist')
        }
    }
    catch (err) {
        console.log('error found', err);
        return res.status(409).json({ success: false, error: err.message })
    }
}

function isStringInvalid(string) {
    return !!(string == undefined || string.length === 0);
}

export const isUserExist = async (req, res) => {
    const email = req.body;
    if (isStringInvalid(email)) throw new SyntaxError('Bad parameters. Something is missing')
    const userFound = await User.findOne({ email: email });
    try {
        if (!userFound) { return res.status(201).json({ success: false, message: 'user not found' }); }
        throw new Error('user already exists')
    } catch (err) {
        return res.status(409).json({ success: true, error: err.message })
    }
}