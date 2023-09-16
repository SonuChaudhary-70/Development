const Sequelize = require('sequelize');

const sequelize = require('../util/DB_Connection')

const Product = sequelize.define('product_list',{
  id:{
    type:Sequelize.INTEGER,
    autoIncrement : true ,
    primaryKey:true,
    allowNull : false
  },
  title:{
    type:Sequelize.STRING(255),
    allowNull :false
  },
  price:{
    type:Sequelize.DOUBLE,
    allowNull :false,
    unique :true
  },
  imageUrl:{
    type:Sequelize.STRING,
    allowNull:false,
    unique :true
  },
  description:{
    type:Sequelize.STRING,
    allowNull:false
  }
})

module.exports = Product;