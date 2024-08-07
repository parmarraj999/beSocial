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

    const uploadStory = async (dataUrl) => {
        const math = Math.floor(Math.random()*190238409238)
        console.log(math)
        handleCaptureClick();
        const response = await fetch(screenShot);
        const blob = await response.blob();
        const file = new File([blob], 'image.jpg', { type: blob.type })
        console.log(file)
        const storageRef = ref(firebaseStorage, `/stories/${file.name}-${userData.username}-${math}`)
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
                <div style={{display:"flex",alignItems:'center',gap:".8rem"}}>
                    <div className='story-header-profile'>
                        <img src={userData.profile_picture} />
                    </div>
                    <h3 >{userData.username}</h3>
                </div>
                <div style={{display:"flex",alignItems:'center',gap:".4rem"}}>
                <svg style={{width:"30px",color:"grey"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.25022 4 6.82447 5.38734 5.38451 7.50024L8 7.5V9.5H2V3.5H4L3.99989 5.99918C5.82434 3.57075 8.72873 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"></path></svg>
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
                            <button className='upload-story-btn' onClick={uploadStory}> upload</button>
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

