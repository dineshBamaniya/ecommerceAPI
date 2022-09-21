const sql = require("./db.js");

// constructor
const Product = function (product) {
  this.name = product.name;
  this.price=product.price;
  this.quantity=product.quantity;
  this.image = product.image;
};

Product.getAll = result => {
  sql.query("SELECT * FROM products", (err, res) => {
    if (err) {
      console.log("error:11 ", err);
      result(null, err);
      return;
    }
    result(null, res);
  });
};

module.exports = Product;