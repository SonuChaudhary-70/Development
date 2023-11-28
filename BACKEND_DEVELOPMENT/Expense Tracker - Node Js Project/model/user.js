const Sequelize = require('sequelize');
const sequelize = require('../util/dbConfig.js');

const User = sequelize.define('User', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    isPremiumMember: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    total_amount: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    }
});

module.exports = User;