import React, { useContext, useEffect, useRef, useState } from 'react'
import "./stories.css"
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { motion } from "framer-motion"
import html2canvas from 'html2canvas';
import { firebaseStorage } from '../../firebase/firebaseConfig';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { UserDataContext } from '../../../context/context';

function AddStory({setShowAddStory}) {

    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)

    const [showUploadBtn, setShowUploadBtn] = useState(true)

    const userData = useContext(UserDataContext).userData

    const increase = () => {
        setScale(scale + 0.2)
    }
    const decrease = () => {
        setScale(scale - 0.2)
    }

    const captureRef = useRef(null);
    const [screenShot, setScreenShot] = useState();
    const [file, setFile] = useState();

    const handleCaptureClick = async () => {
        if (captureRef.current) {
            const canvas = await html2canvas(captureRef.current);
            const imgData = canvas.toDataURL('image/png');
            setScreenShot(imgData)
        }
    };

    const uploadScreenshot = async (dataUrl) => {
        handleCaptureClick();
        const response = await fetch(screenShot);
        const blob = await response.blob();
        const file = new File([blob], 'image.jpg', { type: blob.type })
        console.log(file)
        const storageRef = ref(firebaseStorage, `/stories/${file.name}-${userData.username}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on("state_changed", (snapshot) => {
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                console.log(url)
            })
        })
    };



    return (
        <div className='story-board-container create-story'>
            <div className='story-header'>
                <div className='text-function'>
                  <div>
                    
                  </div>
                  <button>Aa</button>
                </div>
            </div>
            <div className='story-board' ref={captureRef}>
                <div >
                    <motion.img
                        drag
                        style={{ scale: `${scale}`, rotate: `${rotate}deg` }} src="../../../../image/doodle-one.jpg" alt="test" />
                </div>
            </div>
            <div className='story-reaction-container'>
                {
                    showUploadBtn ?
                        <div style={{ display: "flex", gap: ".8rem", width: "100%" }}>
                            <button className='close-story-btn' onClick={()=>setShowAddStory(false)}>
                                <svg style={{ width: "25px", color: "white" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
                            </button>
                            <button className='edit-story-btn' onClick={()=>setShowUploadBtn(false)}> Edit</button>
                            <button className='upload-story-btn'> upload</button>
                        </div>
                        :
                        <>
                            <button className='increase-btn' onClick={increase}>
                                <svg style={{ width: "30px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                            </button>
                            <button className='decrease-btn' onClick={decrease}>
                                <svg style={{ width: "30px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5 11V13H19V11H5Z"></path></svg>
                            </button>
                            <button className='rotate-btn' onClick={() => setRotate(rotate + 90)} >
                                <svg style={{ width: "25px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 10.5858L21.8284 8.75736L23.2426 10.1716L19 14.4142L14.7574 10.1716L16.1716 8.75736L18 10.5858V8C18 6.34315 16.6569 5 15 5H11V3H15C17.7614 3 20 5.23858 20 8V10.5858ZM13 9C13.5523 9 14 9.44772 14 10V20C14 20.5523 13.5523 21 13 21H3C2.44772 21 2 20.5523 2 20V10C2 9.44772 2.44772 9 3 9H13ZM12 11H4V19H12V11Z"></path></svg>
                            </button>
                            <button className='done-btn' onClick={() => setShowUploadBtn(true)}>
                                <svg style={{ width: "30px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9.9997 15.1709L19.1921 5.97852L20.6063 7.39273L9.9997 17.9993L3.63574 11.6354L5.04996 10.2212L9.9997 15.1709Z"></path></svg>
                            </button>
                        </>
                }
            </div>
        </div>
    )
}

export default AddStory

