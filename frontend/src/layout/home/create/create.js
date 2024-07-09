import React, { useState } from 'react'
import "./create.css"
import axios from 'axios'
import gsap from 'gsap';
import { useNavigate } from 'react-router';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { firebaseStorage } from '../../firebase/firebaseConfig';
import ProgressBar from '../../../component/notification/progressBar';
import { useGSAP } from '@gsap/react';

function Create({ setShowPost, id }) {

    const [caption, setCaption] = useState();

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState();
    const [filePreview, setFilePreview] = useState();
    const [mediaType, setMediaType] = useState();
    const [percent, setPercent] = useState(0);
    const [error, setError] = useState();

    const [showProgress, setShowProgress] = useState(false);


    const navigate = useNavigate();

    const handleFile = (e) => {

        const file = e.target.files[0];
        setFile(file)
        setFileName(file.name)
        setMediaType(file.type)
        if (file) {
            setError(null)
            setFilePreview(URL.createObjectURL(file))
        }
    }

    // console.log(percent)

    const tl = gsap.timeline();
    useGSAP(()=>{
        tl.from(".create-card",{
            opacity:0
        })
    })

    const handleAdd = () => {

        if (file === null) {
            setError("Please Select Image for Post")
            return
        }

        setShowProgress(true)
        const storageRef = ref(firebaseStorage, `/posts/${fileName}`)
        const uploadTask = uploadBytesResumable(storageRef, file)
        uploadTask.on("state_changed",
            (snapshot) => {
                try {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setPercent(progress)
                        if (progress === 100) {
                            axios.post("http://localhost:5000/addPost/" + id, {
                                postedBy: id,
                                caption: caption,
                                mediaUrl: url,
                                mediaType: mediaType
                            })
                                .then(() => {
                                    console.log("done ")
                                })
                                .catch((err) => {
                                    console.log(err)
                                })
                                tl.to(".create-card",{
                                    opacity:0
                                })
                        }
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        )


    }

    return (
        <div className='create-container' >
            {
                showProgress ?
                    <ProgressBar setShowPost={setShowPost} percent={percent} setShowProgress={setShowProgress} /> : ""
            }
            <div className='create-card' >
                <div className='line'></div>
                <p>Todays Post </p>
                <textarea placeholder='Whats in your Mind...' onChange={(e) => setCaption(e.target.value)} />
                {
                    filePreview ?
                        <div className='post-img-preview' >
                            <img className='preview-img' src={filePreview} />
                        </div> : ""
                }
                <div className='card-btn'>
                    {
                        filePreview ?
                            <svg onClick={() => setFilePreview()} style={{ width: "35px", color: "grey", borderRadius: "20px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg> :
                            <label for="fileInput" >
                                <svg style={{ width: "35px", color: "grey", borderRadius: "20px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M2.9918 21C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918ZM20 15V5H4V19L14 9L20 15ZM20 17.8284L14 11.8284L6.82843 19H20V17.8284ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z"></path></svg>
                            </label>
                    }
                    <input type='file' id="fileInput" onChange={handleFile} />
                    <div style={{ display: "flex", alignItems: "center", gap: ".8rem" }}>
                        <button className='cancel-btn' onClick={() => setShowPost(false)}>Cancel</button>
                        <button className='post-btn' onClick={handleAdd}>Post</button>
                    </div>
                </div>
                {
                    error ?
                        <div className='error-msg' >
                            <p>{error}</p>
                        </div> : ""
                }
            </div>
        </div>
    )
}

export default Create