import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../../../context/context'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import MenuExtend from './menuExtend'
import axios from 'axios'


function PostExtend({ data, setPostExtend, handleRefresh }) {

    const userData = useContext(UserDataContext)
    const [showMenu, setShowMenu] = useState(false)
    const [createDate, setCreateDate] = useState()

    // function convertDate() {

    //     const createDate = data.createdAt
    //     const date = new Date(createDate);

    //     const year = date.getFullYear();
    //     const month = date.getMonth() + 1;
    //     const day = date.getDate();

    //     const abc = `${day.toString().padStart(2, "0")} ${month.toString().padStart(2, "0")} ${year}`;
    //     setCreateDate(abc)
    // }

    function convertDate(dateText) {

        const date = new Date(dateText);
    
        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
    
        const formattedDate = `${day} ${month} ${year}`;
        return formattedDate;
        // console.log(formattedDate)
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
            opacity: 1
        })
        tl.to(".delete-pop", {
            width: "120px",
            height: "120px",
            duration: .3
        })
        tl.to(".extend-post", {
            scale: 0.1,
            duration: .4,
            top: 100,
        })
        tl.to(".delete-pop", {
            border: "4px solid red",
            duration: .1
        })
        tl.to(".extend-post", {
            display: "none"
        })
        tl.to(".delete-pop", {
            width: "50px",
            height: "50px",
            duration: .3
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
            <div className='extend-post-container' >

            <div className='extend-post' >
                <div className='extend-post-header'>
                    <div className='extend-post-profile' >
                        <img className='extend-post-img-profile' src={userData.userData.profile_picture} />
                        <h2 className='extend-post-name' >
                            {userData.userData.username}</h2>
                    </div>
                    <div style={{display:"flex",alignItems:"center"}}>
                    <p className='date-text' >{convertDate(data.createdAt)}</p>
                        <div className='extend-post-menu-icon' onClick={() => setShowMenu(!showMenu)}>
                            {
                                showMenu ?
                                    <MenuExtend postId={data._id} handleDeleteAnime={handleDeleteAnime} /> : ""
                            }
                            <svg style={{ width: "25px", color: "white" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path></svg>
                        </div>
                    </div>
                </div>
                <img className='extend-post-img' src={data.mediaUrl} />
                {/* <div style={{ padding: "0 .5rem" }}>
                    <svg style={{ width: "30px", color: "#80ff00" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z"></path></svg>
                </div> */}
                <div className='extend-post-details' >
                    <h3>{data.caption}</h3>
                </div>
            </div>
            
            </div>
        </div >
    )
}

export default PostExtend