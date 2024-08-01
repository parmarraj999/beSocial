import React from 'react'
import './notification.css'
import { Link } from 'react-router-dom'
function Notification() {
  return (
    <div className='notification-container'>
      <div className='notification-wrapper' >
        <div className='notification-header' >
          <h2>Activities</h2>
        </div>
        <div className='notification-items-list' >
          <Link className='like-notification' >
            <div className='LikeSvg'>
              <svg style={{ width: "25px", color: "#292929" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path></svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: ".1rem" }}>
              <h4><span style={{ fontWeight: "800" }}>User</span> Like your post</h4>
              <p style={{ fontSize: '14px', display: "flex", alignItems: "center", gap: '.3rem', color: "rgba(0,0,0,.5)", fontWeight: "600" }}>
                <svg style={{ width: '15px', color: "rgba(0,0,0,.5)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z"></path></svg> 09:24 AM
              </p>
            </div>
          </Link>

          <div className='comment-notification' >
            <div className='LikeSvg'>
              <svg style={{ width: "25px", color: "#292929" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455ZM7 10C7 12.7614 9.23858 15 12 15C14.7614 15 17 12.7614 17 10H15C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10H7Z"></path></svg>
            </div>
            <div className='comment-notification-text' >
                <h4>User comment on you post</h4>
                <div className='comment-text-box' >
                <p style={{ fontSize: '14px', display: "flex", alignItems: "center", gap: '.3rem', color: "rgba(0,0,0,.5)", fontWeight: "600" }}><svg style={{ width: '15px', color: "rgba(0,0,0,.5)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z"></path></svg> 09:35 AM</p>
                <h4>text of comment</h4>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Notification

{/* <svg style={{ width: '15px', color: "rgba(0,0,0,.5)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z"></path></svg> */}