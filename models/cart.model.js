const { query } = require("./db.js");
const sql = require("./db.js");
// constructor
const Cart = function (cart) {
  this.p_id = cart.p_id;
  this.user_id = cart.user_id;
};
Cart.save = (cart, result) => {
  que = `SELECT * FROM carts WHERE p_id=${cart.p_id} AND user_id=${cart.user_id}`;
  sql.query(que, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    //console.log(res, 'dub chk');
    if (res.length != 0) {
      q = `UPDATE carts SET quantity = quantity+1 WHERE p_id = ${cart.p_id} AND user_id=${cart.p_id}`;
      sql.query(q, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
        result(null, { result: true });
        stockDIC = `UPDATE products SET quantity = quantity-1 WHERE p_id = ${cart.p_id}`;
        sql.query(stockDIC);
      });
    } else {
      sql.query("INSERT INTO carts SET ?", cart, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
        console.log("created cart: ", { id: res.insertId, ...cart });
        result(null, { id: res.insertId, ...cart });
        stockDIC = `UPDATE products SET quantity = quantity-1 WHERE p_id = ${cart.p_id}`;
        sql.query(stockDIC);
      });
    }
  });
};
Cart.getallitem = (id, result) => {
  sql.query(
    `SELECT carts.id,carts.quantity,products.price,products.name,
    products.p_id,(products.quantity) AS stock 
    FROM carts 
    INNER JOIN products ON products.p_id=carts.p_id 
    WHERE carts.user_id=${id}`,
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      if (res.length) {
        result(null, res);
        return;
      }
    }
  );
};
Cart.IncItem = (action, user_id, p_id, result) => {
  if (action == "inc") {
    q = `UPDATE carts SET quantity = quantity+1 WHERE p_id = ${p_id} AND user_id=${user_id}`;
    q2 = `UPDATE products SET quantity = quantity-1 WHERE p_id = ${p_id}`;
  } else {
    q = `UPDATE carts SET quantity = quantity-1 WHERE p_id = ${p_id} AND user_id=${user_id}`;
    q2 = `UPDATE products SET quantity = quantity+1 WHERE p_id = ${p_id}`;
  }
  sql.query(q, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    result(null, { result: true });
    sql.query(q2);
  });
};
Cart.remove = (payload, result) => {
  q1 = `DELETE FROM carts WHERE id = ${payload.id}`;
  qq2 = `UPDATE products SET quantity = quantity+${payload.quantity} WHERE p_id = ${payload.p_id}`;
  sql.query(q1, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      result({ kind: "not_found" }, null);
      return;
    } else {
      result(null, (result = res.affectedRows));
      sql.query(qq2);
    }
  });
};
module.exports = Cart;
