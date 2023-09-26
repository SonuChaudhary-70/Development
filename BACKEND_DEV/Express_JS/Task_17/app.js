// const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/DB_Connection')

const errorController = require('./controllers/error');
const cors = require('cors')

const app = express();
app.use(cors())

app.set('view engine', 'ejs');
app.set('views', 'views');

// import routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.json());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

sequelize.sync()
    .then(result => {
        app.listen(7048);
    })
    .catch(err => {
        console.log(err);
    })

