import React, { useContext, useState } from 'react'
import './feedback.css'
import { Link } from 'react-router-dom';
import { UserDataContext } from '../../context/context';

function FeedbackForm({ setShowForm }) {

    const [step, setStep] = useState(true)

    // ====== data ======= 
    const userData = useContext(UserDataContext).userData;
    const [feedbackType, setFeedbackType] = useState();
    const [feedback, setFeedback] = useState();

    return (
        <div className='feedback-form' >
            {
                step ? <div className='feedback-type'>
                    <h3>Choose feedback Type </h3>
                    <div>
                        <div onClick={() => {setFeedbackType("feature")
                            setStep(false)
                        }} className='feature-type'>Feauture</div>
                        <div onClick={() => {setFeedbackType("Bug")
                            setStep(false)
                        }} className='bug-type'>Bug</div>
                    </div>
                </div> :
                    <div className='feedback-card' >
                        <div className='feed-header' >
                            <Link className='feedback-profile'>
                                <img src='https://i.pinimg.com/564x/71/3a/3c/713a3c42781fe63b9d3bd644f780cce7.jpg' />
                                <div>
                                    <h4>Raj Parmar</h4>
                                    <h5>@rajparmar</h5>
                                </div>
                            </Link>
                            <div style={{padding:".5rem 1rem",background:"rgba(183, 183, 183,0.4)",color:"black",fontSize:"18px",fontWeight:'600',borderRadius:"5px"}}>{feedbackType}</div>
                        </div>
                        <div className='feedback-content'>
                            <textarea placeholder='Bug or Feature' />
                        </div>
                        <div className='button-container'>
                            <button className='cancel-btn-feedback' onClick={() => setShowForm(false)} >Cancel</button>
                            <button className='post-btn-feedback'>Post</button>
                        </div>
                    </div >
            }
        </div >
    )
}

export default FeedbackForm