const router = require("express").Router();
const product = require("../controllers/product");

router.get("/product", product.getAllCheckout);
router.delete("/product/checkoutyes/:id",product.CheckOutYes);
router.delete("/product/checkoutno/:id",product.CheckOutNo);
module.exports = router;