import React, { useContext, useEffect, useState } from 'react'
import "./home.css"
import Welcome from '../welcome/welcome'
import Stories from './stories/stories'
import StoryBoard from './stories/storyboard'
import Post from './post/post'
import { useLocation, useNavigate } from 'react-router'
import CredentialNotify from '../../component/notification/credentialNotify'
import { UserDataContext } from '../../context/context'
import axios from "axios"
import Create from './create/create'
import gsap from 'gsap'
import PostDetail from './postDetail/postDetail'
import { Link } from 'react-router-dom'
import AddStory from './stories/addStory'

function Home() {
  
  const userData = useContext(UserDataContext)

  const location = useLocation();
  const { pathname } = location;

  const [showPop, setShowPop] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [showDetail, setShowDetail] = useState(false)
  const [showStory, setShowStory] = useState(false)
  const [storyId, setStoryId] = useState("")
  const [showAddStory, setShowAddStory] = useState(false)

  const navigate = useNavigate()
  const storage = window.localStorage

  if (pathname === "/search") {
    gsap.to(".post-create-btn", {
      display: "none"
    })
  }

  const [data, setData] = useState([])
  const following = userData.userData?.following

  const [onePost, setOnePost] = useState({})

  const userIdbyLocalStorage = window.localStorage.getItem("userId")


  const followingIds = following?.map((data) => data.followingId)
  const followingString = followingIds?.map(userId => userId.toString());

  // console.log(followingIds)

  const handleGetPost = async () => {
    console.log(followingIds)
    const response = await axios.post("https://besocial-q86i.onrender.com/getAllPosts", followingIds)
    console.log(response.data)  
    setData(response.data)
    console.log(data.length)
  }

  // handleGetPost();

  const [showPost, setShowPost] = useState(false)

  useEffect(() => {
    axios.get("https://besocial-q86i.onrender.com/user/" + userIdbyLocalStorage)
      .then((result) => {
        userData.setUserData(result.data[0])
        console.log("data getted")
        setShowPost(true)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])



  return (
    <div className='home-container' >
      {/* <Welcome/> */}
      {
        storage.getItem("userId") ? "" :
          <CredentialNotify setShowPop={setShowPop} />
      }
      <div className='nav4logo' >
        <div>logo</div>
        <div style={{ display: "flex", gap: '1rem' }}>
          <Link to="/notification">
            <svg className='nav-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 18H19V11.0314C19 7.14806 15.866 4 12 4C8.13401 4 5 7.14806 5 11.0314V18ZM12 2C16.9706 2 21 6.04348 21 11.0314V20H3V11.0314C3 6.04348 7.02944 2 12 2ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"></path></svg>
          </Link>
          <Link to="/community">
            <svg className='nav-icon upIconAnime' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.6144 17.7956C10.277 18.5682 9.20776 18.5682 8.8704 17.7956L7.99275 15.7854C7.21171 13.9966 5.80589 12.5726 4.0523 11.7942L1.63658 10.7219C.868536 10.381.868537 9.26368 1.63658 8.92276L3.97685 7.88394C5.77553 7.08552 7.20657 5.60881 7.97427 3.75892L8.8633 1.61673C9.19319.821767 10.2916.821765 10.6215 1.61673L11.5105 3.75894C12.2782 5.60881 13.7092 7.08552 15.5079 7.88394L17.8482 8.92276C18.6162 9.26368 18.6162 10.381 17.8482 10.7219L15.4325 11.7942C13.6789 12.5726 12.2731 13.9966 11.492 15.7854L10.6144 17.7956ZM4.53956 9.82234C6.8254 10.837 8.68402 12.5048 9.74238 14.7996 10.8008 12.5048 12.6594 10.837 14.9452 9.82234 12.6321 8.79557 10.7676 7.04647 9.74239 4.71088 8.71719 7.04648 6.85267 8.79557 4.53956 9.82234ZM19.4014 22.6899 19.6482 22.1242C20.0882 21.1156 20.8807 20.3125 21.8695 19.8732L22.6299 19.5353C23.0412 19.3526 23.0412 18.7549 22.6299 18.5722L21.9121 18.2532C20.8978 17.8026 20.0911 16.9698 19.6586 15.9269L19.4052 15.3156C19.2285 14.8896 18.6395 14.8896 18.4628 15.3156L18.2094 15.9269C17.777 16.9698 16.9703 17.8026 15.956 18.2532L15.2381 18.5722C14.8269 18.7549 14.8269 19.3526 15.2381 19.5353L15.9985 19.8732C16.9874 20.3125 17.7798 21.1156 18.2198 22.1242L18.4667 22.6899C18.6473 23.104 19.2207 23.104 19.4014 22.6899ZM18.3745 19.0469 18.937 18.4883 19.4878 19.0469 18.937 19.5898 18.3745 19.0469Z"></path></svg>
          </Link>
        </div>
      </div>
      {/* <Stories setShowAddStory={setShowAddStory} setShowStory={setShowStory} storyId={storyId} /> */}
      {
        showAddStory ? <AddStory setShowAddStory={setShowAddStory} /> : ""
      }
      {
        showStory ?
          <StoryBoard setShowStory={setShowStory} storyId={storyId} /> : ""
      }
      {
        showPost ?
          <Post setOnePost={setOnePost} setShowDetail={setShowDetail} handleGetPost={handleGetPost} data={data} /> : ""
      }
      {
        userData.showCreateVar ?
          <Create setShowCreate={setShowCreate} id={userData.userData._id} userName={userData.userData.username} /> : ""
      }
      <div className='post-create-btn-home' onClick={()=>{userData.setShowCreateVar(true)
        setShowCreate(!showCreate)}
      } >
        {
          userData.showCreateVar ?
            <svg className='nav-icon' style={{ width: "30px", color: "black" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg> :

            <svg style={{ width: "30px", color: "black" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0001 10.9999L22.0002 10.9997L22.0002 12.9997L13.0001 12.9999L13.0001 21.9998L11.0001 21.9998L11.0001 12.9999L2.00004 13.0001L2 11.0001L11.0001 10.9999L11 2.00025L13 2.00024L13.0001 10.9999Z"></path></svg>
        }
      </div>
      {
        showDetail ?
          <PostDetail handleGetPost={handleGetPost} onePost={onePost} setShowDetail={setShowDetail} /> : ""
      }
    </div>
  )
}

export default Home