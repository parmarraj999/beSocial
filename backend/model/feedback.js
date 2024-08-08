const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
    userId: {
        type : mongoose.Schema.Types.ObjectId,
        required: true
    },
    username : {
        type : String,
        required : true,
    },
    name : {
        type : String,
        required: true
    },
    feedback: {
        type: String,
        required: true,
    },
    uploadDate : {
        type : String,
    },
    done: {
        type: Boolean
    }
})

const Feedback = mongoose.model("Feedback",feedbackSchema)

module.exports = Feedback;