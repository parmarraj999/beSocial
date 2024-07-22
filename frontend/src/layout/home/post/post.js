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

  // function ConvertDate(dateText) {

  //   const date = new Date(dateText);

  //   const day = date.getDate().toString().padStart(2, '0');
  //   const month = date.toLocaleString('default', { month: 'long' });
  //   const year = date.getFullYear();

  //   const formattedDate = `${day} ${month} ${year}`;
  //   return formattedDate;
  //   // console.log(formattedDate)
  // }


//   const handleLikeList = (list) => {
//     const likeIds = list?.map((data) => data.userId)
//     console.log(likeIds)
//     console.log(likeIds.includes(userData?._id))
//     return likeIds.includes(userData?._id);
//   }

//   const handleLike = (postId) => {
//     console.log(data.username)
//     axios.put("http://localhost:5000/like/" + postId, {
//         userId: userData._id,
//         userName: userData.username,
//     })
//         .then(result => {
//             console.log(result)
//             handleLikeList();
//         })
// }
// const handleUnlike = (postId) => {
//     axios.put("http://localhost:5000/unlike/" + postId, {
//         userId: userData._id,
//         userName: userData.username,
//     })
//         .then(result => {
//             console.log(result)
//             handleLikeList();
//         })
// }

  return (
    <div className='post-container' >
      <div className='post-wrapper' >
        {
          data?.map((data) => {
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