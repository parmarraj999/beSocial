const mongoose = require("mongoose");

const storySchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        required: true,
    },
    userName : {
        type : String,
        required: true
    },
    userProfile : {
        type: String,
    }
})