const Product = require("../models/Product");
const productController = require("./ProductController");
module.exports = {
    index: async (req, res, next) => {
      res.render("home/home")},
    // home: async (req, res, next) => {
    //   res.render("home/home")}, 
};