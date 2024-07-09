import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../../../context/context'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'


function UserPostExtend({ data, setPostExtend, handleRefresh, profileImg, username }) {

    const userData = useContext(UserDataContext)
    const [showMenu, setShowMenu] = useState(false)
    const [createDate, setCreateDate] = useState()

    function convertDate() {

        const createDate = data.createdAt
        const date = new Date(createDate);

        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const abc = `${day.toString().padStart(2, "0")} ${month.toString().padStart(2, "0")} ${year}`;
        setCreateDate(abc)
    }

    useEffect(() => {
        convertDate();
    }, [])

    const tl = gsap.timeline();

    useGSAP(() => {
        gsap.from(".post-extend-container", {
            background: "rgba(0,0,0,0)",
            duration: .4
        })
        gsap.from(".extend-post", {
            opacity: 0,
            duration: .8,
            ease: "expo.out"
        })
    })

    const handleDeleteAnime = () => {
        handleRefresh();
        tl.from(".delete-pop", {
            opacity: 0,
        })
        tl.to(".delete-pop", {
            y: 100,
            opacity:1
        })
        tl.to(".delete-pop", {
            width: "120px",
            height: "120px",
            duration:.3
        })
        tl.to(".extend-post", {
            scale: 0.1,
            duration:.4,
            top: 100,
        })
        tl.to(".delete-pop", {
            border: "4px solid red",
            duration:.1
        })
        tl.to(".extend-post", {
            display: "none"
        })
        tl.to(".delete-pop", {
            width: "50px",
            height: "50px",
            duration:.3
        })
        tl.to(".delete-pop", {
            y: -80,
            opacity: 0
        })
        tl.to(".post-extend-container", {
            background: "rgba(0,0,0,0)",
            duration: .4
        })
        
    }

    return (
        <div className='post-extend-container' >

            <div className='delete-pop' >
                <svg className='delete-icon' style={{ width: "25px", color: "red" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM6 10V20H18V10H6ZM9 12H11V18H9V12ZM13 12H15V18H13V12ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9Z"></path></svg>
            </div>
            <div className='close-container' onClick={() => setPostExtend(false)} ></div>
            <div className='extend-post' >
                <div className='extend-post-header'>
                    <div className='extend-post-profile' >
                        <img className='extend-post-img-profile' src={profileImg} />
                        <h2 className='extend-post-name' >
                            {username}</h2>
                    </div>
                </div>
                <img className='extend-post-img' src={data.mediaUrl} />
                <div style={{ padding: "0 .5rem" }}>
                    <svg style={{ width: "30px", color: "#80ff00" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z"></path></svg>
                </div>
                <div className='extend-post-details' >
                    <h3>{data.caption}</h3>
                    <p>{createDate}</p>
                </div>
            </div>
        </div >
    )
}

export default UserPostExtend