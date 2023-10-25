// New Connection with help of Sequelize Constructor
const Sequelize = require("sequelize")
const sequelize = new Sequelize('expense_tracker','root','SIDc78',{
    dialect:'mysql',
    host:"localhost"
});

module.exports = sequelize;