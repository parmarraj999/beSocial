import React, { useContext, useState } from 'react'
import "./uploadPic.css"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { firebaseStorage } from '../../firebase/firebaseConfig'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import axios from "axios"
import { UserDataContext, UserIDContext, UserProfileContext } from '../../../context/context'
import { useNavigate } from 'react-router'

function UploadPic({id}) {

    const [file, setFile] = useState();
    const [fileName, setFileName] = useState();
    const [previewFile, setPreviewFile] = useState();
    const [percent, setPercent] = useState(0)

    const navigate = useNavigate()

    const tl = gsap.timeline();
    useGSAP(() => {
        tl.from(".pic-upload-container", {
            y: -80,
            opacity: 0
        })
        tl.to(".pic-upload-container", {
            width: "380px"
        })
        tl.from(".pic-upload-container > h3", {
            y:30,
            opacity:0
        })
        if (window.innerWidth < 765) {
            tl.to(".pic-upload-container", {
                width: "94%",
                height: "50px",
                duration: .4,
            })
        }
        tl.to(".pic-upload-container", {
            height: "260px"
        })

    })

    const handleFile = (e) => {
        const file = e.target.files[0];
        setFile(file)
        setFileName(file.name)
        if (file) {
            setPreviewFile(URL.createObjectURL(file))
        }
        gsap.to(".pic-upload-container > h3, .input-form", {
            y: -40,
            opacity: 0,
            display: "none"
        })
        gsap.to(".progress-bar", {
            display: "block"
        })
        tl.to(".pic-upload-container", {
            height: "fit-content"
        })
        gsap.from(".preview-img", {
            delay: 1,
            opacity: 0,
            display: "none"
        })
    }

    const handleUpload = () => {
        gsap.to(".preview-img", {
            opacity: 0
        })
        gsap.to(".upload-img-btn", {
            y: -40,
            opacity: 0,
            display: "none"
        })
        tl.to(".pic-upload-container", {
            height: "50px"
        })

        const imageFormat = file.type;
        const storageRef = ref(firebaseStorage, `/profile-photo/${fileName}`)
        const uploadTask = uploadBytesResumable(storageRef, file, {
            contentType: imageFormat
        })
        uploadTask.on("state_changed",
            (snapshot) => {
                try {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (url) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setPercent(progress)
                        if(progress === 100){
                            axios.put("http://localhost:5000/add-profile/" + id,{
                                profile_picture : url
                            })
                            .then((res)=>{
                                console.log(res)
                                navigate("/")
                            })
                        }
                    })
                } catch (error) {
                    console.log(error)
                }
            }
        )
    }

    const handleNo = () => {
        gsap.to(".upload-img-btn", {
            y: 40,
            opacity: 0,
            display: "none"
        })
        gsap.to(".cancel-img-btn", {
            y: 40,
            opacity: 0,
            display: "none"
        })
        gsap.to(".upload-img-input", {
            y: 40,
            opacity: 0,
            delay:.4,
            display: "none"
        })
        tl.to(".pic-upload-container > h3", {
            y:30,
            opacity:0,
            delay:.5
        })
        tl.to(".pic-upload-container", {
            height: "50px"
        })
        tl.to(".pic-upload-container", {
            width: "50px"
        })
        tl.to(".pic-upload-container", {
            y:-80,
            opacity:0
        })
    }

    if (percent === 100) {
        gsap.to(".progress-bar", {
            display: "none",
            delay: .5
        })
        tl.to(".pic-upload-container", {
            width: "50px",
            delay: 2
        })
        gsap.to(".done-container",{
            display:"flex",
            delay:1.8
        })
        tl.to(".pic-upload-container", {
            y: -80,
            opacity: 0,
            delay:1
        })
        gsap.to(".pic-upload-container h3",{
            y:20,
            opacity:0
        })
    }

    return (
        <div className='pic-upload-container' >
            <div className='progress-bar' >
                <div className='bar' style={{ width: `${percent}%` }} ></div>
            </div>
            <div className='done-container' >
                <svg className='nav-icon' style={{color:"#80ff00"}}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.602 13.7599L13.014 15.1719L21.4795 6.7063L22.8938 8.12051L13.014 18.0003L6.65 11.6363L8.06421 10.2221L10.189 12.3469L11.6025 13.7594L11.602 13.7599ZM11.6037 10.9322L16.5563 5.97949L17.9666 7.38977L13.014 12.3424L11.6037 10.9322ZM8.77698 16.5873L7.36396 18.0003L1 11.6363L2.41421 10.2221L3.82723 11.6352L3.82604 11.6363L8.77698 16.5873Z"></path></svg>
            </div>
            <h3>Upload profile Photo</h3>
            <div className='input-form'>
                <input type="file" className='upload-img-input' onChange={(e) => handleFile(e)} />
            </div>
            <div style={{ display: "flex", justifyContent: "center", paddingBottom: ".5rem" }} >
                <img className='preview-img' src={previewFile} />
            </div>
            <div style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                <div onClick={handleNo} className='cancel-img-btn'>
                <svg className='nav-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
                </div>
                <div className='upload-img-btn' onClick={handleUpload} >
                    <svg className='nav-icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 19H21V21H3V19ZM13 5.82843V17H11V5.82843L4.92893 11.8995L3.51472 10.4853L12 2L20.4853 10.4853L19.0711 11.8995L13 5.82843Z"></path></svg>
                </div>
            </div>
        </div>
    )
}

export default UploadPic