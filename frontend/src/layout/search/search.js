import React, { useContext, useEffect, useState } from 'react'
import "./search.css"
import axios from 'axios'
import gsap from 'gsap'
import { useGSAP } from "@gsap/react"
import RecentSearch from './recent/recentSearch'
import { Link, useNavigate } from 'react-router-dom'
import { SearchListData, UserDataContext } from '../../context/context'
import UserList from './userList/userList'
import UserProfilePage from '../userProfile/userProfile'

function Search() {

  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState("")
  const [searchData, setSearchData] = useState([]);
  const searchDataContext = useContext(SearchListData)

  const handleSearchInput = (e) => {
    searchDataContext.setSearchText(e.target.value)
    setSearchText(e.target.value)
    axios.post("http://localhost:5000/getSearchUser", {
      searchText: `${e.target.value}`
    })
      .then(result => {
        console.log(result.data)
        setSearchData(result.data)
        searchDataContext.setSearchData(result.data)
        if (result.data.length === 0) {
          console.log("user Not Found")
        }
      })
  }

  const navigate = useNavigate()

  useGSAP(() => {
    gsap.from(".search-bg-img", {
      opacity: 0,
      duration: .5,
    })
    gsap.from(".back-btn", {
      opacity: 0,
      delay: 1.3
    })
    gsap.from(".search-bar-nav", {
      opacity: 0,
      delay: 1.5
    })
    gsap.from(".search-btn", {
      opacity: 0,
      delay: 1.7
    })
  })

  const backClick = () => {
    gsap.to(".search-btn", {
      opacity: 0,
    })
    gsap.to(".search-bar-nav", {
      opacity: 0,
      delay: .2
    })
    gsap.to(".back-btn", {
      opacity: 0,
      delay: .5
    })
    setTimeout(() => {
      navigate("/")
    }, 600);
  }

  // console.log(userData.userData._id)

  // const getList = () => {
  //   axios.get("http://localhost:5000/getSearchList/" + userData.userData?._id).then((res) => {
  //     if (res) {
  //       setData(res.data[0]?.search)
  //     }
  //     else {
  //       console.log('data not fetched')
  //     }
  //     console.log(res.data[0]?.search)
  //   })
  // }

  // useEffect(() => {
  //   getList();
  // }, [])

  const handleSearch = () => {
    // axios.post("http://localhost:5000/getSearchUser", {
    //   searchText: `${searchText}` 
    // })
    //   .then(result => {
    //     console.log(result.data)
    //     if(result.data.length === 0){
    //       console.log("user Not Found")
    //     }
    //     setSearchData(result.data)
    //   })
    // axios.put("http://localhost:5000/search/" + userData.userData._id, {
    //   searchData: searchText
    // })
    // getList();
  }

  return (
      <div className='search-container'>
        <div className='search-input-container' >
          <div className='back-btn' onClick={backClick} >
            <div>
              <svg className="back-icon-nav" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
            </div>
          </div>
          <input className='search-bar-nav' value={searchDataContext.searchText} placeholder='Search' onChange={handleSearchInput} />
          {/* {
          searchText === "" ? " " :
          <div className='search-btn' onClick={handleSearch} >
          <svg className='search-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
          </div>
          } */}
        </div>
        <div className='search-wrapper' >
          <div className='recent-search' >
            {
              searchDataContext.searchText === "" ?
                <div className='recent-list' >
                  <h4>Recent Search</h4>
                  <RecentSearch setSearchText={setSearchText} data={data} setData={setData} />
                </div> : <UserList searchData={searchData} />

            }
          </div>
        </div>
        <img className='search-bg-img' src='../../../image/search-bg.jpg' />
        {/* <UserExpend/> */}
      </div>
  )
}

export default Search