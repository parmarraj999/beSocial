  import React, { useContext, useEffect, useState } from 'react'
import './post.css'
import { UserDataContext } from '../../../context/context'
import axios from 'axios';
import PostProfile from './postProfile/postProfile';

function PostCard({ data, setOnePost, setShowDetail, key }) {

  function ConvertDate(dateText) {

    const date = new Date(dateText);

    const day = date.getDate().toString().padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'long' });
    const year = date.getFullYear();

    const formattedDate = `${day} ${month} ${year}`;
    return formattedDate;
    // console.log(formattedDate)
  }

  const [postData, setPostData] = useState(data);
  console.log(postData)

  const userData = useContext(UserDataContext).userData

  const handleLikeList = (list) => {
    const likeIds = list?.map((data) => data.userId)
    console.log(likeIds)
    console.log(likeIds?.includes(userData?._id))
    return likeIds?.includes(userData?._id);
  }

  const getSinglePost = () => {
    axios.post("https://besocial-q86i.onrender.com/getSinglePost/" + data._id)
      .then(result => {
        console.log(result)
        setPostData(result.data)
      })
  }

  const handleLike = (postId) => {
    axios.put("https://besocial-q86i.onrender.com/like/" + postId, {
      userId: userData._id,
      userName: userData.username,
    })
      .then(result => {
        console.log(result)
        // getSinglePost();
      })
  }

  const handleUnlike = (postId) => {
    axios.put("https://besocial-q86i.onrender.com/unlike/" + postId, {
      userId: userData._id,
      userName: userData.username,
    })
      .then(result => {
        console.log(result)
        getSinglePost();
        handleLikeList();
      })
  }

  const [elementId,setElementId] = useState();

  console.log(data)

  return (
    <div className='post-card' >
      {
        elementId ===  postData._id ?
        <PostProfile userId={data.userId} image={data.userProfile} setElementId={setElementId}/>
        : ""
      }
      <div className='post-card-header' >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div className='post-profile' onClick={()=>setElementId(postData._id)}>
            <img src={postData?.userProfile} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: ".2rem" }}>
            <h1>{postData.creatorName}</h1>
            <p>{ConvertDate(postData.createdAt)}</p>
          </div>
        </div>
        <div>
          <svg style={{ width: "25px", color: "black" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path></svg>
        </div>
      </div>
      <img onClick={() => {
        setOnePost(postData)
        setShowDetail(true)
      }} src={postData?.mediaUrl} />
      {/* <div className='post-btns' >
        <div style={{ display: 'flex', alignItems: "center", gap: ".5rem", cursor: "pointer" }} >
          {
            handleLikeList(postData.like) ?

              <div className='detail-btn liked-btn' style={{ background: "rgba(175, 175, 175,.1)" }} >
                <svg style={{ width: "30px", color: "#80ff00" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C5.51545 2.99926 8.09315 2.56029 10.2605 3.44044L6.34315 7.35843L7.75736 8.77264L12 4.53L11.9872 4.51617C11.9918 4.52028 11.9964 4.5244 12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736Z"></path></svg>
              </div>
              :
              <div className='post-btn post-like' onClick={() => handleLike(postData._id)}>
                <svg style={{ width: "30px", color: "black" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736ZM5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701C17.3397 4.67979 14.9458 4.60806 13.3743 5.98376L9.17157 10.1869L7.75736 8.77264L10.582 5.946L10.5002 5.87701C8.92545 4.61197 6.62322 4.71993 5.17157 6.17157Z"></path></svg>
              </div>
          }
          <div onClick={() => {
            setOnePost(postData)
            setShowDetail(true)
          }} style={{ display: 'flex', alignItems: "center", gap: ".3rem", cursor: "pointer" }}>
            <h4 >{postData?.like?.length}</h4>
            <h4 style={{ color: "grey" }} >Like</h4>
            <svg style={{ width: "22px", color: "black" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: "center", gap: ".3rem", cursor: "pointer" }} onClick={() => {
          setOnePost(postData)
          setShowDetail(true)
        }}>
          <h4>{`${postData?.comments?.length}` - 1}</h4>
          <h4 style={{ color: "grey" }}>Comments</h4>
          <svg style={{ width: "22px", color: "black" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
        </div>
      </div> */}
      <div className='post-btns' >
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div className='post-btn' onClick={() => {
            setOnePost(postData)
            setShowDetail(true)
          }} >
            <h4>{`${postData?.like?.length}`}</h4>
            <svg style={{ width: "25px", color: "black" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C5.51545 2.99926 8.09315 2.56029 10.2605 3.44044L6.34315 7.35843L7.75736 8.77264L12 4.53L11.9872 4.51617C11.9918 4.52028 11.9964 4.5244 12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736Z"></path></svg>
          </div>
          <div className='post-btn' onClick={() => {
            setOnePost(postData)
            setShowDetail(true)
          }} >
            <h4>{`${postData?.comments?.length}` - 1}</h4>
            <svg style={{ width: "25px", color: "black" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 3H14C18.4183 3 22 6.58172 22 11C22 15.4183 18.4183 19 14 19V22.5C9 20.5 2 17.5 2 11C2 6.58172 5.58172 3 10 3ZM12 17H14C17.3137 17 20 14.3137 20 11C20 7.68629 17.3137 5 14 5H10C6.68629 5 4 7.68629 4 11C4 14.61 6.46208 16.9656 12 19.4798V17Z"></path></svg>
          </div>
        </div>
        <div className='post-btn' style={{background:"black"}} onClick={() => {
            setOnePost(postData)
            setShowDetail(true)
          }}>
          <svg style={{width:"25px",color:"white"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
        </div>
      </div>
      <div className='post-caption'>
        <p>{postData?.caption}</p>
      </div>
    </div>
  )
}

export default PostCard
