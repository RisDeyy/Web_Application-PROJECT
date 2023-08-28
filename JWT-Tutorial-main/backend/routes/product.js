const router = require("express").Router();
const ProductOrder = require("../controllers/productOrder");
const Product = require("../controllers/product")
const {verifyToken} = require("../controllers/verifyToken");




router.post("/addproduct",verifyToken,Product.addProduct);
router.get("/allproduct",Product.getAllProduct);
router.delete("/product/:idProduct",verifyToken,Product.deleteProduct);
router.post("/product/update",Product.updateProduct);
router.get("/productOrder", ProductOrder.getAllCheckout);
router.delete("/product/checkoutyes/:id",ProductOrder.CheckOutYes);
router.delete("/product/checkoutno/:id",ProductOrder.CheckOutNo);
module.exports = router;