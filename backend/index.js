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
    profile_picture: ""
  })
    .then((user) => {
      res.json(user)
      console.log(user)
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

app.post("/addPost/:id",(req, res) => {
  const {id} = req.params;
  const title = req.body.title
  Post.create({
    userId : id,
    title : title
  })
  .then((user) => {
    res.json(user)
    console.log("Data added")
  })
})

app.listen(5000, () => {
  console.log("sever is running on port 5000")
})