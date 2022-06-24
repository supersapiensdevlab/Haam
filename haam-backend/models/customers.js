const mongoose = require("mongoose");
const CustomerSchema = new mongoose.Schema({
  CustomerID: {
    type: Number,
    default:0,
    required:true,
    unique:true
  },
  ContactTitle: {
    type: String,
    default: "",
  },
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique:true
  },
  CompanyName: {
    type: String,
    required: false,
  },
  Phone: {
    type: Number,
    required: true,
  },
  Password: {
    type: String,
    required: true,
  },
  AddressID: {
    type: Number,
    required: false,
  },
  RegisteredOn: {
    type: Date,
    default: Date.now,
  },
  Image:{
    type:String,
  }
});
mongoose.models = {};

const Customer =
  mongoose.model("Customers", CustomerSchema) || mongoose.models.Customer;
module.exports = Customer;
