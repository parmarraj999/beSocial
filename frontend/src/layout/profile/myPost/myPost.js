import React, { useEffect, useState } from 'react'
import "./post.css"
import axios from 'axios'
import PostExtend from './postExtend'

function MyPosts({ id }) {

  
  const [postData,setPostData] = useState()
  
  const userIdbyLocalStorage = window.localStorage.getItem("userId")
  
  useEffect(() => {
    axios.get("http://localhost:5000/getUserPost/" + userIdbyLocalStorage)
    .then((result) => {
      setPostData(result.data)
    })
  }, [])

  const [postExtend,setPostExtend] = useState(false)
  const [singlePost,setSinglePost] = useState({})

  return (  
    <div className='my-post-container' >
      {
        postExtend ? <PostExtend setPostExtend={setPostExtend} data={singlePost} /> : ""
      }
      {
        postData?.map((data,key)=>{
          return(
            
            <div className='post-small' onClick={()=>{setPostExtend(true)
             setSinglePost(data)}}>

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