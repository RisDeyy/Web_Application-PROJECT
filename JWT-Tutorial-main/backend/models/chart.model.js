const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Chart = new Schema(
  {
    revenue : {type:Number,default:0}
  },
  
  {collection :"Chart"},
  { timestamps: true }
);

const PriceChart = mongoose.model("Chart", Chart);
module.exports = PriceChart
