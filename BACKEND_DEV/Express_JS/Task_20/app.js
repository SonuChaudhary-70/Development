const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./util/DB_Connection')
const shopRoutes = require('./routes/shop');
const adminRoutes = require('./routes/admin');
const errorController = require('./controllers/error');
const User = require('./models/user');
const Product = require('./models/product');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findByPk(1)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch((error) => {
            console.log(error);
        })
})

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

// Magic Association method
User.hasMany(Product);
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });

sequelize
    // .sync({ force: true })
    .sync()
    .then(result => {
        return User.findByPk(1);
    })
    .then(user => {
        if (!user) {
            return User.create({
                name: 'Sonu Chaudhary',
                email: 'test@gmail.com'
            })
        }
        return user;
    })
    .then(user => {
        // console.log('user Created :',user);
        app.listen(7048);
    })
    .catch(err => {
        console.log(err);
    })

