import React, { useEffect, useState } from 'react'
import './nav.css'
import { gsap } from "gsap"
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

function Nav() {

  const [navPath, setNavPath] = useState("");

  const navigate = useNavigate();

  const location = useLocation();
  const { pathname } = location;

  useEffect(() => {
    if (pathname === "/search") {

      gsap.to(".search-bar-container", {
        display: "flex",
        delay: .8
      })
      gsap.to(".search-bar-nav", {
        width: "350px",
        duration: .4,
        delay: 1
      })
      gsap.to(".upIconAnime", {
        y: -20,
        opacity: 0,
        duration: .2,
        stagger: .2,
      })
      gsap.fromTo(".back-btn", {
        y: -20,
        opacity: 0,
        delay: 1.4
      }, {
        y: 0,
        opacity: 1,
        delay: 1.4
      })
      gsap.fromTo(".search-btn", {
        y: -20,
        opacity: 0,
        delay: 1.6
      }, {
        y: 0,
        opacity: 1,
        delay: 1.6
      })
      gsap.to(".nav-mobile .nav-icon",{
        y:-20,
        opacity:0,
        duration:.2,
        stagger:.1,
        display:"none"
       })
      
       gsap.to(".nav-mobile .add-icon",{
        y:-20,
        opacity:0,
        delay:.2,
        display:"none"
       })
       gsap.to(".search-bar-container2",{
        display:"flex",
        width:"100%",
        delay:.8
       })
       gsap.to(".search-bar-nav2",{
        width:"70%",
        duration:.6,
        delay:1.8
       })
       
    }
  })


  const handleSearchClick = () => {
    setNavPath("search")
    // navigate("/search")
  }

  const backClick = () => {
    gsap.to(".search-btn", {
      y: -20,
      opacity: 0,
    })
    gsap.to(".back-btn", {
      y: -20,
      opacity: 0,
      delay: .2
    })
    gsap.to(".search-bar-nav", {
      width: "0px",
      duration: .3,
      delay: .4
    })


    gsap.to(".search-bar-nav2", {
      width: "0px",
      duration: .5,
      delay: .3
    })
    gsap.to(".search-bar-container", {
      display: "none",
      delay: .7
    })
    gsap.to(".upIconAnime", {
      y: 0,
      opacity: 1,
      duration: .2,
      delay: 1.4,
      stagger: .2
    })
    gsap.to(".nav-mobile .nav-icon",{
      y:0,
      opacity:1,
      stagger:.2,
      delay: 1.5,
      display:"flex"
     })
     gsap.to(".nav-mobile .add-icon",{
      y:0,
      opacity:1,
      delay:2,
      display:"flex"
     })

     gsap.to(".search-bar-container2",{
      display:"none",
      width:"100%",
      delay: .8
     })

  }

const handleMobileSearchClick = () => {
   gsap.to(".nav-mobile .nav-icon",{
    y:-20,
    opacity:0,
    duration:.2,
    stagger:.1,
    display:"none"
   })
  
   gsap.to(".nav-mobile .add-icon",{
    y:-20,
    opacity:0,
    delay:.2,
    display:"none"
   })
   gsap.to(".search-bar-container2",{
    display:"flex",
    width:"100%",
    delay:.8
   })
   gsap.to(".search-bar-nav2",{
    width:"70%",
    duration:.6,
    delay:1.8
   })
   
}

  return (
    <>
      <div className='nav-container' >
        <div className='nav-wrapper'>
          <div className='logo' >logo</div>
          <ul>
            <Link to="/" onClick={() => setNavPath("home")}>
              {
                pathname === "/" ?
                  <svg className='nav-icon upIconAnime' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20Z"></path></svg>
                  :
                  <svg className='nav-icon upIconAnime' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19Z"></path></svg>

              }
            </Link>
            <Link to="/search" onClick={handleSearchClick}>
              {
                pathname === "/search" ?
                  <svg className='nav-icon upIconAnime' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168Z"></path></svg>
                  :
                  <svg className='nav-icon upIconAnime' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
              }
            </Link>

            <div className='search-bar-container' >
              <div className='back-btn' onClick={backClick} >
                <Link to="/">
                  <svg className="back-icon-nav" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
                </Link>
              </div>
              <input className='search-bar-nav' placeholder='Search' />
              <div className='search-btn'>
                <svg className='search-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
              </div>
            </div>

            <Link to="/notificaton" onClick={() => setNavPath("notification")}>
              {
                pathname === "/notificaton" ?
                  <svg className='nav-icon upIconAnime' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C16.9706 2 21 6.04348 21 11.0314V20H3V11.0314C3 6.04348 7.02944 2 12 2ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"></path></svg>
                  :
                  <svg className='nav-icon upIconAnime' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 18H19V11.0314C19 7.14806 15.866 4 12 4C8.13401 4 5 7.14806 5 11.0314V18ZM12 2C16.9706 2 21 6.04348 21 11.0314V20H3V11.0314C3 6.04348 7.02944 2 12 2ZM9.5 21H14.5C14.5 22.3807 13.3807 23.5 12 23.5C10.6193 23.5 9.5 22.3807 9.5 21Z"></path></svg>
              }
            </Link>
            <Link to="/setting" onClick={() => setNavPath("setting")}>
              {
                navPath === "setting" ?
                  <svg className='nav-icon upIconAnime' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"></path></svg>
                  :
                  <svg className='nav-icon upIconAnime' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM12 3.311L4.5 7.65311V16.3469L12 20.689L19.5 16.3469V7.65311L12 3.311ZM12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"></path></svg>
              }
            </Link>
          </ul>
          <div className='profile-btns' >
            <div>
              <svg className='nav-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21.7267 2.95694L16.2734 22.0432C16.1225 22.5716 15.7979 22.5956 15.5563 22.1126L11 13L1.9229 9.36919C1.41322 9.16532 1.41953 8.86022 1.95695 8.68108L21.0432 2.31901C21.5716 2.14285 21.8747 2.43866 21.7267 2.95694ZM19.0353 5.09647L6.81221 9.17085L12.4488 11.4255L15.4895 17.5068L19.0353 5.09647Z"></path></svg>
            </div>
            <Link to='/profile'>
              <svg className='nav-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path></svg>
            </Link>
          </div>
        </div>
      </div>
      <div className={pathname === "/" ? "nav-mobile dropShadow" : "nav-mobile"} >
        <Link to='/'>
          <svg className='nav-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19Z"></path></svg>
        </Link>
        <Link onClick={handleMobileSearchClick} to="/search">
          <svg className='nav-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
        </Link>
        <div className='search-bar-container2'  >
          <div className='back-btn' onClick={backClick} >
            <Link to="/">
              <svg className="back-icon-nav2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
            </Link>
          </div>
          <input className='search-bar-nav2' placeholder='Search' />
          <div className='search-btn'>
            <svg className='search-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
          </div>
        </div>

        <div className='add-icon '>
          <svg className='nav-icon ' style={{ width: "40px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
        </div>
        <Link to="/profile">
          <svg className='nav-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path></svg>
        </Link>
        <div>
          <svg className='nav-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L21.5 6.5V17.5L12 23L2.5 17.5V6.5L12 1ZM12 3.311L4.5 7.65311V16.3469L12 20.689L19.5 16.3469V7.65311L12 3.311ZM12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12C16 14.2091 14.2091 16 12 16ZM12 14C13.1046 14 14 13.1046 14 12C14 10.8954 13.1046 10 12 10C10.8954 10 10 10.8954 10 12C10 13.1046 10.8954 14 12 14Z"></path></svg>
        </div>
      </div>
    </>
  )
}

export default Nav