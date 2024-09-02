const express = require("express")
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const User = require("./model/user");
const Post = require("./model/post");
const Feedback = require("./model/feedback");
const cron = require('node-cron');
require("dotenv").config();

const app = express();
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  optionSuccessStatus: 200
}
app.use(cors());

app.use(express.json())

// mongoose.connect("mongodb://localhost:27017")
// mongoose.connect("mongodb+srv://rajparmar:Forget5122@besocial.lhivreq.mongodb.net/beSocial")
mongoose.connect("mongodb+srv://rajparmar:Forget5122@besocial.lhivreq.mongodb.net/?retryWrites=true&w=majority&appName=beSocial")
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

app.delete("/deleteAccount/:id", async (req, res) => {
  const { id } = req.params
  User.findByIdAndDelete({_id : id})
    .then(user => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({
        message: 'User deleted successfully'
      });
      console.log('delete user')
    })

    Post.deleteMany({userId : id })
    .then(result=>{
      console.log("post delete successfull")
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
    .then(result => {
      res.json(result)
    })
    .catch(error => res.json(error))
})

app.post("/addPost/:id", async (req, res) => {
  const { id } = req.params;
  const { caption, mediaType, mediaUrl, creatorName, userProfile, comment } = req.body;

  const post = await Post.create({
    userId: id,
    creatorName: creatorName,
    userProfile: userProfile,
    caption: caption,
    mediaUrl: mediaUrl,
    mediaType: mediaType,
    comments: {}
  })
    .then((user) => {
      res.json(user)
      console.log("Data added")
    })
})


app.get('/getUserPost/:id', (req, res) => {
  const { id } = req.params;
  Post.find({ userId: id })
    .then(result => res.json(result))
    .catch(error => res.json(error))

})

app.post("/getSinglePost/:id", (req, res) => {
  const { id } = req.params;
  Post.find({ _id: id })
    .then((result) => {
      res.json(result)
      console.log(result)
    })
})


app.put('/follow/:id', async (req, res) => {
  const { id } = req.params;
  const followerUsername = req.body.followerUsername;
  const followerId = req.body.followerId
  const followerName = req.body.followerName
  const { followingId, followingUsername, followingName, profile_picture, timeDate } = req.body;
  try {
    await User.findByIdAndUpdate({ _id: id }, { $push: { followers: { followerId: followerId, followerUsername: followerUsername, followerName: followerName } } })

    await User.findByIdAndUpdate({ _id: followerId }, { $push: { following: { followingId: followingId, followingUsername: followingUsername, followingName: followingName } } })
      .then((result) => {
        res.json(result)
        console.log(result)
      })
    await User.findByIdAndUpdate({ _id: followingId }, {
      $push: {
        notifications: {
          notificationType: "Follow",
          userId: followerId,
          username: followerUsername,
          profile_picture: profile_picture,
          timeData: timeDate
        }
      }
    })
  } catch (error) {
    console.log(error)
  }
})
app.put('/unfollow/:id', async (req, res) => {
  const { id } = req.params;
  const followerUsername = req.body.followerUsername;
  const followerId = req.body.followerId;
  const followerName = req.body.followerName;
  const { followingId, followingUsername, followingName, profile_picture, timeDate } = req.body;
  try {
    await User.findByIdAndUpdate({ _id: id }, { $pull: { followers: { followerId: followerId, followerUsername: followerUsername, followerName: followerName } } })

    await User.findByIdAndUpdate({ _id: followerId }, { $pull: { following: { followingId: followingId, followingUsername: followingUsername, followingName: followingName } } })
      .then((result) => {
        res.json(result)
        console.log(result)
      })

    await User.findByIdAndUpdate({ _id: followingId }, {
      $pull: {
        notifications: {
          notificationType: "Follow",
          userId: followerId,
          username: followerUsername,
          profile_picture: profile_picture,
          timeData: timeDate
        }
      }
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
    })
    .catch((error) => {
      console.log(error)
    })
})

app.get("/getRecentSignup", async (req, res) => {
  User.find({}).limit(15)
    .then(result => {
      console.log(result)
      res.json(result)
    })
})

//get following post only
app.post("/getFollowingPosts", async (req, res) => {

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

// get all post 
app.post("/getAllPosts", async (req, res) => {

  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching posts' });
  }
})

app.put("/comment/:id", async (req, res) => {
  const { id } = req.params;
  const { userId, userName, commentText, profileImg, authorId, postUrl, timeDate } = req.body;
  await Post.findByIdAndUpdate({ _id: id }, { $push: { comments: { userId: userId, userName: userName, commentText: commentText, profileImg: profileImg } } })
    .then(result => {
      res.json(result)
      console.log(result)
    })
    .catch(error => {
      console.log(error)
    })
  await User.findByIdAndUpdate({ _id: authorId }, {
    $push: {
      notifications: {
        notificationType: "Comment",
        userId: userId,
        username: userName,
        postId: id,
        commentText: commentText,
        postUrl: postUrl,
        timeData: timeDate
      }
    }
  })
})

app.put("/commentDeleteOwn/:id", async (req, res) => {
  const { id } = req.params;
  const { userId, userName, commentText, profileImg, authorId, postUrl, timeDate } = req.body;
  await Post.updateOne({ _id: id }, { $pull: { comments: { userId: userId, userName: userName, commentText: commentText, profileImg: profileImg } } })
    .then(result => {
      res.json(result)
      console.log("delete")
    })
    .catch(error => {
      console.log(error)
    })
})
app.put("/commentDelete/:id", async (req, res) => {
  const { id } = req.params;
  const { userId, userName, commentText, profileImg, authorId, postUrl, timeDate } = req.body;
  await Post.updateOne({ _id: id }, { $pull: { comments: { userId: userId, userName: userName, commentText: commentText, profileImg: profileImg } } })
    .then(result => {
      res.json(result)
      console.log("delete")
    })
    .catch(error => {
      console.log(error)
    })
  await User.findByIdAndUpdate({ _id: authorId }, {
    $pull: {
      notifications: {
        notificationType: "Comment",
        userId: userId,
        username: userName,
        postId: id,
        commentText: commentText,
        postUrl: postUrl,
        timeData: timeDate
      }
    }
  })
})

app.put("/like/:id", async (req, res) => {
  const { userId, userName, authorId, postUrl, timeDate } = req.body;
  const { id } = req.params;
  await Post.findByIdAndUpdate({ _id: id }, {
    $push: {
      like: {
        userId: userId,
        userName: userName,
      }
    }
  })
    .then(result => {
      res.json(result)
      console.log(result)
    })
    .catch(error => {
      console.log(error)
    })
  await User.findByIdAndUpdate({ _id: authorId }, {
    $push: {
      notifications: {
        notificationType: "Like",
        userId: userId,
        username: userName,
        postId: id,
        postUrl: postUrl,
        timeData: timeDate
      }
    }
  })
})

app.put("/unlike/:id", async (req, res) => {
  const { userId, userName, authorId, postUrl, timeDate } = req.body;
  const { id } = req.params;
  await Post.findByIdAndUpdate({ _id: id }, {
    $pull: {
      like: {
        userId: userId,
        userName: userName,
      }
    }
  })
    .then(result => {
      res.json(result)
      console.log(result)
    })
    .catch(error => {
      console.log(error)
    })
  await User.findByIdAndUpdate({ _id: authorId }, {
    $pull: {
      notifications: {
        notificationType: "Like",
        userId: userId,
        username: userName,
        postId: id,
        postUrl: postUrl,
        timeData: timeDate
      }
    }
  })
})

// delete notification after 24 hours

cron.schedule('0 0 * * *', async () => { // Runs every day at midnight
  try {
    // Find documents with array elements close to the 24-hour threshold
    const documentsToUpdate = await User.find({
      'notifications': {
        $elemMatch: { createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) } }
      }
    });

    for (const doc of documentsToUpdate) {
      doc.user = doc.user.filter(item => item.createdAt >= new Date(Date.now() - 24 * 60 * 60 * 1000));
      await doc.save();
    }
  } catch (error) {
    console.error('Error deleting array elements:', error);
  }
});

// feedback section

app.post("/add-feedback", async (req, res) => {
  const { userId, username, name, feedback, uploadDate, feedbackType, userProfile } = req.body;
  await Feedback.create({
    userId: userId,
    username: username,
    name: name,
    userProfile: userProfile,
    feedback: feedback,
    feedbackType: feedbackType,
    uploadDate: uploadDate,
    done: false
  })
    .then((result) => {
      res.json(result)
    })
})

app.get("/get-feedbacks", async (req, res) => {
  Feedback.find({})
    .then(result => {
      res.json(result)
    })
    .catch(error => {
      console.log(error)
      res.json({ message: "feedback not found" })
    })
})

app.delete("/delete-feedback/:id", async (req, res) => {
  const { id } = req.params;
  Feedback.findByIdAndDelete({ _id: id })
    .then((result) => {
      res.json(result)
    })

})

app.listen(5000, () => {
  console.log("sever is running on port 5000")
})
