const Cart = require("../models/cart.model");
exports.cart = (req, res, next) => {
  const cart = new Cart({
    p_id: req.body.p_id,
    user_id: req.body.user_id
  });
  //save cartitem in db
  Cart.save(cart, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the cartitem."
      });
    else {
      res.status(200).send({ success: 1, msg: 'Product added in cart.' });
    }
  });
};
//Get Cart item
exports.cartitem = (req, res, nex) => {
  // console.log("hii",req.params.userId);
  if (req.params.userId != null) {
    Cart.getallitem(req.params.userId, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while get cart item."
        });
      }
      else {
        res.status(200).send(data);
      }
    })
  }
}
//incriment decriment product quantity in Cart
exports.incrementcartitem = (req, res) => {
  if (req.body != null) {
    Cart.IncItem(req.body.action,req.body.user_id, req.body.p_id, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "Some error occurred while update quntity."
        });
      }
      else {
        res.status(200).send(data);
      }
    })
  }
}
//delete Product from Cart
exports.delete = (req, res) => {
  Cart.remove(req.body,(err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Product with id ${req.body.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Product with id " + req.body.id
        });
      }
    } else res.send({data});
  });
};
//for cart Item counter
exports.cartcounter = (req, res) => {
  if (req.params.userId != null) {
    Cart.getallitem(req.params.userId, (err, data) => {
      if (err) {
        res.status(500).send({
          message:
            err.message || "error"
        });
      }
      else {
        res.status(200).send({items:data.length});
      }
    })
  }
}