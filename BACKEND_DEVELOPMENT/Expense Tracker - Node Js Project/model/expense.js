const Sequelize = require('sequelize');
const sequelize = require('../util/dbConfig.js');

const Expense = sequelize.define('Expense', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    category: {        
        type:Sequelize.STRING,
        allowNull: false,
        unique: false
    },
    date: {
        type: Sequelize.DATEONLY,
        unique:false,
        allowNull: false
    },
    // username:{
    //     type: Sequelize.STRING,
    //     allowNull: false
    // }
})

module.exports = Expense