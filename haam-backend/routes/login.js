//js
const express = require("express");
const {
  registerView,
  loginView,
  registerUser,
} = require("../controllers/loginController");
const router = express.Router();
router.get("/register", registerView);
router.get("/registerUser", registerUser);

router.get("/login", loginView);

module.exports = router;
