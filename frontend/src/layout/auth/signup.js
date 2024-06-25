import React, { useContext, useState } from 'react'
import axios from "axios"
import { v4 as uuidv4 } from "uuid"
import { useNavigate } from "react-router-dom"
import { UserDataContext, UserIDContext } from '../../context/context'

function Signup({setCurrUi}) {

  const [name,setName] = useState("")
  const [username, setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [confirmPassword,setConfirmPassword] = useState("")
  const [email,setEmail] = useState("")
  const [errorMsg,setErrorMsg] = useState("");
  const [succMsg,setSuccMsg] = useState("");

  const userID = useContext(UserIDContext);
  const userData = useContext(UserDataContext);
  
  const navigate = useNavigate()
  
  const hanldeCreateUser = () => {
    if(confirmPassword !== password){
        setErrorMsg("Password not Match")
        return
      }
      if( name && password && username && email ){
        
      const uniqueId = username + uuidv4();
        axios.post("http://localhost:5000/auth/signup",{
          uid : uniqueId,
          name : name,
          username : username,
          email: email,
          password: password,
        })
        .then(result=>{
          userData.setUserData(result.data)
          window.localStorage.setItem("userId",result.data._id)
        })
        console.log(uuidv4())
        setSuccMsg("Account Created")
        setErrorMsg("")
        userID.setUserID(uniqueId)
        window.localStorage.setItem("isLogIn",true)
        setTimeout(() => {
          navigate("/")
        }, 3000);
    }else{
      setErrorMsg("Fill All the Fields")
      return
    }
  }  

  return (
    <div className='auth-wrapper log-grid' >
    <div className='auth-header' >
      <h2>Sign Up</h2>
      <img src='../../../image/bottle.jpeg' />
    </div>
    <div className='auth-input-container' >
      <input placeholder='Username' type='text' className='auth-input' onChange={(e)=>setUsername(e.target.value)} />
      <input placeholder='Full Name' type='text' className='auth-input' onChange={(e)=>setName(e.target.value)} />
      <input placeholder='Email' type='text' className='auth-input' onChange={(e)=>setEmail(e.target.value)} />
      <input placeholder='Password' type='password' className='auth-input' onChange={(e)=>setPassword(e.target.value)} />
      <input placeholder='Confirm Password' type='password' className='auth-input' onChange={(e)=>setConfirmPassword(e.target.value)} />
      {
        succMsg ? 
        <p className='succ-message'> {succMsg}</p> : ""
      }
      {
        errorMsg ?
      <p className='error-message'> {errorMsg}</p> : ""
      }
    </div>
    <div className='auth-btn' >
      <button className='sign-btn' onClick={hanldeCreateUser}>
        Create Account
      </button>
      <button className='log-btn' onClick={()=>setCurrUi("login")} >
        Already Have Account ?
      </button>
    </div>
  </div>
  )
}

export default Signup