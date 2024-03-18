// const express = require('express');
import express from 'express';
const router = express.Router();

router.get('/main', (req, res) => {
    res.sendFile('main.html', { root: 'views' });
})

export default router;