import React, { useEffect, useState } from 'react'
import "../../profile/myPost/post.css"
import axios from 'axios'
import UserPostExtend from '../../search/userList/userPostExtend'
import '../userProfile.css'

function UserPosts({ postData, userData }) {

  console.log(postData)

  const [postExtend, setPostExtend] = useState(false)
  const [singlePost, setSinglePost] = useState({})

  return (
    <div className='my-post-container' >
      {
        postExtend ? <UserPostExtend username={userData?.username} profileImg={userData?.profile_picture} setPostExtend={setPostExtend} data={singlePost} /> : ""
      }
        {
          postData?.map((data, key) => {
            return (

              <div className='post-small' onClick={() => {
                setPostExtend(true)
                setSinglePost(data)
              }}>
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

export default UserPosts

// 6307886753