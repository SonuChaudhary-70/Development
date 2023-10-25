const Sequelize = require('sequelize');
const sequelize = require('../util/DB_Connection')

const User = sequelize.define('users', {
    id:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    email:{
        type: Sequelize.STRING,
        allowNull: false
    }
})

module.exports = User;