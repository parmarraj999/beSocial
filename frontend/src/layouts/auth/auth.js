import React, { useState } from 'react'
import "./auth.css"
import Welcome from '../welcome/welcome'
import Login from './Login'

function Auth() {
  
  const [form,setForm] = useState("login")

  return (
    <div className='auth-container'>
      {/* <Welcome/> */}
      <div className='auth-wrapper' >
        <div className='auth-box'>
          <h1>BeSocial</h1>
          <div className='auth-img' >
            
          </div>
        </div>
        <div className='auth-btn-container'>
          <button className='first-btn'>Log In</button>
          <button>Create Account</button>
        </div>
      </div>

      <Welcome/>
     {
      form === "login" ?
      <Login/> : ""
     }
    </div>
  )
}

export default Auth
//#eaecd1