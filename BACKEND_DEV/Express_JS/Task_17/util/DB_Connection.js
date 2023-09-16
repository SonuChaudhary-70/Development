const mysql = require('mysql2');


// // Create the connection pool. The pool-specific settings are the defaults
// const pool = mysql.createPool({
//     host: 'localhost',
//     user: 'root',
//     database: 'testDB',
//     password:'root'
// });

// module.exports = pool.promise();

// New Connection with help of Sequelize Constructor
const Sequelize = require("sequelize")
const sequelize = new Sequelize('product_list','root','root',{
    host:"localhost",
    dialect:'mysql'
});

module.exports = sequelize;