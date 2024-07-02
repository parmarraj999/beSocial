import React, { useEffect } from 'react'
import Nav from '../nav/nav'
import "./search.css"
import gsap from 'gsap'
import { useGSAP } from "@gsap/react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RecentSearch from './recent/recentSearch'

function Search() {

  useGSAP(() => {
    gsap.from(".search-bg-img", {
      opacity: 0,
      duration: .5,
    })
  })

  return (
    <div className='search-container'>
      <div className='search-wrapper' >
        <div className='recent-search' >
          <div className='recent-list' >
            <h4>Recent Search</h4>
            <RecentSearch />
          </div>
        </div>
      </div>
      <img className='search-bg-img' src='../../../image/search-bg.jpg' />
    </div>
  )
}

export default Search