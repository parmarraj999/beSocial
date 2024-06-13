import React, { useState } from 'react'
import "./auth.css"
import Login from './login'
import Signup from './signup';

function Auth() {

  const [currUi, setCurrUi] = useState("");

  return (
    <>
      <div className='auth-container' >
        {
          currUi === "" ?
            <div className='auth-wrapper grid' >
              <img src='../../../image/auth-bg-2.jpg' />
              <div className='auth-content' >
                <h1>Welcome</h1>
                <h2>to</h2>
                <h1 style={{ color: "grey" }} >Logo</h1>
              </div>
              <button className='get-start-button' onClick={()=>setCurrUi("login")} >
                Get Started
              </button>
            </div>
            : ""
        }
        {
          currUi === "login" ? 
        <Login setCurrUi={setCurrUi} /> : ""
        }
        {
          currUi === "signup" ? <Signup setCurrUi={setCurrUi}/> : ""
        }
      </div>
    </>
  )
}

export default Auth