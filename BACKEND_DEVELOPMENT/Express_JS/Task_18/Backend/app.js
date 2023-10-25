const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/DB_Connection')
const cors = require('cors')
const userRoutes = require('./routes/user');

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.use('/user', userRoutes);


sequelize.sync()
    .then(result => {
        console.log('Server is running successfully');
        app.listen(7055);
    })
    .catch(err => {
        console.log(err);
    })

