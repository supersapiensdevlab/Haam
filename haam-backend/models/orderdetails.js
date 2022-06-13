const mongoose = require("mongoose");
const OrderDetailsSchema = new mongoose.Schema({
    OrderID:{
        type:Number,
        required:true,
    },
    ProductID:{
        type:Number,
        required:true,
    },
    QuantityOrdered:{
        type:Number,
        required:true,
        default:1
    }
});
mongoose.models = {};

const OrderDetails =
  mongoose.model("orderdetails", OrderDetailsSchema) || mongoose.models.OrderDetails;
module.exports = OrderDetails;
