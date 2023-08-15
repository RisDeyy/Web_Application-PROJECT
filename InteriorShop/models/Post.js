const mongoose = require("mongoose");

const Post = new Schema(
    {
        idPost: { type: String, maxlength: 255 },
        idAuthor: { type: String, maxlength: 255 },
        avatar : { type: String },
        author: { type: String, maxlength: 255 },
        points: { type: Number },
        createdAt: { type: Date, default: Date.now }, 
        postTitle: { type: String, maxlength: 255},
        content: { type: String },
        listImg : [],
        listComments: [Schema.Types.ObjectId], // Mảng các ObjectId
    },

    { collection: "Post" }
);

module.exports = mongoose.model("Post", Post);