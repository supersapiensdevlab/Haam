const mongoose = require("mongoose");
const CategorySchema = new mongoose.Schema({
  id: {
    type: Number,
    default: 0,
  },
  name: {
    type: String,
    required: true,
  },
});
mongoose.models = {};

const Category =
  mongoose.model("ProductCategory", CategorySchema) || mongoose.models.Category;
module.exports = Category;
