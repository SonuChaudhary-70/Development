const express = require('express')
const router = express.Router();

let username = 'sonu'
let msg = 'hello'

router.get('/login', (req, res, next) => {
    res.send(`<form action="/" method="GET" onSubmit="localStorage.setItem('username',document.getElementById('username').value)">
    <input type="text" id="username" ><br>
    <button type="submit">Login</button></form>`)
})

module.exports = router

// onSubmit='${localStorage.setItem('username',document.getElementById('username'))}'