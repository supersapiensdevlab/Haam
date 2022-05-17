//js
const Customer = require("../models/Customers");
const bcrypt = require("bcryptjs");

//For Register Page
const registerView = (req, res) => {
  //js

  res.render("register", {});
};

//Post Request that handles Register
const registerUser = (req, res) => {
  const { name, email, phone, password, confirm } = req.body;
  if (!name || !email || !password || !confirm) {
    console.log("Fill empty fields");
  }
  //Confirm Passwords
  if (password !== confirm) {
    console.log("Password must match");
  } else {
    //Validation
    Customer.findOne({ Email: email }).then((user) => {
      if (user) {
        console.log("email exists", email);
        res.send("email exists" + email);
      } else {
        //Validation
        const newUser = new Customer({
          Name: name,
          Email: email,
          Phone: phone,
          Password: password,
        });
        //Password Hashing
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.Password, salt, (err, hash) => {
            if (err) throw err;
            newUser.Password = hash;
            newUser
              .save()
              .then(res.send(newUser))
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
};
// For View
const loginView = (req, res) => {
  res.render("login", {});
};
module.exports = {
  registerView,
  loginView,
  registerUser,
};