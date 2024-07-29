import React from 'react'
import './followList.css'
import {Link} from "react-router-dom"

function FollowerList({setShowList, data}) {

    console.log(data)

    const followList = [...data].reverse()

  return (
    <div className='follow-list-container' >
        <div className='cancel-layer' onClick={()=>setShowList("")} ></div>
        <div className='follow-list-wrapper' >
            {/* <div className='box-line' ></div> */}
            <div style={{display:"flex",alignItems:"center",justifyContent:'space-between',width:"90%"}}>
            <h2>Your Followers</h2>
              <h3>{data.length}</h3>
            </div>
            <div className='follow-list'>
              {
                followList.map((data)=>{
                  return(
                    <Link to={"/user-profile/" + data.followerId} className='follow-list-item' >
                      <div>
                        <h3>{data.followerUsername}</h3>
                        <h4>{data.followerName}</h4>
                      </div>
                      <svg style={{width:"25px",color:"black"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
                    </Link>
                  )
                })
              }
            </div>
        </div>
    </div>
  )
}

export default FollowerList
