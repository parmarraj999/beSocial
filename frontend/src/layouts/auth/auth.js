import React, { useState } from 'react'
import "./auth.css"
import Welcome from '../welcome/welcome'
import Login from './Login'

function Auth() {
  
  const [form,setForm] = useState("login")

  return (
    <div className='auth-container'>
      <Welcome/>
     {
      form === "login" ?
      <Login/> : ""
     }
    </div>
  )
}

export default Auth