const Sequelize = require('sequelize');
const sequelize = require('../util/dbConfig.js');
// const uuid4 = require('uuid').v4();
// const uuid4 = uuid.v4()


const ForgotPasswordReq = sequelize.define('ForgotPasswordReq', {
    id: {
        type: Sequelize.UUID,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
    },
    isActive: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
})

module.exports = ForgotPasswordReq;