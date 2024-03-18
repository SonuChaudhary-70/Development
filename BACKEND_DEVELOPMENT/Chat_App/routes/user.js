// const express = require('express');
import express from 'express';
import { signUp } from '../controller/user.js'

const router = express.Router();

router.get('/sign-up', (req, res) => {
    res.sendFile('signup.html', { root: 'views' });
})

router.post('/sign-up/add-user',signUp)

export default router;