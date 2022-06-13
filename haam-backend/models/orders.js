const mongoose = require("mongoose");
const OrdersSchema = new mongoose.Schema({
    OrderID:{
        type:Number,
        required:true,
    },
    CustomerID:{
        type:Number,
        required:true,
    },
    OrderDate:{
        type:Date,
    },
    RequiredDate:{
        type:Date,
    },
    ShippedDate:{
        type:Date,
    },
    Comment:{
        type:String,
    },
    Status:{
        type:String,
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

const Orders =
  mongoose.model("orders", OrdersSchema) || mongoose.models.Orders;
module.exports = Orders;
