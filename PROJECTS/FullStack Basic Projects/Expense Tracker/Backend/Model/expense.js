const Sequelize = require('sequelize');
const connectSequelizeToDB = require('../util/db_connection');

// create expense schema
const Expense = connectSequelizeToDB.define('expenses', {
    id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    amount: {
        type: Sequelize.FLOAT(10),
        allowNull: false
    },
    description:{
        type : Sequelize.STRING,
        allowNull: false
    },
    category: {
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = Expense;