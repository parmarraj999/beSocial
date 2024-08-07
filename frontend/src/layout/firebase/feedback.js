import React from 'react'
import './feedback.css';
import { Link } from 'react-router-dom';

function Feedback() {
    return (
        <div className='feedback-container'>
            <div className='feeds-container' >
                <div className='feedback-box' >
                  <div className='feedback-header' >
                    <Link className='feedback-profile'>
                       <img src='https://i.pinimg.com/564x/71/3a/3c/713a3c42781fe63b9d3bd644f780cce7.jpg'/>
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
        </div>
    )
}

export default Feedback