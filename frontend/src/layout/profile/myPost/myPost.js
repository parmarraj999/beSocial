import React, { useState } from 'react'
import "./post.css"
import axios from 'axios'

function MyPosts({ id }) {

  console.log(id)

  const handleAdd = () => {
    axios.post("http://localhost:5000/addPost/"+ id, {
      title: "rasfasdfj",
    })
      .then(() => {
        console.log("done ")
      })
  }

  return (  
    <div className='my-post-container' >
      <h1>MyPostss</h1>
      <button onClick={handleAdd} >Add data</button>
    </div>
  )
}

export default MyPosts