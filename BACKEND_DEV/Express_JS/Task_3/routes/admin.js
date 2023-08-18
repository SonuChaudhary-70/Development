const express = require('express');
const router = express.Router()

router.get('/add-product', (req, res, next) => {
    res.send('<form action="/admin/products" method="POST"><input type="text" name="title" placeholder="product name"><br><input type="number" name="quantity" placeholder="qantity"><br><button type="submit">Add Product</form>');
})

router.post('/products', (req, res, next) => {
    let data = req.body
    console.log('product :',data.title)
    console.log('quantity :',data.quantity);
    res.redirect('/')
})


module.exports = router