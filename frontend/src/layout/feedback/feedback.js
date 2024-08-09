import React, { useState } from 'react'
import './feedback.css';
import { Link, useNavigate } from 'react-router-dom';
import FeedbackForm from './feedbackForm';

function Feedback() {

  const navigate = useNavigate();
  const [showForm, setShowForm] = useState(false)
  return (
    <div className='feedback-container'>
      <div className='feedback-header'>
        <div className='feedback-back' onClick={()=>navigate(-1)}>
        <svg style={{width:"30px",color:'black'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
        </div>
        <h3>Community</h3>
      </div>
      {
        showForm ? <FeedbackForm setShowForm={setShowForm} /> : ""
      }
      <div className='feeds-container' >
        <div className='feedback-box' >
          <div className='feed-header' >
            <Link className='feedback-profile'>
              <img src='https://i.pinimg.com/564x/71/3a/3c/713a3c42781fe63b9d3bd644f780cce7.jpg' />
              <div>
                <h4>Raj Parmar</h4>
                <h5>@rajparmar</h5>
              </div>
            </Link>
            <div className='bug-type'>Bug</div>
          </div>
          <div className='feedback-content'>
            <p>this is serious problem in this app</p>
          </div>
        </div>
      </div>
      <div className='feedback-upload-btn' onClick={()=>setShowForm(true)} >
        <svg style={{ width: "26px", color: "black" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.45455 19L2 22.5V4C2 3.44772 2.44772 3 3 3H21C21.5523 3 22 3.44772 22 4V18C22 18.5523 21.5523 19 21 19H6.45455ZM4 18.3851L5.76282 17H20V5H4V18.3851ZM13 11V15H11V11H8L12 7L16 11H13Z"></path></svg>
      </div>
    </div>
  )
}

export default Feedback