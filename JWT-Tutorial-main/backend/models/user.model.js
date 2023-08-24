const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema(
  {
    email: String,
    password: String,
    name: String,
    address: String,
    status: Boolean,
    idShoppingCart: { type: Schema.Types.ObjectId },
    isBlocked:{type: Boolean,default :false}
  },
  {collection :"user"}
 
);

const user = mongoose.model("user", UserSchema);
module.exports = user;
