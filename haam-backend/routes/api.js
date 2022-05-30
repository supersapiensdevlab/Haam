//js
const express = require("express");
const { getProducts } = require("../controllers/productsController");
const { registerUser } = require("../controllers/loginController");
const {
  getCustomers,
  updateCustomers,
  deleteCustomers,
} = require("../controllers/customersController");
const authToken = require("../middleware/authenticateToken");

const router = express.Router();

router.get("/products", getProducts);

router.route("/register").post(async (req, res) => {
  try {
    await registerUser(req, res);
  } catch (err) {
    console.log(err); //eslint-disable-line
  }
});

// READ Customers
router.get("/customers", getCustomers);

// UPDATE Customers
router.route("/update-customer").post(authToken, async (req, res) => {
  try {
    await updateCustomers(req, res);
  } catch (err) {
    console.log(err); //eslint-disable-line
  }
});

// DELETE Customers
router.route("/delete-customer").post(authToken, async (req, res) => {
  try {
    await deleteCustomers(req, res);
  } catch (err) {
    console.log(err); //eslint-disable-line
  }
});

module.exports = router;
