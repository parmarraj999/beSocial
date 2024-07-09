import React from 'react'
import './userList.css'

function UserExpend() {
  return (
    <div className="user-expand-container" >
        <div className='user-expand-card' >
          <h2>username</h2>
          <div className='user-expand-img'>
            <img/>
          </div>
          <button>
            Visit User
          </button>
        </div>
    </div>
  )
}

export default UserExpend