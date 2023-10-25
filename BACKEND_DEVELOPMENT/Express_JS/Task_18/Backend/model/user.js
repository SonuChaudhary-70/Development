const Sequelize  = require('sequelize');
const sequelize = require('../util/DB_Connection')

const User = sequelize.define('users', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    user_name: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING(100),
        allowNull: false,
        unique: true
    },
    password:{
        type: Sequelize.STRING(100),
        allowNull: false,
    },
    date: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    time: {
        type: Sequelize.TIME(6),
        allowNull: false
    }
});

module.exports = User;