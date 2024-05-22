import React from 'react'
import "./auth.css"
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'

function Login({setForm}) {

    useGSAP(()=>{
        gsap.to(".form-box",{
            height:"100%",
            duration:1,
        })  
        gsap.from(".form-box > h1",{
            y:-20,
            opacity:0,
            duration:.2,
            delay:1
        })
        gsap.fromTo(".form-box > form > input",{
            y:-20,
            opacity:0,
            duration:.2,
            delay:1.2,
            stagger:.4
        },{
            y:0,
            opacity:1,
            duration:.2,
            delay:1.2,
            stagger:.4
        })
        gsap.fromTo(".form-submit > button",{
            y:-20,
            opacity:0,
            duration:.2,
            delay:1.8,
            stagger:.2
        },{
            opacity:1,
            y:0,
            duration:.2,
            delay:1.8,
            stagger:.2
        })  
        gsap.fromTo(".close-btn",{
            rotate:460,
            duration:2.2,
            y:110,
        },{
            rotate:0,
            duration:2.2,
            y:0,
        })
    })

    const handleClose = ()=>{
        gsap.to(".form-box > h1",{
            y:-20,
            opacity:0,
            duration:.2
        })
        gsap.to(".form-box > form > input",{
            y:-20,
            opacity:0,
            duration:.2,
            delay:.2,
            stagger:.4
        })
        gsap.to(".form-box",{
            height:"0%",
            duration:1,
            delay:2
        })  
        gsap.to(".form-submit > button",{
            y:-20,
            opacity:0,
            duration:.2,
            delay:1.2,
            stagger:.2
        })  
        gsap.to(".close-btn",{
            rotate:460,
            duration:2.2,
            y:110,
        })
        setTimeout(() => {
            setForm("")
        }, 3000);
    }
    const handleSignClick = ()=>{
        setForm("signup")
    }

    return (
        <div className='form-container'>
            <div className='form-box'>
                <h1>Welcome</h1>
                <form>
                    <input placeholder='Email' type="text" className='' name="lname" />
                    <input placeholder='Password' type="text" className='' name="lname" />

                    <div className='form-submit'>
                        <button className='one-btn'>Log In</button>
                        <button className='two-btn' onClick={handleSignClick}>Sign Up</button>
                    </div>

                </form>
            </div>
            <div className='form-btn' >
                <div className='close-btn' onClick={handleClose}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="36" height="36" fill="rgba(255,255,255,1)"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
                </div>
            </div>
        </div>
    )
}

export default Login