import React from 'react'
import "./stories.css"

function StoryBoard() {

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
    <div className='story-board-container'>
       <div className='story-slider'>
         <div className='story-slider-box' ></div>
         <div className='story-slider-box' ></div>
         <div className='story-slider-box' ></div>
         <div className='story-slider-box' ></div>
         <div className='story-slider-box' ></div>
         <div className='story-slider-box' ></div>
         <div className='story-slider-box' ></div>
         <div className='story-slider-box' ></div>
         <div className='story-slider-box' ></div>
       </div>
       <div className='story-board' >
        
       </div>
    </div>
  )
}

export default StoryBoard