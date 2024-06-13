import React from 'react'

function Signup({setCurrUi}) {
  return (
    <div className='auth-wrapper log-grid' >
    <div className='auth-header' >
      <h2>Sign Up</h2>
      <img src='../../../image/bottle.jpeg' />
    </div>
    <div className='auth-input-container' >
      <input placeholder='Username' type='text' className='auth-input' />
      <input placeholder='Full Name' type='text' className='auth-input' />
      <input placeholder='Email' type='text' className='auth-input' />
      <input placeholder='Password' type='password' className='auth-input' />
      <input placeholder='Confirm Password' type='password' className='auth-input' />
    </div>
    <div className='auth-btn' >
      <button className='sign-btn'>
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