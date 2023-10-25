const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const sequelize = require("./utils/database");
const cors = require("cors");
const postRoutes = require("./routes/postRoutes");
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/get", postRoutes);
// app.use("/post", postRoutes);

sequelize
  .sync()
  .then((result) => {
    app.listen(3001);
  })
  .catch((err) => console.log(err));
