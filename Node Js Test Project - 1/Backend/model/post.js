const Sequelize = require('sequelize');
const sequelize = require('../util/db_connection');

const Post = sequelize.define('Post',{
    id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey: true,
        allowNull: false
    },
    link:{
        type:Sequelize.STRING,
        allowNull:false,
        unique: true
    },
    description:{
        type:Sequelize.STRING,
        allowNull:false
    }
})

module.exports = Post