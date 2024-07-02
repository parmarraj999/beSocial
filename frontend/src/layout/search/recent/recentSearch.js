import React, { useEffect, useState } from 'react'
import './recentSearch.css'
import axios from "axios"

function RecentSearch() {

  const [data,setData] = useState([])
  // const [deleteData,setDeleteData] = useState();
  
  const id = window.localStorage.getItem("userId")
  useEffect(()=>{
    axios.get("http://localhost:5000/getSearchList/"+ id).then((res)=>{
      setData(res.data[0].search)
      console.log(res.data[0].search)
    })
  },[])

  const handleDeleteRecent = (deleteData) => {
    axios.put("http://localhost:5000/deleteRecent/"+id,{
      deleteData : deleteData
    })
  }

  // console.log(data)
  
  return (
    <div className='recent-search-container' >
      {
        data?.map((data)=>{
          return(
         <div className='search-text'>
              <h5>{data?.Name}</h5>
              <svg onClick={handleDeleteRecent(data?.Name)} className='nav-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
            </div>
          )
        })
      }
    </div>
  )
}

export default RecentSearch