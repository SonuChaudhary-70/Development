const User = require('../model/user')

exports.addUser = (req, res, next) => {
    const Username = req.body.Username;
    const Email = req.body.Email;
    const Password_ = req.body.Password;
    const Date_ = req.body.Date;
    const Time = req.body.Time;

    User.create({
        user_name: Username,
        email: Email,
        password: Password_,
        date: Date_,
        time: Time
    }).then((response) => {
        res.send(response);
    }).catch(err => {
        console.log(err);
    })
};

exports.getUsers = (req, res, next) => {
    User.findAll().then(users => {
        res.status(200).json(users);
    })
}

exports.getUserById = (req, res, next) => {
    const id = req.params.id;
    User.findByPk(id).then(response => {
        res.status(200).json(response)
    })
}

exports.updateUser = (req, res, next) => {
    let Id = req.params.id;
    const Username = req.body.Username;
    const Email = req.body.Email;
    const Password_ = req.body.Password;
    const Date_ = req.body.Date;
    const Time = req.body.Time;
    User.update({
        user_name: Username,
        email: Email,
        password: Password_,
        date: Date_,
        time: Time
    }, {
        where: { id: Id },
    })
}

exports.deleteUser = (req, res, next) => {
    let userId = req.params.id;
    User.destroy({ where: { id: userId } })
}