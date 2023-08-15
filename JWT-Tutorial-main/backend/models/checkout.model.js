const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CheckOutSchema = new Schema(
  {
    email: { type: String, maxlength: 255 },
    numberPhone: { type: String, maxlength: 255 },
    idShoppingCart: { type: Schema.Types.ObjectId },
    note: { type: String, maxlength: 255 },
    status: { type: String, maxlength: 255 },
  },
  

);

module.exports = mongoose.model("CheckOut", CheckOutSchema);
