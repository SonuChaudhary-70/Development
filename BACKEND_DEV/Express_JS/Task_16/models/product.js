
const db = require('../util/DB_Connection')

const Cart = require('./cart');


module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    let sql = 'INSERT INTO products (title,price,description, imageUrl) VALUES (?,?,?,?)';

    return db.execute(sql, [this.title, this.price, this.description, this.imageUrl]);
  }

  static deleteById(id) {
    return db.execute(`DELETE FROM products WHERE id = ?`, [id])
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products");
  }

  static findById(id) {
    return db.execute("SELECT * FROM products WHERE products.id = ?", [id])
  }
};
