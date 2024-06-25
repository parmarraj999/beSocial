import React, { useContext, useState } from 'react'
import "./userCenter.css"
import { UserDataContext } from '../../../context/context'
import UploadPic from '../uploadPic/uploadPic'
import { Link } from 'react-router-dom'
import DeletePop from '../deletePop/deletePop'

function UserCenter({ setShowUserCenter }) {

  const userData = useContext(UserDataContext)

  const [showUpload, setShowUpload] = useState(false)
  const [showDelete,setShowDelete] = useState(false)

  return (
    <div className='user-center-container' >
      {
        showUpload ? <UploadPic id={userData.userData._id} /> : ""
      }
      {
        showDelete ? <DeletePop setShowDelete={setShowDelete} /> : ""
      }
      <div className='user-center-header' >
        <Link to="/profile">
          <svg className="back-icon-nav" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
        </Link>
        <h3>User Center</h3>
        <div></div>
      </div>
      <div className='user-center-wrapper' >
        <div className='user-center-profile' >
          <div className='user-center-profile-container' >
            {/* <img src={userData.userData.profile_picture} /> */}
            <img src={userData.userData.profile_picture} />
            <div onClick={() => setShowUpload(true)} className='change-btn' >
              <svg style={{ width: "28px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
            </div>
          </div>
          <h2 onClick={()=>setShowDelete(true)} >Delete Profie Image</h2>
        </div>
        {/* <div className='user-center-nav' >
          <h5>Profile</h5>
        </div> */}
        <hr />

        <div className='items-container' >
          <div className='items' >
            <h4>Identity verification</h4>
            <div>
              <svg className='user-icons' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
            </div>
          </div>

          <div className='items' >
            <h4>Country</h4>
            <div style={{display:"flex",gap:".4rem",alignItems:"center"}}>
              <p>India</p>
              <svg className='user-icons' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
            </div>
          </div>

          <div className='items' >
            <h4>UID</h4>
            <div style={{display:"flex",gap:".4rem",alignItems:"center"}}>
              <p>{userData.userData._id}</p>
            </div>
          </div>

          <div className='items' >
            <h4>Email</h4>
            <div style={{display:"flex",gap:".4rem",alignItems:"center"}}>
            <p>{userData.userData.email}</p>
              <svg className='user-icons' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
            </div>
          </div>

          <div className='items' >
            <h4>Username</h4>
            <div style={{display:"flex",gap:".4rem",alignItems:"center"}}>
            <p>{userData.userData.username}</p>
              <svg className='user-icons' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
            </div>
          </div>

          <div className='items' >
            <h4>Bio</h4>
            <div style={{display:"flex",gap:".4rem",alignItems:"center"}}>
              <svg className='user-icons' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserCenter