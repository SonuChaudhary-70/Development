const Sequelize = require("sequelize");
const sequelize = new Sequelize("node_test_project", "root", "SIDc78", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
