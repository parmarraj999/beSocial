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
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],

    posts : [
        {
            type : String
            // ref : 'Post'
        }
    ],

    search : [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]   
},
{ timestamps: true }
)

const User = mongoose.model("User",userSchema);
module.exports = User;