import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../../../context/context'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import MenuExtend from './menuExtend'


function PostExtend({ data, setPostExtend }) {

    const userData = useContext(UserDataContext)
    const [showMenu, setShowMenu] = useState(false)
    const [createDate,setCreateDate] = useState()

    console.log(data.createdAt)

    
    function convertDate() {
        // Create a JavaScript Date object from the input string
        const createDate = data.createdAt
        const date = new Date(createDate);
      
        // Extract year, month (0-indexed), and day components
        const year = date.getFullYear();
        const month = date.getMonth() + 1;  // Add 1 for zero-based indexing
        const day = date.getDate();
      
        const abc = `${day.toString().padStart(2, "0")} ${month.toString().padStart(2, "0")} ${year}`;
        console.log(abc)
        setCreateDate(abc)
      }

      useEffect(()=>{

          convertDate();
      },[])
      
      useGSAP(()=>{
        gsap.from(".post-extend-container",{
            background:"rgba(0,0,0,0)",
            duration:.4
        })
        gsap.from(".extend-post",{
            opacity:0,
            duration:.8,
            ease : "expo.out"
        })
      })

    return (
        <div className='post-extend-container' >
            <div className='close-container' onClick={() => setPostExtend(false)} ></div>
            <div className='extend-post' >
                <div className='extend-post-header'>
                    <div className='extend-post-profile' >
                        <img className='extend-post-img-profile' src={userData.userData.profile_picture} />
                        <h2 className='extend-post-name' >
                            {userData.userData.username}</h2>
                    </div>
                    <div className='extend-post-menu-icon' onClick={()=>setShowMenu(!showMenu)}>
                        {
                            showMenu ?
                            <MenuExtend/> : ""
                        }
                        <svg style={{ width: "25px", color: "white" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path></svg>
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

export default PostExtend