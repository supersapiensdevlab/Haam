const Orders = require("../models/orders");

const getOrders = (req, res) => {
  Orders.find({})
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => console.log(err));
};

module.exports = {
  getOrders,
};
