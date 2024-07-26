const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
        required: true
    },

    username: {
        type: String,
        unique: true
    },

    bio:{
     type : String   
    },

    password: String,

    profile_picture: {
        type : String
    },

    followers: [
        {
            followerId : String,
            followerUsername:String,
            followerName: String,
        }
    ],

    following: [
        {
            followingId : String,
            followingUsername:String,
            followingName : String,
        }
    ],

    posts : [
        {
           postId: String
        }
    ],
    search: [
        {
            Name : String ,
        }
    ]
},
{ timestamps: true }
)

const User = mongoose.model("User",userSchema);
module.exports = User;