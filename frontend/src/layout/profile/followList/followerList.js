import React from 'react'
import './followList.css'

function FollowerList({setShowList, data}) {

    console.log(data)

  return (
    <div className='follow-list-container' >
        <div className='cancel-layer' onClick={()=>setShowList("")} ></div>
        <div className='follow-list-wrapper' >
            <div className='box-line' ></div>
            <h2>Your Followers</h2>
            <div className='follow-list'>
              {
                data.map((data)=>{
                  return(
                    <div className='follow-list-item' >
                      <div>
                        <h3>{data.followerUsername}</h3>
                        <h4>{data.followerName}</h4>
                      </div>
                    </div>
                  )
                })
              }
            </div>
        </div>
    </div>
  )
}

export default FollowerList