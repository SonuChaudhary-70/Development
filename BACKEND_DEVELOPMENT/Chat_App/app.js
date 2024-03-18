// const express = require('express');
import express from 'express'
import mainPageRoutes from './routes/main.js';
import userRoutes from './routes/user.js';
import sequelize from './util/db_config.js';
import 'dotenv/config'
const app = express();

app.use(express.static('public'));
app.use(express.json())

app.use(mainPageRoutes)
app.use('/user', userRoutes)

const startServer = async () => {
    // const dbConnected = await sequelize.sync();
    const dbConnected = await sequelize.sync({force: true});
    try {
        app.listen(process.env.PORT, () => {
            console.log('server is listening request on port :', process.env.PORT);
        })
    } catch (err) {
        console.log('error :', err);
    }
}
startServer()


