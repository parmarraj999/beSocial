import React, { useEffect } from 'react'
import Nav from '../nav/nav'
import "./search.css"
import gsap from 'gsap'
import { useGSAP } from "@gsap/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Search() {

 useGSAP(()=>{
   gsap.from(".search-bg-img",{
     opacity:0,
    duration:.5,
  })
})

  return (
    <div className='search-container'>
      <div className='search-wrapper' >
        <div className='recent-search' >
          <h4>Recent Search</h4>
          <div className='recent-list' >
             <div className='search-text'>
              <h5>User One</h5>
              <svg className='nav-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
             </div>
             <div className='search-text'>
              <h5>User two</h5>
              <svg className='nav-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
             </div>
             
          </div>
        </div>
      </div>
      <img className='search-bg-img' src='../../../image/search-bg.jpg' />
    </div>
  )
}

export default Search