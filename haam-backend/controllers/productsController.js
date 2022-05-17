const Product = require("../models/Products");

//Post Request that handles Register
const getProducts = (req, res) => {
  Product.find({})
    .then((products) => {
      res.json(products);
    })
    .catch((err) => console.log(err));
};

module.exports = {
  getProducts,
};
