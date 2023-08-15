
const productOrder = require("../models/productOrder.model");
const shoppingcart = require("../models/shoppingcart.model");
const checkout = require("../models/checkout.model")
const userModel = require("../models/user.model");
const ProductOrder = {
    getProductOrder: async (id) => {
        try { 
            const order = await productOrder.findById(id);
            if (!order) {
                throw new Error(`ProductOrder not found with ID ${id}`);
            }
            return order;
        } catch (err) {
            console.log(err);
            throw err; 
        }
    },
    

    getShoppingCart: async (id) => {
        try {
            
            const shopping = await shoppingcart.findById(id);
            if (!shopping) {
               
                return { time: null, allProducts: [] }; 
            }
            
            const time = shopping.purchasedTime;
            const arr = shopping.listProductOrder;
           
            const allProducts = await Promise.all(arr.map(item => ProductOrder.getProductOrder(item)));
            
            return {time,allProducts};
        } catch (err) {
            return { time: null, allProducts: [] };
        }
    },
   
   getAllCheckout: async (req, res) => {
    try {
        const checks = await checkout.find();
        
        const checksWithAllProducts = await Promise.all(checks.map(async (check) => {
            try {
                const { idShoppingCart, ...others } = check._doc;
                let name = "";
                let address = "";
                try {
                    const user = await userModel.findOne({ email: check.email });
                    if (user) {
                        name = user.name;
                        address = user.address;
                    }
                } catch (error) {
                   
                }
                const price = 0;
                const allProducts = await ProductOrder.getShoppingCart(idShoppingCart);
                others.time = allProducts.time;
                others.price = price;
                return {
                    name,
                    address,
                    ...others,
                    products: allProducts.allProducts,
                };
            } catch (err) {
                throw err;
            }
        }));
            
            return res.status(200).json(checksWithAllProducts); 
        } catch (err) {
            return res.status(500).json(err);
    }
},
    CheckOutYes : async(req,res) =>{
        try{
        const checkoutedit = await checkout.findById(req.params.id);
        if (!checkoutedit) {
          return res.status(404).json({ error: "Account not found" });
        }
        checkoutedit.status = "Delivering";
        await checkoutedit.save();
        res.status(200).json({ message: "Account deleted successfully" });
      } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Internal server error" });
      }
    },
    CheckOutNo : async(req,res) =>{
        try{
        const checkoutedit = await checkout.findById(req.params.id);
        if (!checkoutedit) {
        
          return res.status(404).json({ error: "Account not found" });
        }
        checkoutedit.status = "Canceled";
        await checkoutedit.save();
        res.status(200).json({ message: "Account deleted successfully" });
      } catch (err) {
        res.status(500).json({ error: "Internal server error" });
      }
    },
}

module.exports = ProductOrder;
/*
const productOrder = require("../models/productOrder.model");
const shoppingcart = require("../models/shoppingcart.model");
const checkout = require("../models/checkout.model")
const user = require ("../models/user.model")
const product = {
    getProductOrder: async (id) => {
        try {
            const order = await productOrder.findById(id);
            if (!order) {
                return null;
            }
            return order;
        } catch (err) {
            return err;
        }
    },

    getShoppingCart: async (id) => {
        try {
            const shopping = await shoppingcart.findById(id);
            if (!shopping) {
                return null;
            }
            
            const arr = shopping.listProductOrder;
            const allProducts = await Promise.all(arr.map(item => product.getProductOrder(item)));
            
            return allProducts;
        } catch (err) {
            return err;
        }
    },
    getAllCheckout: async (req, res) => {
        try {
            const checks = await checkout.find();
            
            const checksWithAllProducts = await Promise.all(checks.map(async (check) => {
                const { idShoppingCart, ...others } = check._doc;
                const allProducts = await product.getShoppingCart(idShoppingCart);
                return {
                    ...others,
                    products: allProducts 
                };
            }));
           
            return res.status(200).json(checksWithAllProducts); 
        } catch (err) {
            return res.status(500).json(err);
    }
}
}

module.exports = product
*/