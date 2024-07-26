import React from 'react'
import './followList.css'

function FollowingList({setShowList, data}) {

    console.log(data)

  return (
    <div className='follow-list-container' >
        <div className='cancel-layer' onClick={()=>setShowList(false)} ></div>
        <div className='follow-list-wrapper' >
            <div className='box-line' ></div>
            <h2>You Follow</h2>
            <div className='follow-list'>
              <div className='follow-list-item' ></div>
            </div>
        </div>
    </div>
  )
}

export default FollowingList