const sql = require("./db.js");

// constructor
const Customer = function (customer) {
  this.email = customer.email;
  this.password = customer.password;
  this.username = customer.username;
  this.address = customer.address
};
Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("created customer: ", { id: res.insertId, ...newCustomer });
    result(null, { id: res.insertId, ...newCustomer });
  });
};

Customer.findUserByEmail = (email, result) => {
  console.log(email, "email");
  sql.query(`SELECT * FROM customers WHERE email = '${email}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length != 0) {
      // console.log("found user: ", res);
      result(null, res[0]);
      return;
    }
    result({ kind: "not_found" }, null);
  });
}
Customer.findById = (customerId, result) => {
  // console.log(userId,"userId");
  sql.query(`SELECT * FROM customers WHERE id = ${customerId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    if (res.length) {
      return;
    }

    result({ kind: "not_found" }, null);
  });
};

module.exports = Customer;