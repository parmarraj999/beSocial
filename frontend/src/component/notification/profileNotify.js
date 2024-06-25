import React, { useContext } from 'react'
import '../notification.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { UserDataContext } from '../../context/context';

function ProfileNotify() {

    const tl = gsap.timeline();
    useGSAP(() => {
        tl.from(".profile-notify-container", {
            y: -80,
            delay: .4
        })
        tl.to(".profile-notify-container", {
            y: 0,
            duration: .2
        })
        tl.to(".profile-notify-container", {
            width: "350px",
            height: "50px",
            duration: .4,
        })
        if (window.innerWidth < 765) {
            tl.to(".profile-notify-container", {
                width: "94%",
                height: "50px",
                duration: .4,
                borderRadius: "1.2rem"
            })
        }
        tl.from(".profile-notify-head ", {
            y: -40,
            opacity: 0,
            stagger: .5
        })
    })

    const handleDown = () => {
        tl.to(".profile-notify-container", {
            height: "180px",
            borderRadius: "1.2rem",
        })
        tl.from(".complete-task-list > li", {
            y: 30,
            opacity: 0,
            stagger: .3
        })
        tl.from(".close", {
            y: 30,
            opacity: 0,
        })
        tl.to(".profile-notify-container", {
            y: 0,
            duration: .2
        })
    }

    const handleClose = () => {
        tl.to(".profile-notify-container", {
            height: "50px",
            borderRadius: "1.2rem",
        })
        tl.to(".profile-notify-head", {
            y: -40,
            opacity: 0,
            stagger: .5
        })
        tl.to(".profile-notify-container", {
            width: "50px",
            height: "50px",
            duration: .4,
            borderRadius: "2rem"
        })
        tl.to(".profile-notify-container", {
            y: -80,
            duration: .2
        })
    }

    const userData = useContext(UserDataContext)

    return (
        <div className='profile-notify-container' >
            <div className='profile-notify-head'>
                <div style={{ display: "flex", gap: ".4rem", alignItems: "center" }}>
                    <svg style={{ width: "30px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(128,255,0,1)"><path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM18 12C18 15.3137 15.3137 18 12 18C8.68629 18 6 15.3137 6 12H12V6C15.3137 6 18 8.68629 18 12Z"></path></svg>
                    <h3>Complete Your Profile </h3>
                </div>
                <div onClick={handleDown} className='down-arrow'>
                    <svg style={{ width: "30px", color: 'grey' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path></svg>
                </div>
            </div>
            <div className='complete-task-list' >
                {
                    userData.userData.profile_picture === "" ? <li>Add Profile Picture</li> : ""
                        
                }
                {
                    userData.userData.bio === "null" ? "" :
                    <li>Add Bio</li>
                }
            </div>
            <div className='close' onClick={handleClose} > Close </div>
        </div>
    )
}

export default ProfileNotify
