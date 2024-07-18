const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    postedBy :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
    },
    userId : {
       type : mongoose.Schema.Types.ObjectId,
       required: true,
    },
    creatorName: {
        type: String,
        required : true,
    },
    userProfile : {
        type : String
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
    like :[
        {
            userName : String,
            userId : String
        }
    ],
    comments : [
        {
            userId : mongoose.Schema.Types.ObjectId,
            userName : String,
            commentText : String,
            profileImg : String
        }
    ]
},
{ timestamps : true }
)

const Post = mongoose.model('Post',postSchema)

module.exports = Post;