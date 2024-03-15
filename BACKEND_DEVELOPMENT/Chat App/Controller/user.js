const User = require('../Model/user');
const Sequelize = require('../util/db_config');

exports.addUser = async (req, res) => {
    console.log('user details :', req.body);
}