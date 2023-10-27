const express = require('express');
const app = express();
const newUser = require('../model/user');

exports.newUser = (req, res, next) => {
    // let username = req.body.username
    console.log('request body :',req.body);
    // res.status(201).send('user Created')
}