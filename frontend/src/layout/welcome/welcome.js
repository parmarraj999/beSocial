import React from 'react'
import "./welcome.css"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

function Welcome() {

  const tl = gsap.timeline();

  useGSAP(()=>{
    gsap.from(".welcome-container",{
      opacity:0,
      duration:.2,
    })
    tl.from(".welcome-wrapper > h1",{
      opacity:0,
      y:20,
      stagger:.4,
    })
    tl.to(".welcome-wrapper > h1",{
      color:"#428500",
      delay:.3,
      stagger:.2
    })
    tl.to(".welcome-wrapper > h1",{
      color:"#80ff00",
      delay:.3,
      stagger:.2
    })
    tl.to(".welcome-container",{
      height:0,
      delay:.8
    })
  })

  return (
    <div className='welcome-container' >
        <div className='welcome-wrapper'>
          <h1>Connect</h1>
          <h1>Create</h1>
          <h1>Share</h1>
        </div>
    </div>
  )
}

export default Welcome