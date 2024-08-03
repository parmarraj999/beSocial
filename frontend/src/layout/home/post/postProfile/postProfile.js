import React from 'react'
import './postProfile.css';
import { Link} from 'react-router-dom'
import { useGSAP } from "@gsap/react"
import gsap from 'gsap';

function PostProfile({userId,setElementId, image}) {

  useGSAP(()=>{
    gsap.from(".post-profile-container",{
      opacity:0,
      duration:.3
    })
    gsap.from('.post-profile-wrapper img',{
      opacity:0,
      duration:.2
    })
    gsap.from('.post-profile-wrapper div',{
      opacity:0,
      duration:.2,
      delay:.1
    })
    gsap.from(".post-profile-container button",{
      y:-100,
      opacity:0,
      duration:.2
    })
  })

  const handleCancel = () => {
    gsap.to(".post-profile-container",{
      opacity:0,
      duration:.2
    })
    setTimeout(() => {
      setElementId("")
    }, 300);
  }

  return (
    <div className='post-profile-container' >
      <div className='post-profile-wrapper'>
        <div style={{minHeight:"250px"}} >
        <img src={image} />
        </div>
        <div>
          <Link to={"/user-profile/" + userId} className='visit-btn'>Visit Profile</Link>
        </div>
      </div>
      <button onClick={handleCancel}>
      <svg style={{width:"30px",color:"white"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
      </button>
    </div>
  )
}

export default PostProfile