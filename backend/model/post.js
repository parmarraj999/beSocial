const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    userId : {
       type : String
    },
    title : {
        type : String
    }
},
{ timestamps : true }
)

const Post = mongoose.model('Post',postSchema)

module.exports = Post;