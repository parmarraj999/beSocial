import React, { useContext, useEffect, useState } from 'react'
import './post.css'
import axios from "axios"
import { UserDataContext } from '../../../context/context'
import { Link } from "react-router-dom"
import gsap from 'gsap'
import PostCard from './postCard'

function Post({ data, handleGetPost, setOnePost, setShowDetail }) {

  useEffect(() => {
    handleGetPost() 
  }, [])

  const userData = useContext(UserDataContext).userData

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
      </div>
    </div>
  )
}

export default Post