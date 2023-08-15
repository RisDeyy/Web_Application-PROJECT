const productModel = require("../models/product.model");

const Product = {
  getAllProduct: async (req, res) => {
    try {
      const products = await productModel.find().exec();
      res.status(200).json(products);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal server error" });
    }
  },

  deleteProduct: async (req,res)=>{
    try {
        const deletedProduct = await productModel.findByIdAndRemove(req.params.id);
        if (!deletedProduct) {
        console.log(  req.params.id);
          return res.status(404).json({ error: "Account not found" });
        }
        res.status(200).json({ message: "Account deleted successfully" });
      } catch (err) {
        res.status(500).json({ error: "Internal server error" });
      }
    },
    updateProduct: async (req, res) => {
      try {
        const Product = await productModel.findById(req.body._id);
        if (!Product) {
          
          return res.status(404).json({ error: "Product not found" });
        }
        Product.details =req.body.details,
        Product.category=req.body.category,
        Product.name=req.body.name,
        Product.price=req.body.price,
        Product.quantity=req.body.quantity,
        Product.image=req.body.image,
        Product.listImgExtra=req.body.listImgExtra,
        await Product.save();
        res.status(200).json({ message: "Product updated successfully" });
      } catch (err) {
        console.log(err);
        res.status(500).json({ error: "Internal server error" });
      }
    },
  
};

module.exports = Product;
