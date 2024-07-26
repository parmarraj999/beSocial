import React, { useContext, useEffect, useState } from 'react'
import "./profile.css"
import { Link, Outlet, useNavigate } from 'react-router-dom'
import { UserDataContext } from '../../context/context'
import ProfileNotify from '../../component/notification/profileNotify'
import UploadPic from './uploadPic/uploadPic'
import Logout from '../../component/logout/logout'
import MyPosts from './myPost/myPost'
import axios from 'axios'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import FollowerList from './followList/followerList'
import FollowingList from "./followList/followingList"

function Profile() {

    useGSAP(()=>{
        gsap.to(".circle-top",{
            opacity:0,
            duration:1.5,
            repeat:-1,
            yoyo:true
        })
    })

    const userData = useContext(UserDataContext)

    const storage = window.localStorage
    const userIdbyLocalStorage = window.localStorage.getItem("userId")

    // useEffect(() => {
    //     axios.get("http://localhost:5000/user/" + userIdbyLocalStorage)
    //         .then((result) => {
    //             userData.setUserData(result.data[0])
    //         })
    // }, [])

    const [showUpload, setShowUpload] = useState(false)

    const [showPopLog, setShowPopLog] = useState(false)

    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/')
    }

    const [showList,setShowList] = useState("")
    const [data,setData] = useState();
 
    const handleFollowerList = () => {
        setShowList("follower")
        setData(userData.userData.followers)
    }
    const handleFollowingList = () => {
        setShowList("following")
        setData(userData.userData.following)
    }

    return (
        <div className='profile-container' >
            {
                showList === "follower" ? <FollowerList data={data} setShowList={setShowList}/> : ""
            }
            {
                showList === "following" ? <FollowingList data={data} setShowList={setShowList}/> : ""
            }
            <div className='circle-top'></div>
            {
                userData.userData?.profile_picture && userData.userData?.bio ? "" :
                    <ProfileNotify />
            }
            <div className='top-layer' >

                <div className='profile-header' >
                    <div onClick={handleBack} to='/' className='backAndUser' style={{ display: "flex", alignItems: "center" }}>
                        <div>
                            <svg className="back-icon-nav" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
                        </div>
                        <h2 className='profile-username'>{userData.userData?.username}</h2>
                    </div>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center" }} >
                        <Link to="/profile/user-center">
                            <svg className='nav-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path></svg>
                        </Link>
                        <div style={{ position: "relative" }}>
                            {
                                showPopLog ?
                                    <svg className='nav-icon' onClick={() => setShowPopLog(false)} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg> :
                                    <svg onClick={() => setShowPopLog(true)} className='nav-icon upIconAnime' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"></path></svg>
                            }
                            {
                                showPopLog ? <Logout /> : ""
                            }
                        </div>
                    </div>
                </div>
                <div className='profile-wrapper' >
                    <div className='profile-box-container' >
                        <div className='profile-box' onClick={handleFollowerList}>
                            <h4>Followers</h4>
                            <h2>{userData?.userData?.followers?.length}</h2>
                        </div>
                        <div className='profile-box'>
                            <div className='profile-pic' >
                                {
                                    userData.userData?.profile_picture !== "" ? <img src={userData.userData?.profile_picture} /> :
                                        <div className='add-img-profile' onClick={() => setShowUpload(true)}>
                                            <svg className='nav-icon ' style={{ width: "30px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                                        </div>
                                }
                            </div>
                            {
                                showUpload ? <UploadPic id={userData.userData?._id}
                                /> : ""
                            }
                            <h1 className='profile-name'>{userData.userData?.name}</h1>
                            {
                                userData.userData?.bio === "null" ? "" :
                                    <p>{userData.userData?.bio}</p>
                            }
                        </div>
                        <div className='profile-box' onClick={handleFollowingList}>
                            <h4>Following</h4>
                            <h2>{userData?.userData?.following?.length}</h2>
                        </div>
                    </div>
                </div>
                <MyPosts id={userData.userData?._id} />
                <Outlet />
            </div>
        </div>
    )
}

export default Profile