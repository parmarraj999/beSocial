import React from 'react'
import "./stories.css"


function StoryBoard({ setShowStory, storyId }) {

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
      <div className='story-reaction-container'>
        <button className='story-like-btn'>
          <svg style={{ width: '25px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13 10H20L11 23V14H4L13 1V10Z"></path></svg>
        </button>
        <h4>@username</h4>
        <button onClick={() => setShowStory(false)}>
          <svg style={{ width: "25px", color: "black" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
        </button>
      </div>
    </div>
  )
}

export default StoryBoard