const express = require("express")
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const userModel = require("./model/user");

const app = express();
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/beSocial",{
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(()=>
  console.log("connected to db")
)
  
app.post("/auth/signup",(req,res)=>{
  const { uid, name, username, email, password } = req.body;
  userModel.create({
    uid  : uid,
    name : name,
    username : username,
    email : email,
    password : password,
    bio : "null",
  })
  console.log("signed up")
  
})


app.listen(5000,()=>{
  console.log("sever is running on port 5000")
})