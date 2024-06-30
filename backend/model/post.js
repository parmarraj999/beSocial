const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    postedBy :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    userId : {
       type : String,
       required: true,
    },
    caption : {
        type : String
    },
    mediaUrl : {
        type : String,
        required : true
    },
    mediaType : {
        type : String
    },
    like :{
        type :[ mongoose.Types.ObjectId],
        ref : "User",
        default : []
    }
},
{ timestamps : true }
)

const Post = mongoose.model('Post',postSchema)

module.exports = Post;