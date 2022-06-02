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
const multer = require('multer')
const router = express.Router();
const {Product} = require('../models/products')

router.get("/products", getProducts);

// for uploading image
// For file upload
let path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
  cb(null, './uploads');
  },
  filename: function (req, file, cb) {
  cb(null, file.originalname);
  }
  });
  
  const upload = multer({
  storage: storage,
  limits: {fileSize: 1024 * 1024 * 5}
  });

router.post("/product",authToken,upload.single('image'),async(req,res)=>{
  try{
    const {name,price,description,category,type,size,quantity}=req.body
    const image = req.file.filename;
    if(name != "" && price>0){
      const product = new Product({
        ProductID:Date.now(),
        ProductName:name,
        CateoryID:category,
        QuantityPerUnit:quantity,
        UnitPrice:price,
        
      }      )
    }
  }catch(err){
    console.log(err)
  }
})

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
