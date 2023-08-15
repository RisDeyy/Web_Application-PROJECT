const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ShoppingCartSchema = new Schema(
  {
    listProductOrder: [{ type: Schema.Types.ObjectId }],
    status: { type: Schema.Types.Boolean },
    purchasedTime: Date,
  },
 
 
);

module.exports = mongoose.model("ShoppingCart", ShoppingCartSchema);
