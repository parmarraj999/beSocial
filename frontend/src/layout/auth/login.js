import React, { useContext, useState } from 'react'
import './auth.css' 
import Welcome from '../welcome/welcome'
import axios from 'axios';
import { useNavigate } from 'react-router';
import { UserDataContext } from '../../context/context';

function Login({setCurrUi}) {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const [errorMsg,setErrorMsg] = useState("");
  const [succMsg,setSuccMsg] = useState("");

  const navigate = useNavigate()
  const userData = useContext(UserDataContext)

  const handleLogin = () => {
    if(email && password){

      axios.post("http://localhost:5000/auth/login",{
        email : email,
        password : password
      })
      .then(result => {
        if(result.data){
          window.localStorage.setItem("isLogIn",true)
          setSuccMsg("Welcome"+ " " + result.data.name )
          console.log(result.data)
          userData.setUserData(result.data)
          setErrorMsg("")
          setTimeout(() => {
            navigate("/")
          }, 3000);
        }
        if(result.data === "No user Found !"){
          setErrorMsg("Email Or Password is Incorrect")
          setSuccMsg("")
        }
      })
    }else{
      setErrorMsg("Fill all The fields")
    }
  }

  return (
    <div className='auth-wrapper log-grid' >
      <div className='auth-header' >
        <h2>Log In</h2>
        <img src='../../../image/bottle.jpeg' />
      </div>
      <div className='auth-input-container' >
        <input placeholder='Email' type='text' className='auth-input' onChange={(e)=>setEmail(e.target.value)} />
        <input placeholder='Password' type='password' className='auth-input' onChange={(e)=>setPassword(e.target.value)} />
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
        <button className='log-btn' onClick={handleLogin}>
          Log In
        </button>
        <button className='sign-btn' onClick={()=>setCurrUi("signup")} >
          Don't Have any Account ?
        </button>
      </div>
      <Welcome/>
    </div>
  )
}

export default Login