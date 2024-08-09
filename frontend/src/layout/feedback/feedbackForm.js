import React, { useContext, useState } from 'react'
import './feedback.css'
import { Link } from 'react-router-dom';
import { UserDataContext } from '../../context/context';
import axios from "axios"

function FeedbackForm({ setShowForm, getData }) {

    const [step, setStep] = useState(true)
    const date = new Date();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const day = date.getDay();
    const month = date.getMonth();

    const monthArray = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"]

    const uploadDate = `${hour}:${minute}, ${day} ${monthArray[month]}`

    // ====== data ======= 
    const userData = useContext(UserDataContext).userData;
    const [feedbackType, setFeedbackType] = useState();
    const [feedback, setFeedback] = useState("");

    const handleUploadFeedback = async() => {
        axios.post("http://localhost:5000/add-feedback",{
            userId : userData._id,
            username : userData.username,
            userProfile : userData.profile_picture,
            name : userData.name,
            feedbackType : feedbackType,
            feedback : feedback,
            uploadDate : uploadDate,
        })
        .then((result)=>{
            console.log(result)
            getData();
            setShowForm(false)
        })
    }

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
                                <img src={userData.profile_picture} />
                                <div>
                                    <h4>Raj Parmar</h4>
                                    <h5>@rajparmar</h5>
                                </div>
                            </Link>
                            <div style={{padding:".5rem 1rem",background:"rgba(183, 183, 183,0.4)",color:"black",fontSize:"18px",fontWeight:'600',borderRadius:"5px"}}>{feedbackType}</div>
                        </div>
                        <div className='feedback-content'>
                            <textarea placeholder='Bug or Feature' onChange={(e)=>setFeedback(e.target.value)} />
                        </div>
                        <div className='button-container'>
                            <button className='cancel-btn-feedback' onClick={() => setShowForm(false)} >Cancel</button>
                            <button className='post-btn-feedback' onClick={handleUploadFeedback}>Post</button>
                        </div>
                    </div >
            }
        </div >
    )
}

export default FeedbackForm