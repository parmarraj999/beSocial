const Post = require("../model/post")

module.exports = {
    create : async(req,red)=>{
        const {id} = req.params;
        const {caption, mediaUrl,mediaType} = req.body;
        const post = await Post.create({
            caption : caption,
            mediaUrl: mediaUrl,
            mediaType : mediaType
        })
    }
}