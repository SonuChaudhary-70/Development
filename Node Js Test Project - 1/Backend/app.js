const express = require('express');
const app = express();
const sequelize = require('./util/db_connection')
const bodyParser = require('body-parser')
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');
const cors = require('cors')

app.use(cors());
app.use(bodyParser.json());

app.use('/post', postRoutes)
app.use('/comment', commentRoutes)

sequelize
    // .sync({force:true})
    .sync()
    .then((result) => {
        app.listen(7048);
    })
    .catch((err) => console.log(err));
