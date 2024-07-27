import React, { useState, useContext } from 'react'
import "./userList.css"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import UserExpend from './userExpend'
import { Link } from 'react-router-dom'
import UserProfilePage from '../../userProfile/userProfile'
import { SearchListData, UserDataContext } from "../../../context/context"
import axios from 'axios'

function UserList({ }) {

    const data = useContext(SearchListData)
    const searchData = data.searchData

    const userDataContext = useContext(UserDataContext)
    const userData = userDataContext.userData
    const myFollowing = userData.following

    // console.log(data.searchText)
    console.log(userData.following)

    useGSAP(() => {
        gsap.from(".search-user-box", {
            opacity: 0,
            duration: .6,
            stagger: .2 
        })
    })

    const isFollowing = (username, id) => {
        console.log(myFollowing)
        return myFollowing.some(follow => follow.followingUsername === username && follow.followingId === id);
        // return true;
    };

    const userIdbyLocalStorage = window.localStorage.getItem("userId")

    // console.log(searchData)

    return (
        <div className='userList-container'>
            {
                searchData?.map((data) => {
                    return (
                        <div className='search-user-box'>
                            <Link to={"/user-profile/" + data._id} style={{ width: "100%", display: "flex", alignItems: "center", gap: "1rem", textDecoration: "none", color: "#292929" }}>

                                <div className='search-profile-box'  >
                                    {
                                        data.profile_picture === "" ?
                                            <div style={{ width: "50px", display: "flex", alignItems: "center", justifyContent: "center" }} >
                                                <img src='../../../image/profile.png' />
                                            </div> :
                                            <img src={`${data.profile_picture}`} />
                                    }
                                </div>
                                <div className='search-detail-box' >
                                    <h5>{data.username}</h5>
                                </div>
                                {!isFollowing(data.username, data._id) && (
                                    <div className='post-count'>
                                        <svg style={{ width: "20px", color: "black" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M14 14.252V16.3414C13.3744 16.1203 12.7013 16 12 16C8.68629 16 6 18.6863 6 22H4C4 17.5817 7.58172 14 12 14C12.6906 14 13.3608 14.0875 14 14.252ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11ZM18 17V14H20V17H23V19H20V22H18V19H15V17H18Z"></path></svg>
                                    </div>
                                )}
                            </Link>
                        </div>
                    )
                })
            }
            {/* {
                showExpend ? <UserExpend/> : ""
            } */}
        </div>
    )
}

export default UserList