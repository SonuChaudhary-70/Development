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
        // type: Sequelize.ENUM(['food', 'electricity']),
        type:Sequelize.STRING,
        allowNull: false,
        unique: false
    }
})

module.exports = Expense