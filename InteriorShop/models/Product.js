const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Product = new Schema(
  {
    name: { type: String, maxlength: 255 },
    details: { type: String, maxlength: 255 },
    quanlity: { type: String },
    price: { type: Number },
    pricesale: { type: Number },
    image: { type: String },
   
    category: { type: String, maxlength: 255 },
    idProduct: { type: String, maxlength: 255 },
    listImgExtra: [],
    listIdRating: [],
  },

  { collection: "product" }
);

module.exports = mongoose.model("Product", Product);
