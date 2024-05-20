import React from 'react'
import "./welcome.css"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"

function Welcome() {

  const tl = gsap.timeline();
 useGSAP(()=>{
  tl.to(".text-cont",{
    color: "black",
    duration:.5,
    stagger:1
  })
  tl.to(".text-cont",{
    color:"#63c700",
    stagger:1
  })
  gsap.to(".welcome-container",{
    height:"0vh",
    duration:0.5,
    delay:5
  })
 })
 

  return (
    <div className='welcome-container'>
      {/* <div className='anime-box' >

      </div> */}
       
       <div className='welcome-text'>
       <h1 className='text-cont'>Connect</h1>
       <h1 className='text-cont'>Create</h1>
       <h1 className='text-cont'>Share</h1>
       </div>
      
      </div>
  )
}

export default Welcome
// #80ff0d