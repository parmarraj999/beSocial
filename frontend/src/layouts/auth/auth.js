import React, { useState } from 'react'
import "./auth.css"
import Welcome from '../welcome/welcome'
import Login from './Login'
import Signup from './signup'
import { useGSAP } from '@gsap/react'

function Auth() {
  
  useGSAP(()=>{
   
  })

  const [form,setForm] = useState("")

  return (
    <div className='auth-container'>
      <div className='auth-wrapper' >
        <div className='auth-box'>
          <h1>Be<span>Social</span></h1>
          <div className='auth-img' >
          </div>
        </div>
        <div className='auth-btn-container'>
          <button className='first-btn' onClick={()=>setForm("login")}>Log In</button>
          <button className='second-btn' onClick={()=>setForm("signup")}><h3>Create Account</h3></button>
        </div>
      </div>

      <Welcome/>
     {
      form === "login" ?
      <Login setForm={setForm} /> : ""
     }
     {
      form === "signup" ?
        <Signup setForm={setForm} /> :""
     }
    </div>
  )
}

export default Auth
//#eaecd1