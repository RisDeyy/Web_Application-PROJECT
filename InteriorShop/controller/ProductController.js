const Product = require("../models/Product");
const Category = require("../models/Category");
class ProductController {
    async index(req, res, next) {
        let perPage = 6,
        page = Math.max(parseInt(req.param("page")) || 1, 1);
        if (req.param("page") == null) {
        page = 1;
        }
        let products = await Product.find({})
        .skip(perPage * (page - 1))
        .limit(perPage);

        let size = await Product.count({});
        let sizePage = Math.max(parseInt(size / perPage + 1));

        let categories = await Category.find({});
        
    }
        //[Get] /:idCategroy
    async seachByCategory(req, res, next) {
        let categoryChoose = await Category.findOne({
            idCategory: req.params.idCategory,
        });
        if (categoryChoose == null) {
            res.redirect("/shop-grid");
            return;
        }
        var perPage = 6,
        page = Math.max(parseInt(req.param("page")) || 1, 1);
        if (req.param("page") == null) {
            page = 1;
        }
        let products = await Product.find({
            _id: { $in: categoryChoose.listIdProduct },
        })
        .skip(perPage * (page - 1))
        .limit(perPage);
        let size = await Product.count({
            _id: { $in: categoryChoose.listIdProduct },
        });
        let categories = await Category.find({});
    }
        //[Get] /:idCategroy/:idProduct
    async getProduct(req, res, next) {
        let { idCategory } = req.params;
        let { idProduct } = req.params;
        let categoryChoose = await Category.findOne({
            idCategory: idCategory,
        });
        let productChoose = await Product.findOne({
            idProduct: idProduct,
        });
        if (categoryChoose == null || productChoose == null) {
            res.redirect("/shop-grid");
            return;
        }
        let relatedProduct = await Product.find({
            _id: { $in: categoryChoose.listIdProduct },
        })
        .skip(0)
        .limit(6);
        const categories = await Category.find({});
    }
}
module.exports = new ProductController();