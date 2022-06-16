const Category = require("../models/category");
const Type = require("../models/type");

const getCategory = (req, res) => {
  Category.find({})
    .then((category) => {
      res.json(category);
    })
    .catch((err) => console.log(err));
};
const getType = (req, res) => {
  Type.find({})
    .then((type) => {
      res.json(type);
    })
    .catch((err) => console.log(err));
};
const addCategory = (req, res) => {
  const category = new Category({
    id: Date.now(),
    name: req.body.name,
  });
  category
    .save()
    .then((cat) => {
      res.send(cat);
    })
    .catch((err) => console.log(err));
};

const addType = (req, res) => {
  const type = new Type({
    id: Date.now(),
    name: req.body.name,
  });
  type
    .save()
    .then((ty) => {
      res.send(ty);
    })
    .catch((err) => console.log(err));
};

const deleteCategory = (req, res) => {
  Category.deleteOne({ id: req.body.id })
    .then((cat) => {
      res.send(cat);
    })
    .catch((err) => console.log(err));
};
const deleteType = (req, res) => {
  console.log(req.body.id);
  Type.deleteOne({ id: req.body.id })
    .then((ty) => {
      res.send(ty);
    })
    .catch((err) => console.log(err));
};

const updateCategory = (req, res) => {
  Category.updateOne({ id: req.body.id }, { name: req.body.name })
    .then((cat) => {
      res.send(cat);
    })
    .catch((err) => console.log(err));
};

const updateType = (req, res) => {
  console.log(req.body.id);
  Type.updateOne({ id: req.body.id }, { name: req.body.name })
    .then((ty) => {
      res.send(ty);
    })
    .catch((err) => console.log(err));
};

module.exports = {
  getCategory,
  getType,
  addCategory,
  addType,
  deleteCategory,
  deleteType,
  updateCategory,
  updateType
};
