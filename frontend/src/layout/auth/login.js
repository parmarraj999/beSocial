import React from 'react'
import './auth.css' 
import Welcome from '../welcome/welcome'

function Login({setCurrUi}) {
  return (
    <div className='auth-wrapper log-grid' >
      <div className='auth-header' >
        <h2>Log In</h2>
        <img src='../../../image/bottle.jpeg' />
      </div>
      <div className='auth-input-container' >
        <input placeholder='Email' type='text' className='auth-input' />
        <input placeholder='Password' type='password' className='auth-input' />
      </div>
      <div className='auth-btn' >
        <button className='log-btn' >
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