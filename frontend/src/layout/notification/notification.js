import React from 'react'
import './notification.css'

function Notification() {
  return (
    <div className='notification-container'>
        <div className='notification-wrapper' >
          <div className='notification-header' >
            <h2>Activities</h2>
          </div>
          <div className='notification-items-list' >
            <div className='like-notification' >
              <div className='LikeSvg'>
              <svg style={{width:"25px",color:"black"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path></svg>
              </div>
              <h4><span style={{fontWeight:"800"}}>User</span> Like your post</h4>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Notification