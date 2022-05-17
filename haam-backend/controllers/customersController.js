const Customer = require("../models/customers");
const bcrypt = require("bcryptjs");

//Post Request that handles getting all customers
const getCustomers = (req, res) => {
  Customer.find({})
    .then((customers) => {
      res.json(customers);
    })
    .catch((err) => console.log(err));
};

// const registerCustomers = (req, res) => {
//   const newCustomer = new Customer({
//     name: req.body.name,
//     email: req.body.email,
//     phone: req.body.phone,
//     address: req.body.address,
//     password: req.body.password,
//   });
//   Customer.insertOne({})
//     .then((customers) => {
//       res.json(customers);
//     })
//     .catch((err) => console.log(err));
// };

const updateCustomers = (req, res) => {
  const customerData = req.body;
  console.log(customerData);
  var myquery = { Email: req.body.email };
  var password = req.body.password;
  var newvalues = {
    Name: req.body.name,
    Email: req.body.email,
    Phone: req.body.phone,
  };

  //IF password is not empty
  if (password) {
    //Password Hashing
    bcrypt.genSalt(10, (err, salt) =>
      bcrypt.hash(req.body.password, salt, (err, hash) => {
        if (err) throw err;
        var newvalues = {
          $set: {
            Name: req.body.name,
            Email: req.body.email,
            Phone: "" + req.body.phone,
            Password: hash,
          },
        };

        Customer.updateOne(myquery, newvalues)
          .then((customers) => {
            res.json("done");
          })
          .catch((err) => console.log(err));
      })
    );
  }
  // IF password is empty
  else {
    Customer.updateOne(myquery, newvalues)
      .then((customers) => {
        res.json("done");
      })
      .catch((err) => console.log(err));
  }
};

//Post Request that handles deleting customer by id
const deleteCustomers = (req, res) => {
  console.log(req.body);
  var myquery = { Email: req.body.Email };
  Customer.deleteOne(myquery)
    .then(res.send("deleted"))
    .catch((err) => console.log(err));
};
module.exports = {
  getCustomers,
  updateCustomers,
  deleteCustomers,
};
