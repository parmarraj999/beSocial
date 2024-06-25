import React, { useContext } from 'react'
import "../notification.css"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { UserDataContext } from '../../context/context'

function CredentialNotify(props) {

  const userData = useContext(UserDataContext)

  const tl = gsap.timeline();
  useGSAP(()=>{
    tl.from(".credential-notify-container",{
      y:-80,
      delay:.4
    })
    tl.to(".credential-notify-container",{
      y:0,
      duration:.2
    })
    tl.to(".credential-notify-container",{
      width:"350px",
      height:"50px",
      duration:.4,
      borderRadius:"1.2rem"
    })
    if(window.innerWidth < 765){
      tl.to(".credential-notify-container",{
        width:"94%",
        height:"50px",
        duration:.4,
        borderRadius:"1.2rem"
      })
    }
    tl.to(".credential-notify-container",{
      height:"120px",
      duration:.2
    })
    tl.from(".credential-notify-container > h2",{
      y:30,
      opacity:0,
      duration:.2
    })
    tl.from(".credential-notify-container > div > button",{
      y:40,
      opacity:0,
      stagger:.2,
      duration:.2
    })
  })

  const handleNo = () => {

    props.setShowPop(false)

    window.localStorage.setItem("showPopSave",false)
    tl.to(".credential-notify-container > div > button",{
      y:40,
      opacity:0,
      stagger:.1
    })
    tl.to(".credential-notify-container > h2",{
      y:30,
      opacity:0,
    })
    tl.to(".credential-notify-container",{
      height:"50px",
    })
    tl.to(".credential-notify-container",{
      width:"50px",
      height:"50px",
      borderRadius:"2rem",
      duration:.2
    })
    tl.to(".credential-notify-container",{
      y:-80
    })
  }

  const handleYes = () => {
    window.localStorage.setItem("userId",userData.userData._id)
     console.log("clicked")
    tl.to(".credential-notify-container > div > button",{
      y:40,
      opacity:0,
      stagger:.1
    })
    tl.to(".credential-notify-container > h2",{
      y:30,
      opacity:0,
    })
    tl.to(".credential-notify-container",{
      height:"50px",
    })
    tl.to(".credential-notify-container",{
      width:"50px",
      height:"50px",
      borderRadius:"2rem",
      duration:.2
    })
    tl.to(".credential-notify-container",{
      y:-80
    })
  }

  return (
    <div className='credential-notify-container' >
        <h2>Save Data for Next time ?</h2>
        <div>
          <button className='yes-btn' onClick={handleYes} >Yes</button>
          <button className='no-btn' onClick={handleNo} >No</button>
        </div>
    </div>
  )
}

export default CredentialNotify