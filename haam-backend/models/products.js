const mongoose = require("mongoose");
const ProductSchema = new mongoose.Schema({
  ProductID: {
    type: Number,
    required: true,
  },
  ProductName: {
    type: String,
    required: true,
  },
  SupplierID: {
    type: Number,
    default: 0,
  },
  CateoryID: {
    type: Number,
    required: true,
  },
  Discontinued: {
    type: Number,
    required: true,
    default: 0,
  },
  QuantityPerUnit: {
    type: String,
    required: true,
  },
  UnitPrice: {
    type: Number,
    required: false,
  },
  UnitsInOrder: {
    type: Number,
    required: false,
  },
  UnitsInStock: {
    type: Number,
    required: false,
  },
  CreatedOn: {
    type: Date,
    default: Date.now,
  },
});
const Product = mongoose.model("Products", ProductSchema);
module.exports = Product;
