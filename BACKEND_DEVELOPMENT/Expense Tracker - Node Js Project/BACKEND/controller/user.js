const User = require('../model/user');

exports.login = (req, res) => {
    User.findOne({ where: { email: req.body.email, password: req.body.password} })
        .then((user) => {
            if (!user) {
                return res.status(404).json({ message: 'User not found' })
            }
            if (user.password != req.body.password) {
                return res.status(401).json({ message: 'Password not correct' })
            }
            return res.status(200).json({ message: "User logged in successfully", authorized: true })
        })
        .catch((error) => {
            console.log('Error while login :', error);
        })
}

exports.newUser = async (req, res, next) => {

    let username = req.body.username;
    let email = req.body.email;
    let password = req.body.password;
    User.create({
        username: username,
        email: email,
        password: password
    })
        .then(() => {
            console.log('User created successfully');
        })
        .catch(err => { console.log('Error while creating user :', err) })
}

exports.isUserExist = (req, res) => {
    let email = req.params.emailId;
    let flag = false;
    User.findOne({ where: { email: email } })
        .then(user => {
            if (user) flag = true;
            return res.json({
                status: flag,
                message: 'user exist'
            });
        })
        .catch(err => console.log(err));
}
