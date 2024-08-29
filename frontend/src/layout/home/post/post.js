import React, { useContext, useEffect, useState } from 'react'
import './post.css'
import axios from "axios"
import { UserDataContext } from '../../../context/context'
import { Link } from "react-router-dom"
import gsap from 'gsap'
import PostCard from './postCard'

function Post({ data, handleGetPost, setOnePost, setShowDetail }) {

  useEffect(() => {
    console.log("data getting of post new")
    handleGetPost() 
  }, [])

  const userData = useContext(UserDataContext)

  return (
    <div className='post-container' >
      <div className='post-wrapper' >
        {
          data?.map((data,key) => {
            return (
             <PostCard setOnePost={setOnePost} setShowDetail={setShowDetail}  data={data} />
            )
          })
        }
         <div style={{display:"flex",alignItems:"center",justifyContent:"center",height:"50px"}}>
            <h4 style={{color:"grey",fontSize:"16px"}} >Refresh For New Post</h4>
        </div>
      </div>
    </div>
  )
}

export default Post