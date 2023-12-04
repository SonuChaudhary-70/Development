const Sequelize = require('sequelize');
const sequelize = require('../util/dbConfig.js');

const ReportFiles = sequelize.define('ReportFiles', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    fileUrls: {
        type: Sequelize.STRING,
        allowNull: false
    },
}, {
    timestamps: true,
    updatedAt: false,
})

module.exports = ReportFiles;