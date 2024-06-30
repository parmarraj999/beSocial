import React, { useContext, useEffect, useState } from 'react'
import "./home.css"
import Welcome from '../welcome/welcome'
import Stories from './stories/stories'
import StoryBoard from './stories/storyboard'
import Post from './post/post'
import { useNavigate } from 'react-router'
import CredentialNotify from '../../component/notification/credentialNotify'
import { UserDataContext } from '../../context/context'
import axios from "axios"
import Create from './create/create'

function Home() {

  const [showPop, setShowPop] = useState(true)
  const [showPost, setShowPost] = useState(false)

  const navigate = useNavigate()
  const storage = window.localStorage

  const handleFollow = () => {
    axios.put("http://localhost:5000/follow/" + userData.userData._id)
    .then((res)=>console.log(res))
    .catch((err)=>console.log(err))
  }

  const userData = useContext(UserDataContext);

  const userIdbyLocalStorage = window.localStorage.getItem("userId")

  useEffect(() => {
    axios.get("http://localhost:5000/user/" + userIdbyLocalStorage)
      .then((result) => {
        userData.setUserData(result.data[0])
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
        <div>
          <svg className='nav-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21.7267 2.95694L16.2734 22.0432C16.1225 22.5716 15.7979 22.5956 15.5563 22.1126L11 13L1.9229 9.36919C1.41322 9.16532 1.41953 8.86022 1.95695 8.68108L21.0432 2.31901C21.5716 2.14285 21.8747 2.43866 21.7267 2.95694ZM19.0353 5.09647L6.81221 9.17085L12.4488 11.4255L15.4895 17.5068L19.0353 5.09647Z"></path></svg>
        </div>
      </div>
      <Stories />
      {/* <StoryBoard/> */}
      <Post /> 
      {
        showPost ?
          <Create setShowPost={setShowPost} id={userData.userData._id}  /> : ""
      }
      <button className='follow' onClick={handleFollow} >
        follow
      </button>
      <div onClick={() => setShowPost(!showPost)} className='post-create-btn' >
        {
          showPost ?
            <svg className='nav-icon' style={{ width: "30px", color: "black" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg> :

            <svg style={{ width: "30px", color: "black" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0001 10.9999L22.0002 10.9997L22.0002 12.9997L13.0001 12.9999L13.0001 21.9998L11.0001 21.9998L11.0001 12.9999L2.00004 13.0001L2 11.0001L11.0001 10.9999L11 2.00025L13 2.00024L13.0001 10.9999Z"></path></svg>
        }
      </div>
    </div>
  )
}

export default Home