const express = require('express')
const fs = require('fs')
const router = express.Router();

router.get('/', (req, res) => {
        // read the file
        fs.readFile('./data.txt',(err, data) => {
            if (err) {
                console.log(err.errno);
                res.send(`<form action="/" method="POST" onsubmit="document.getElementById('username').value = localStorage.getItem('username')">
                <h2>Please login first and start chatting</h2>
                <h3>If already login then no previous chat exist</h3>
                <input type='text' name="message" id="message"><input type='hidden' name='username' id='username'><br>
                <button type="submit">Send</button></form>`)
            }else{
                // console.log(data.toString().trim());
                res.send(`<form action="/" method="POST" onsubmit="document.getElementById('username').value = localStorage.getItem('username')">
                <p>${data.toString().trim()}</p>
                <input type='text' name="message" id="message"><input type='hidden' name='username' id='username'><br>
                <button type="submit">Send</button></form>`)
            }
        })
})

router.post('/', (req, res) => {
    // write and and update the file
    let msgDetail = `${req.body.username} : ${req.body.message}`;
    fs.appendFile('./data.txt', '\n'+msgDetail, (err) => {
        if (err) {
            console.log('Error while writing a file :', err);
        } else {
            console.log("\nFile Content updated successfully:")
        }
    })
    res.redirect('/')
})

module.exports = router;  //exporting the router