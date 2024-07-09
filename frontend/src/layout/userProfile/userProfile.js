import React, { useEffect, useState } from 'react'
import "./userProfile.css"
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useGSAP } from "@gsap/react"
import gsap from 'gsap';
import UserPosts from './userPosts/userPost';
import Loader from '../welcome/loader';

function UserProfilePage() {

  const { id } = useParams();
  const [data, setData] = useState();
  const [loader, setLoader] = useState(true)

  const handleUserProfile = () => {
    axios.get("http://localhost:5000/user/" + id)
      .then((user) => {
        console.log(user.data)
        setData(user.data[0])
      })
  }

  // get user post and send to userpost page 

  const [postData, setPostData] = useState([])
  const getUserPost = () => {
    axios.get("http://localhost:5000/getUserPost/" + id)
      .then((result) => {
        setPostData(result.data)
        setLoader(false)
      })
  }

  useEffect(() => {
    handleUserProfile();
    getUserPost();
    console.log(data)
  }, [])

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1)
  }



  useGSAP(() => {
    gsap.to(".profile-circle2", {
      border: '1px solid #80ff00'
    })
    gsap.to(".profile-circle", {
      border: '2px solid #80ff00',
      delay: .2
    })
    gsap.to(".profile-pic", {
      border: '3px solid #80ff00',
      delay: .4
    })
  })

  return (
    <div className='user-page-container' >
      {
        loader ?
          <Loader /> :
          <>
            <div className='user-page-header' onClick={handleBack} >
              <div className='backAndUser' style={{ display: "flex", alignItems: "center" }}>
                <svg style={{ width: "40px" }} className="back-icon-nav" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
              </div>
              <h3 className='user-name-user-profile'>{data?.username}</h3>
              <div></div>
            </div>
            <div className='user-page-wrapper' >
              <div className='profile-box-container' >
                <div className='profile-box'>
                  <h4>Followers</h4>
                  <h2>{data?.followers?.length}</h2>
                </div>
                <div className='profile-box'>
                  <div className='profile-circle2' >
                    <div className='profile-circle' >
                      <div className='profile-pic' >
                        <img src={data?.profile_picture} /> :
                      </div>
                    </div>
                  </div>
                  <h1 className='profile-name'>{data?.name}</h1>
                  {
                    data?.bio === "null" ? "" :
                      <p>{data?.bio}</p>
                  }
                </div>
                <div className='profile-box'>
                  <h4>Following</h4>
                  <h2>{data?.following?.length}</h2>
                </div>
              </div>
              <UserPosts postData={postData} userData={data} />
            </div>
          </>
      }
    </div>

  )
}

export default UserProfilePage
