const Orders = require("../models/orders");

const getOrders = (req, res) => {
  Orders.find({})
    .then((orders) => {
      res.json(orders);
    })
    .catch((err) => console.log(err));
};

const addOrder = (req, res) => {
  try {
    const { CustomerID, OrderDate, RequiredDate, ShippedDate, Comment, Status, ProductID,QuantityOrdered } =  req.body;
   
      const order = new Orders({
        OrderID: Date.now(),
        CustomerID,
        OrderDate,
        RequiredDate,
        ShippedDate,
        Comment,
        Status,
        ProductID,
        QuantityOrdered,

      });
      order.save().then((o) => {
        res.send(o);
      });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getOrders,
  addOrder
};
