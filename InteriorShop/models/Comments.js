const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Comment = new Schema(
    {
        avtatar: { type: String },
        username: { type: String, maxlength: 255 },
        image: { type: String },
        comment: { type: String },
    },

    { collection: "Comment" }
);

module.exports = mongoose.model("Comment", Comment);