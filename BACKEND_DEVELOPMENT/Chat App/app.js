const express = require('express');
const app = express();
const mainPageRoutes = require('./Routes/main.js')
require('dotenv').config();

app.use(express.static('public'));

app.use(mainPageRoutes)

app.listen(process.env.PORT, () => {
    console.log('server is listening request on port :', process.env.PORT);
})
