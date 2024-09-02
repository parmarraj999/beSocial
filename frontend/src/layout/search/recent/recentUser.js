import React, { useEffect, useState } from 'react'
import './recentUser.css'
import axios from "axios"
import { Link } from 'react-router-dom'

function RecentUser() {

  const [data, setData] = useState([])

  const id = window.localStorage.getItem("userId")

  useEffect(() => {
    axios.get("https://besocial-q86i.onrender.com/getRecentSignup")
      .then(result => {
        console.log(result)
        setData(result.data)
      })
  }, [])

  return (
    <div className='recent-user-container' >
      <div className='recent-user-list' >
        {
          data?.map((data) => {
            return (
              <Link to={"/user-profile/" + data._id} className='recent-user' >
                {
                  data.profile_picture ?
                    <img src={data.profile_picture} /> :
                    <img src='../../../image/profile.png' />
                }
              </Link>
            )
          })
        }
      </div>
    </div>
  )
}

export default RecentUser