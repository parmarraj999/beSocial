import React, { useContext, useEffect, useState } from 'react'
import "./userProfile.css"
import { useNavigate, useParams } from 'react-router'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useGSAP } from "@gsap/react"
import gsap from 'gsap';
import UserPosts from './userPosts/userPost';
import Loader from '../welcome/loader';
import { UserDataContext } from '../../context/context';
import PostDetail from '../home/postDetail/postDetail';

function UserProfilePage() {

  const { id } = useParams();
  const [data, setData] = useState();
  const [loader, setLoader] = useState(true)
  const [showAnimeImg, setShowAnimeImg] = useState(true)

  const myDataContext = useContext(UserDataContext)
  const myData = myDataContext.userData

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

  const tl = gsap.timeline();
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
    gsap.to(".anime-pop-img", {
      x: 0,
      y: 100,
      width: "95px",
      height: "95px"
    })
  })

  useEffect(() => {
    handleUserProfile();
    getUserPost();
    // console.log(data)
  }, [])

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1)
  }

  console.log(myData.following)

  const isFollowing = (username, id) => {
    const following = myData.following
    return following.some(follow => follow.followingUsername === username && follow.followingId === id);
  };

  // to follow user 

  const userData = useContext(UserDataContext)

  const userIdbyLocalStorage = window.localStorage.getItem("userId")

  const handleFollow = (userId, userName,) => {
    axios.put("http://localhost:5000/follow/" + userId, {
      followerUsername: userName,
      followerId: myData._id
    }).then((result) => {
      console.log(result)
      axios.get("http://localhost:5000/user/" + userIdbyLocalStorage)
        .then((result) => {
          userData.setUserData(result.data[0])
        })
    })
      .catch(error => {
        console.log(error)
      })
    tl.from(".follow-pop", {
      y: -80,
      opacity: 0
    })
    tl.to(".follow-pop", {
      y: 100,
      opacity: 1,
      duration: .2
    })
    tl.to(".follow-pop", {
      width: "120px",
      height: "120px",
      duration: .4
    })
    tl.from(".follow-pop svg", {
      opacity: 0
    })
    tl.from(".follow-pop h4", {
      opacity: 0,
      delay: .2
    })
    tl.to(".follow-pop h4", {
      y: 20,
      opacity: 0,
      delay: .2
    })
    tl.to(".follow-pop", {
      width: "50px",
      height: "50px",
      duration: .4,
      delay: .4
    })
    tl.to(".follow-pop", {
      y: -80,
      opacity: 0
    })
    tl.from(".unfollow-btn", {
      opacity: 0,
      delay: 1
    })
    setTimeout(() => {
      handleUserProfile();
    }, 400);
  }

  const handleUnfollow = (userId, userName) => {
    console.log("clicked")
    axios.put("http://localhost:5000/unfollow/" + userId, {
      followerUsername: userName,
      followerId: myData._id
    }).then((result) => {
      console.log(result)
      axios.get("http://localhost:5000/user/" + userIdbyLocalStorage)
        .then((result) => {
          userData.setUserData(result.data[0])
          setTimeout(() => {
            handleUserProfile();
          }, 400);
        })
    })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div className='user-page-container' >
      {/* <PostDetail/> */}
      <div className='follow-pop' >
        <svg style={{ width: "40px", color: "#80ff00" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM17.7929 19.9142L21.3284 16.3787L22.7426 17.7929L17.7929 22.7426L14.2574 19.2071L15.6716 17.7929L17.7929 19.9142Z"></path></svg>
        <h4>Added</h4>
      </div>
      {
        loader ?
          <Loader /> :
          <>
            <div className='user-page-header' >
              <div onClick={handleBack} className='backAndUser' style={{ display: "flex", alignItems: "center" }}>
                <svg style={{ width: "40px" }} className="back-icon-nav" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
              </div>
              <h3 className='user-name-user-profile'>{data?.username}</h3>
              {!isFollowing(data.username, data._id) && (
                <div className='follow-btn' onClick={() => handleFollow(data?._id, data?.username)}>
                  <svg style={{ width: "25px", color: "black" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18 17V14H20V17H23V19H20V22H18V19H15V17H18Z"></path></svg>
                </div>
              )}
              {isFollowing(data.username, data._id) && (
                <div className='unfollow-btn' onClick={() => handleUnfollow(data?._id, data?.username)} >
                  <svg style={{ width: "25px", color: "white" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM19 17.5858L21.1213 15.4645L22.5355 16.8787L20.4142 19L22.5355 21.1213L21.1213 22.5355L19 20.4142L16.8787 22.5355L15.4645 21.1213L17.5858 19L15.4645 16.8787L16.8787 15.4645L19 17.5858Z"></path></svg>
                </div>
              )}
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
                        <img src={data?.profile_picture} />
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
            </div>
            <UserPosts postData={postData} userData={data} />
          </>
      }
    </div>

  )
}

export default UserProfilePage
