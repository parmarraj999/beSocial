const express = require("express")
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./model/user");
const Post = require("./model/post")

const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/beSocial")
  .then(() =>
    console.log("connected to db")
  )

app.post("/auth/signup", (req, res) => {
  const { uid, name, username, email, password } = req.body;
  User.create({
    uid: uid,
    name: name,
    username: username,
    email: email,
    password: password,
    bio: "null",
    profile_picture: "",
    search: {}
  })
    .then((user) => {
      res.json(user)
      console.log("signed up")
    })

})


app.post("/auth/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email: email, password: password })
    .then((user) => {
      if (user) {
        res.json(user);
        // if(user.password === password){
        //     res.json("successfull");
        //     console.log("user successfull")
        // }
        // else{
        //     res.json("password is incorrect")
        // }
      } else {
        res.json("No user Found !")
      }
    })
    .catch((err) => {
      console.log(err)
    })
})

app.put("/add-profile/:id", (req, res) => {
  const { id } = req.params;
  const { profile_picture } = req.body;
  User.findByIdAndUpdate({ _id: id }, { profile_picture: profile_picture })
    .then(result => res.json(result))
    .catch(err => res.json(err))
})


app.get("/user/:id", (req, res) => {
  const { id } = req.params;
  User.find({ _id: id })
    .then(result => res.json(result))
    .catch(error => res.json(error))
})

app.post("/addPost/:id", async (req, res) => {
  const { id } = req.params;
  const { caption, postedBy, mediaType, mediaUrl, creatorName, userProfile, comment } = req.body;

  const post = await Post.create({
    postedBy: postedBy,
    userId: id,
    creatorName: creatorName,
    userProfile : userProfile,
    caption: caption,
    mediaUrl: mediaUrl,
    mediaType: mediaType,
    comments : {}
  })
    .then((user) => {
      res.json(user)
      console.log("Data added")
    })
})


app.get('/getUserPost/:id', (req, res) => {
  const { id } = req.params;
  Post.find({ postedBy: id })
    .then(result => res.json(result))
    .catch(error => res.json(error))

})

app.post("/getSinglePost/:id",(req,res)=>{
  const {id} = req.params;
  Post.find({_id : id})
  .then((result)=>{
    res.json(result)
    console.log(result)
  })
})


app.put('/follow/:id', async (req, res) => {
  const { id } = req.params;
  const followerUsername = req.body.followerUsername;
  const followerId = req.body.followerId
  try {
    await User.findByIdAndUpdate({ _id: id }, { $push: { followers: { followerId: id, followerUsername: followerUsername } } })

    await User.findByIdAndUpdate({ _id: followerId }, { $push: { following: { followingId: id, followingUsername: followerUsername } } })
      .then((result) => {
        res.json(result)
        console.log(result)
      })
  } catch (error) {
    console.log(error)
  }
})
app.put('/unfollow/:id', async (req, res) => {
  const { id } = req.params;
  const followerUsername = req.body.followerUsername;
  const followerId = req.body.followerId
  try {
    await User.findByIdAndUpdate({ _id: id }, { $pull: { followers: { followerId: id, followerUsername: followerUsername } } })

    await User.findByIdAndUpdate({ _id: followerId }, { $pull: { following: { followingId: id, followingUsername: followerUsername } } })
      .then((result) => {
        res.json(result)
        console.log(result)
      })
  } catch (error) {
    console.log(error)
  }
})

app.delete("/deletePost/:id", (req, res) => {
  const { id } = req.params;
  Post.findByIdAndDelete({ _id: id })
    .then((result) => {
      res.json(result)
    })
})

app.put("/search/:id", async (req, res) => {
  const { id } = req.params;
  const { searchData } = req.body;
  try {
    const result = await User.findByIdAndUpdate({ _id: id }, { $push: { search: { Name: searchData } } })
    console.log(result)
  } catch (error) {
    console.log(error)
  }
})

app.get("/getSearchList/:id", (req, res) => {
  const { id } = req.params;
  User.find({ _id: id })
    .then(result => { res.json(result) }
    )
    .catch(error => res.json(error))
})

app.put("/deleteRecent/:id", async (req, res) => {
  const { id } = req.params;
  const { deleteData } = req.body;
  try {
    const result = await User.findOneAndUpdate({ _id: id }, { $pull: { search: { Name: deleteData } } }, { new: true })
    console.log(result)
  } catch (error) {
    console.log(error)
  }
})

app.post("/getSearchUser", async (req, res) => {
  const { searchText } = req.body;
  console.log("data", searchText)
  await User.find({ username: { $regex: searchText, $options: 'i' } })
    .then(user => {
      res.json(user)
      console.log(user)
    })
    .catch((error) => {
      console.log(error)
    })
})

setTimeout(() => {
  app.post("/getAllPosts", async (req, res) => {

    const data = req.body;
    // console.log(data)
    try {
      const posts = await Post.find({ userId: { $in: data } });
      res.json(posts);
      // console.log(posts)
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching posts' });
    }
  })
}, 5000)

app.put("/comment/:id",async(req,res)=>{
  const {id} = req.params;
  const {userId ,userName, commentText, profileImg } = req.body;
  await Post.findByIdAndUpdate({ _id: id }, { $push: {  comments: {userId: userId, userName: userName, commentText : commentText, profileImg : profileImg } } })
  .then(result => {
    res.json(result)
    console.log(result)
  })
  .catch(error=>{
    console.log(error)
  })
})

app.put("/commentDelete/:id",async(req,res)=>{
  const {id} = req.params;
  const {userId ,userName, commentText, profileImg } = req.body;
  await Post.updateOne({ _id: id }, { $pull: {  comments: {userId: userId, userName: userName, commentText : commentText, profileImg : profileImg } } })
  .then(result => {
    res.json(result)
    console.log("delete")
  })
  .catch(error=>{
    console.log(error)
  })
})

app.put("/like/:id",async(req,res)=>{
  const { userId, userName } = req.body;
  const { id } = req.params;
  await Post.findByIdAndUpdate({ _id: id }, { $push: { like : {
    userId : userId,
    userName : userName,
  }} })
  .then(result => {
    res.json(result)
    console.log(result)
  })
  .catch(error=>{
    console.log(error)
  })
})

app.listen(5000, () => {
  console.log("sever is running on port 5000")
})
// await Post.find({
//   userId : { $in: followingIds}
// }).then((result)=>{
//   res.json(result)
//   console.log(result)
// })
// const data = [
//   "668e727f75f2c35d0014abad",
//   "668d43f81d54ab8ca4f6c83a"
// ]