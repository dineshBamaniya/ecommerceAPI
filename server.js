const express = require("express");

const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bezkoder application." });
});
// const products = require("./controllers/product.controller.js");
require("./routes/product.routes")(app);
require("./routes/customer.routes.js")(app);
// set port, listen for requests
app.listen(3020, () => {
  console.log("Server is running on port 3020.");
});
