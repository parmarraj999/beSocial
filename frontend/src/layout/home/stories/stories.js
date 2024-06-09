import "./stories.css"
import React from 'react'

function Stories() {

  const data = [
    {
      name: "user 1"
    },
    {
      name: "user 2"
    },
    {
      name: "user 3"
    },
    {
      name: "user 4"
    },
    {
      name: "user 5"
    },
    {
      name: "user 6"
    },
    {
      name: "user 7"
    },
    {
      name: "user 8"
    },
    {
      name: "user 9"
    },
  ]

  return (
    <div className='stories-container' >
      <div className="story-wrapper-box" >
        <div className="add-story-btn common-width" >
          <svg className="add-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.0001 10.9999L22.0002 10.9997L22.0002 12.9997L13.0001 12.9999L13.0001 21.9998L11.0001 21.9998L11.0001 12.9999L2.00004 13.0001L2 11.0001L11.0001 10.9999L11 2.00025L13 2.00024L13.0001 10.9999Z"></path></svg>
        </div>
        <h3 style={{ color: "grey" }} >Your Story</h3>
      </div>
      {
        data.map((data) => {
          return (
            <div className="story-wrapper-box" >
              <div className="story-img common-width" ></div>
              <h3 >{data.name}</h3>
            </div>
          )
        })
      }
  
    </div>
  )
}

export default Stories