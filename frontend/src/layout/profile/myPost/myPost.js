import React, { useEffect, useState } from 'react'
import "./post.css"
import axios from 'axios'
import PostExtend from './postExtend'

function MyPosts({ id }) {

  const [postData,setPostData] = useState()
  const [postId,setPostId] = useState("")
  
  const userIdbyLocalStorage = window.localStorage.getItem("userId")
  
  useEffect(() => {
    axios.get("https://besocial-q86i.onrender.com/getUserPost/" + userIdbyLocalStorage)
    .then((result) => {
      setPostData(result.data)
    })
  }, [])
  const handleRefresh = () => {
    setTimeout(() => {
      axios.get("https://besocial-q86i.onrender.com/getUserPost/" + userIdbyLocalStorage)
      .then((result) => {
        setPostData(result.data)
      })
    }, 1000);
  }

  const [postExtend,setPostExtend] = useState(false)
  const [singlePost,setSinglePost] = useState({})

  return (  
    <div className='my-post-container' >
      {
        postExtend ? <PostExtend handleRefresh={handleRefresh} setPostExtend={setPostExtend} data={singlePost} postId={postId} /> : ""
      }
      {
        postData?.map((data,key)=>{
          return(
            
            <div className='post-small' onClick={()=>{setPostExtend(true) 
             setSinglePost(data)
             setPostId(data._id)}}>

              <div className='post-small-img' >
                <img src={data.mediaUrl} />
                </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default MyPosts