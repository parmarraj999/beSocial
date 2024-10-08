import React from 'react'
import "./post.css"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import axios from 'axios'

function MenuExtend({postId, handleDeleteAnime, setPostExtend}) {

    useGSAP(()=>{
        gsap.from('.extend-post-menu',{
            opacity:0,
            duration:.2
        })
    })

    const hanldePostDelete = () => {
        axios.delete("https://besocial-q86i.onrender.com/deletePost/"+postId)
        .then(()=>{
            console.log("post delete successfully")
        })
        handleDeleteAnime();
    }

    return (
        <div className='extend-post-menu' >
            <div className='menu-btn' onClick={hanldePostDelete}>
                <svg style={{ width: "30px", color: "tomato" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 4V6H15V4H9Z"></path></svg>
                <h3 style={{ color: "tomato" }}>Delete</h3>
            </div>
        </div>
    )
}

export default MenuExtend