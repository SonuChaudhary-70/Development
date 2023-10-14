const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;

  // console.log('req create method :', );
  // user id is added automatically by special method (createProduct) given by sequelize associations in Product table
  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl,
    description: description
  })

    // adding user id manually in Product table while creating a new product
    // Product.create({
    //   title: title,
    //   price: price,
    //   imageUrl: imageUrl,
    //   description: description,
    //   userId: req.user.id
    // })
    .then(() => {
      console.log('Product Created');
      res.redirect('/admin/products')
    })
    .catch(err => {
      console.log('Error while adding product :', err);
    })
};

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect('/');
  }
  const prodId = req.params.productId;
  req.user.getProducts({ where: { id: prodId } })
    .then(products => {
      const product = products[0];
      if (!product) {
        return res.redirect('/');
      }
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: editMode,
        product: product
      });
    })
    .catch((err) => { console.log(err) });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDesc = req.body.description;
  Product.findByPk(prodId)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      product.imageUrl = updatedImageUrl;
      return product.save();
    }).then(() => {
      res.redirect('/admin/products');
    })
    .catch((error) => {
      console.log(error);
    })
};

exports.getProducts = (req, res, next) => {
  Product.findAll()
  req.user.getProducts()
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products'
      });
    })
    .catch((err) => { console.log(err); });
};

// 1. Approach - we find a product by its id and delete it by destroy method
exports.postDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.destroy({ where: { id: prodId } })
    .then(() => {
      res.redirect('/admin/products');
    })
};

// 2. Approach - First we find a product by findByPk using its id and after that delete it by destroy method
// exports.postDeleteProduct = (req, res, next) => {
//   const prodId = req.body.productId;
//   Product.findByPk(prodId)
//     .then(product => {
//       return product.destroy()
//     })
//     .then(() => {
//       res.redirect('/admin/products');
//     })
//     .catch(err => {
//       console.log(err);
//     })
// };
