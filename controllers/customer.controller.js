const Customer = require("../models/customer.model");
const  jwt  =  require('jsonwebtoken');
const  bcrypt  =  require('bcryptjs');
const SECRET_KEY = "secretkey23456";
const { promisify } = require("util");
exports.create = (req, res,next) => {
  if(!req.body){
      res.status(400).send({
          message:"Content can not be empty"
      });
  }
  // create a user
  const customer = new Customer({
    email: req.body.email,
    username: req.body.username,
    address:req.body.address,
    password:bcrypt.hashSync(req.body.password),
  });
  //save user in db
  Customer.create(customer, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else {
        //console.log(customer.id,"cid",data,"data");
        data.password=undefined;
      const  expiresIn  =  1  *  60  *  60;
      const  accessToken  =  jwt.sign({ customer:data }, SECRET_KEY, {
        expiresIn:  expiresIn
       });
       res.status(200).send({ "customer":  data, "access_token":  accessToken, "expires_in":  expiresIn});
    }
  });
};

exports.login = (req,res) => {

const  email  =  req.body.email;
  const  password  =  req.body.password;
  Customer.findUserByEmail(email, (err, data)=>{
      if (err) return  res.status(500).send('Server error!');
      if (!data) return  res.status(404).send('Customer not found!');
      const  result  =  bcrypt.compareSync(password, data.password);
      if(!result) return  res.status(401).send('Password not valid!');
      data.password=undefined;
      const  expiresIn  =  1  *  60  *  60;
      console.log(data,'login data');
      const  accessToken  =  jwt.sign({ customer: data }, SECRET_KEY, {
          expiresIn:  expiresIn
      });
      res.status(200).send({ "customer":  data, "access_token":  accessToken, "expires_in":  expiresIn});
  });
}

  

  
