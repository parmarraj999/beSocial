import React from 'react'
import '../notification.css'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

function ProgressBar({percent,setShowProgress ,setShowPost}) {

    const tl = gsap.timeline();
    useGSAP(()=>{
      tl.from(".credential-notify-container",{
        y:-80,
        delay:.4,
      })
      tl.to(".credential-notify-container",{
        y:0,
        duration:.2
      })
      tl.to(".credential-notify-container",{
        width:"350px",
        height:"50px",
        duration:.4,
        borderRadius:"2rem",
        padding:"0"
      })
      if(window.innerWidth < 765){
        tl.to(".credential-notify-container",{
          width:"94%",
          height:"50px",
          duration:.4,
          borderRadius:"1.2rem"
        })
      }
     
    })

    if(percent === 100){
        setTimeout(() => {
            tl.to(".credential-notify-container",{
                height:"280px",
                duration:.2,
              })
            tl.to(".bar",{
                background:"#F5C1D3",
                duration:.2,
              })
            tl.to(".done-img",{
                display:"flex"
            })
            tl.to(".done-img",{
                display:"none",
                delay:3
            })
            tl.to(".credential-notify-container",{
                height:"50px",
            })
            tl.to(".credential-notify-container",{
                width:"50px",
            })
            tl.to(".credential-notify-container",{
                y:-80,
                delay:.2,
              })
            }, 500);
            setTimeout(() => {
                setShowPost(false)
            }, 7000);
    }

    return (
        <div className='credential-notify-container' >
           <div className='progress-bar' >
             <div className='bar' style={{width:`${percent}%`}} >
             <div className='done-img' >
                    <video autoPlay muted>
                        <source src='../../../image/handshake.mp4' />
                    </video>
                </div>
             </div>
           </div>
        </div>
    )
}

export default ProgressBar