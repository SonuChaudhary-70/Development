const express = require('express')
const http = require('http');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));


app.use('/add-product', (req, res, next) => {
    res.send('<form action="/products" method="POST"><input type="text" name="title" placeholder="product name"><br><input type="number" name="quantity" placeholder="qantity"><br><button type="submit">Add Product</form>');
})

app.post('/products', (req, res, next) => {
    let data = req.body
    console.log('product :',data.title)
    console.log('quantity :',data.quantity);
    res.redirect('/')
})

app.use('/comment', (req, res, next) => {
    res.send('<h1>Comment added</h1>')
})

app.get('/', (req, res, next) => {
    res.send('<h1> hello from node js </h1>');
})


http.createServer(app).listen(8080);