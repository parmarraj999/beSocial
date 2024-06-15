import React, { useContext } from 'react'
import "./profile.css"
import { Link } from 'react-router-dom'
import { UserDataContext } from '../../context/context'

function Profile() {

    const userData = useContext(UserDataContext)
    console.log(userData.userData.following.length)

    return (
        <div className='profile-container' >
            <div className='profile-header' >
                <Link to="/">
                    <svg className="back-icon-nav" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
                </Link>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center" }} >
                    <svg className='nav-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path></svg>

                    <svg className='nav-icon upIconAnime' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"></path></svg>
                </div>
            </div>
            <div className='profile-wrapper' >
                <div className='profile-box-container' >
                    <div className='profile-box'>
                        <h4>Followers</h4>
                        <h2>{userData?.userData?.followers?.length}</h2>
                    </div>
                    <div className='profile-box'>
                        <div className='profile-pic' >
                            <img src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' />
                        </div>
                        <h1 className='profile-name'>{userData.userData.name}</h1>
                    </div>
                    <div className='profile-box'>
                    <h4>Following</h4>
                    <h2>{userData?.userData?.following?.length}</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile