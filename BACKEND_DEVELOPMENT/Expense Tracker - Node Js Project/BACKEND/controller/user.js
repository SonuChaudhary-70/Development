const User = require('../model/user');

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
                status:flag,
                message:'user exist'
            });
        })
        .catch(err => console.log(err));
}

exports.login = (req, res) => {
    console.log('entered');
    console.log(req.body);
}