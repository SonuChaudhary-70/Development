const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop.js');

app.use(bodyParser.urlencoded({ extended: true }));

// admin routes - get all products, add new products
app.use('/admin',adminRoutes)

// shop routes - general routes to show output
app.use(shopRoutes)

// if none of above routes 
app.use((req, res,next) => {
    res.status(404).send('<h1>Page not found</h1>')
})
app.listen(8080);