const mongoose = require("mongoose");
const TypeSchema = new mongoose.Schema({
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

const Type =
  mongoose.model("ProductType", TypeSchema) || mongoose.models.Type;
module.exports = Type;