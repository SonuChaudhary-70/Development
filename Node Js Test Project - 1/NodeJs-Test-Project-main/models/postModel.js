const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const posts = sequelize.define("posts", {
  link: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  desc: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const comments = sequelize.define("comments", {
  comment: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

posts.hasMany(comments);

module.exports = { posts, comments };
