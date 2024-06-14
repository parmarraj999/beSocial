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


app.post("/auth/login",(req,res)=>{
  const email = req.body.email;
  const password = req.body.password;
  userModel.findOne({email:email,password : password})
  .then((user)=>{
      if(user){
          res.json(user);
          // if(user.password === password){
          //     res.json("successfull");
          //     console.log("user successfull")
          // }
          // else{
          //     res.json("password is incorrect")
          // }
      }else{
          res.json("No user Found !")
      }
  })
  .catch((err)=>{
      console.log(err)
  })
})



app.listen(5000,()=>{
  console.log("sever is running on port 5000")
})