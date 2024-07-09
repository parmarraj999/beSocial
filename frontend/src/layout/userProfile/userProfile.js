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

  // find follow or not 


  const handleIsFollow = () =>{
    axios.get("http://localhost:5000/isFollow/"+id,{
      username : data?.username,
      userId: data?._id
    })
    .then(res=>{
      console.log(res)
    })
  }

  useEffect(() => {
    handleUserProfile();
    getUserPost();
    handleIsFollow();
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
              <div>
              <svg style={{ width: "20px", color: "black" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18 17V14H20V17H23V19H20V22H18V19H15V17H18Z"></path></svg>
              </div>
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
