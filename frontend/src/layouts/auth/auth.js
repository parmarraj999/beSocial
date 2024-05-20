import React from 'react'
import "./auth.css"
import Welcome from '../welcome/welcome'

function Auth() {
  return (
    <div className='auth-container'>
      {/* <Welcome/> */}
      <div className='auth-wrapper' >
        <div className='auth-box'>
          <h1></h1>
        </div>
        <div className='auth-btn-container'>
          <button className='first-btn'>Log In</button>
          <button>Create Account</button>
        </div>
      </div>

    </div>
  )
}

export default Auth
//#eaecd1