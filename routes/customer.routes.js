
module.exports = (app) => {
   
    const customers = require("../controllers/customer.controller.js");
    const cart = require("../controllers/cart.controller.js");

    app.post("/customers",customers.create);
    app.post("/customerlogin",customers.login);
    //save cart item in db when click on add to cart button
    app.post("/customer/cart",cart.cart);
    //get cart Items
    app.get("/customer/cartitem/:userId",cart.cartitem);
    //Delete Produce from cart
    app.delete("/customer/cartitem/:cartItemId",cart.delete);
    //only get number of items in cart
    app.get("/customer/cartitemcount/:userId",cart.cartcounter);
    //Increement And Decreement quantity in cart 
    app.patch("/customer/cartitemIncre",cart.incrementcartitem);
}