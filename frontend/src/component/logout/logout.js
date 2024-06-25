import React from 'react'
import "./logout.css"
import { useNavigate } from 'react-router'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function Logout() {

    const storage = window.localStorage
    const navigate = useNavigate();

  const handleLogOut = () => {
    storage.removeItem("isLogIn")
    navigate("/")
    window.location.reload();
    storage.removeItem("userId")
  }

  useGSAP(()=>{
    gsap.from(".logout-pop-container",{
        opacity:0,
        duration:.5
    })
  })

  return (
    <div className='logout-pop-container' >
         <button onClick={handleLogOut}>Log Out</button>
    </div>
  )
}

export default Logout