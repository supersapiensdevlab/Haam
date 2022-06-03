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
const Product = require('../models/products');

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
        CategoryID:category,
        QuantityPerUnit:quantity,
        UnitPrice:price,
        Description:description,
        Size:size,
        Type:type,
        Image:image,
      })
      product.save().then((product)=>{
        res.send(product)
      })
    }
  }catch(err){
    console.log(err)
  }
})
// To update product
router.put("/product",authToken,upload.single('Image'),async(req,res)=>{
  try{
    const {_id,Image,ProductName,CategoryID,Type,UnitPrice,Size,QuantityPerUnit,Description} = req.body;
    let image = Image;
    if(typeof(Image)!="string"){
      image = req.file.filename;
    }
    const result = await Product.findByIdAndUpdate(_id,{Image:image,ProductName,CategoryID,Type,UnitPrice,Size,QuantityPerUnit,Description})
    res.send(result);
  }catch(err){
    console.log(err)
  }
})
// To delete product
router.post("/delete-product",authToken,async(req,res)=>{
  try{
    const {_id} = req.body;
    const result = await Product.findByIdAndDelete(_id);
    res.send(result);
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
