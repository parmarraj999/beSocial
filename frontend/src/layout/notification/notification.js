import React, { useContext, useEffect, useState } from 'react'
import './notification.css'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../../context/context'
function Notification() {

  const userData = useContext(UserDataContext).userData;
  const dataArray = userData.notifications;
  const [data,setData] = useState()

  useEffect(()=>{
    if(dataArray){
      setData([...dataArray].reverse())
    }
  })

  return (
    <div className='notification-container'>
      <div className='notification-wrapper' >
        <div className='notification-header' >
          <h2>Activities</h2>
        </div>
        <div className='notification-items-list' >
          {
            data?.map((data) => {
              return (
                <>
                  {
                    data.notificationType === "Like" ?
                      <div className='like-notification' >
                        <div className='LikeSvg'>
                          <svg style={{ width: "25px", color: "#292929" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path></svg>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", gap: ".1rem", width: "100%" }}>
                          <h4><Link style={{ textDecoration: "none", color: "#80ff00" }} to={"/user-profile/" + data.userId}>{data.username}</Link> Like your post</h4>
                          <p style={{ fontSize: '14px', display: "flex", alignItems: "center", gap: '.3rem', color: "rgba(0,0,0,.5)", fontWeight: "600" }}>
                            <svg style={{ width: '15px', color: "rgba(0,0,0,.5)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z"></path></svg> {data.timeData}
                          </p>
                        </div>
                        <div className='post-like-notification' style={{ minWidth: "50px" }}>
                          <img src={data.postUrl} />
                        </div>
                      </div> : ""
                  }
                  {/* comment text  */}
                  {
                    data.notificationType === "Comment" ?
                      <div className='comment-notification' >
                        <div style={{ display: "flex", flexDirection: 'column', alignItems: 'center' }}>
                          <div className='LikeSvg'>
                            <svg style={{ width: "25px", color: "#292929" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455ZM7 10C7 12.7614 9.23858 15 12 15C14.7614 15 17 12.7614 17 10H15C15 11.6569 13.6569 13 12 13C10.3431 13 9 11.6569 9 10H7Z"></path></svg>
                          </div>
                          <div className='post-like-notification' style={{ marginTop: ".2rem", width: "30px", height: "30px" }}>
                            <img src={data.postUrl} />
                          </div>
                        </div>
                        <div className='comment-notification-text' >
                          <h4><Link style={{ textDecoration: "none", color: "#80ff00" }} to={"/user-profile/" + data.userId}>{data.username}</Link> comment on your post</h4>
                          <div className='comment-text-box' >
                            <p style={{ fontSize: '14px', display: "flex", alignItems: "center", gap: '.3rem', color: "rgba(0,0,0,.5)", fontWeight: "600" }}><svg style={{ width: '15px', color: "rgba(0,0,0,.5)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z"></path></svg> {data.timeData}</p>
                            <h4>{data.commentText}</h4>
                          </div>
                        </div>
                      </div> : ""
                  }

                  {
                    data.notificationType === "Follow" ?
                      <div className='follow-notification'>
                        <div className='LikeSvg'>
                          <svg style={{ width: "25px", color: "#292929", justifyContent: "none" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18 17V14H20V17H23V19H20V22H18V19H15V17H18Z"></path></svg>
                        </div>
                        <div style={{width:"100%"}}>
                          <h4><Link style={{ textDecoration: "none", color: "#80ff00" }} to={"/user-profile/" + data.userId}>{data.username}</Link> Start following you</h4>
                        </div>
                        <div className='post-like-notification' style={{ minWidth: "50px", border: "1px solid grey" }}>
                          <img src={data.profile_picture} />
                        </div>
                      </div> : ""
                  }
                </>
              )
            })
          }

        </div>
      </div>
    </div>
  )
}

export default Notification

{/* <svg style={{ width: '15px', color: "rgba(0,0,0,.5)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z"></path></svg> */ }

{/* <div className='like-notification' >
            <div className='LikeSvg'>
              <svg style={{ width: "25px", color: "#292929" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853Z"></path></svg>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: ".1rem", width: "100%" }}>
              <h4><span style={{ fontWeight: "800" }}>User</span> Like your post</h4>
              <p style={{ fontSize: '14px', display: "flex", alignItems: "center", gap: '.3rem', color: "rgba(0,0,0,.5)", fontWeight: "600" }}>
                <svg style={{ width: '15px', color: "rgba(0,0,0,.5)" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM13 12H17V14H11V7H13V12Z"></path></svg> 09:24 AM
              </p>
            </div>
            <div className='post-like-notification' style={{ minWidth: "50px" }}>
              <img src='https://firebasestorage.googleapis.com/v0/b/besocial-b3064.appspot.com/o/posts%2FWhatsApp%20Image%202024-08-01%20at%2014.50.54_097c2184.jpg?alt=media&token=140a8537-ccbf-4c9e-a168-ca2e6633fb6f' />
            </div>
          </div> */}