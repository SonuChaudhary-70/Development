

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
const sequelize = new Sequelize('appointment_booking','root','SIDc78',{
    dialect:'mysql',
    host:"localhost"
});

module.exports = sequelize;