import React, { useState } from 'react'
import "./auth.css"
import Welcome from '../welcome/welcome'
import Login from './Login'
// import doodle-one from 'public/image/doodle-one.png'


function Auth() {
  
  const [form,setForm] = useState("login")

  return (
    <div className='auth-container'>
      {/* <Welcome/> */}
      <div className='auth-wrapper' >
        <div className='auth-box'>
          
          
        </div>
        <div className='auth-btn-container'>
          <button className='first-btn'>Log In</button>
          <button className='second-btn'><h3>Create Account</h3></button>
        </div>
      </div>

      {/* <Welcome/> */}
     {
      form === "login" ?
      <Login/> : ""
     }
    </div>
  )
}

export default Auth
//#eaecd1