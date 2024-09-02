import React from 'react'
import "./logout.css"
import { useNavigate } from 'react-router'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import axios from 'axios'

function Logout() {

  const storage = window.localStorage
  const navigate = useNavigate();

  const handleLogOut = () => {
    storage.removeItem("isLogIn")
    navigate("/")
    window.location.reload();
    storage.removeItem("userId")
  }

  const handleDeleteAccount = () => {
    axios.delete("http://localhost:5000/deleteAccount/" + storage.getItem("userId"))
      .then(result => {
        console.log(result, "account delete");
        storage.removeItem("isLogIn")
        navigate("/")
        window.location.reload();
        storage.removeItem("userId")
      })
  }

  useGSAP(() => {
    gsap.from(".logout-pop-container", {
      opacity: 0,
      duration: .5
    })
  })

  return (
    <div className='logout-pop-container' >
      <button onClick={handleLogOut}>Log Out</button>
      <button onClick={handleDeleteAccount} >Delete</button>
    </div>
  )
}

export default Logout