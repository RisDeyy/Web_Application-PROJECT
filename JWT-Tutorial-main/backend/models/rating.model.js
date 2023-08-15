const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const RatingSchema = new Schema(
  {
    rating: Number,
    content: String,
  },
  
 
);

const Rating = mongoose.model("Rating", RatingSchema);
module.exports = Rating;
