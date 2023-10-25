const Sequelize = require('sequelize');
const sequelize = require('../util/db_connection');

const Comment = sequelize.define('Comment',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true,
        allowNull: false
    },
    comment:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = Comment