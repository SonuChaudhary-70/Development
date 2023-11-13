const Sequelize = require('sequelize');

const sequelize = new Sequelize('expense_tracker', 'root', 'SIDc78', {
    dialect: 'mysql',
    host: 'localhost',
    define: {
        timestamps: false
    },
});

module.exports = sequelize;
