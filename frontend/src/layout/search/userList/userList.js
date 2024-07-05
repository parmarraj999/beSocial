import React, { useState } from 'react'
import "./userList.css"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import UserExpend from './userExpend'

function UserList({ searchData }) {

    const [showExpend, setShowExpend] = useState(false);

    useGSAP(() => {
        gsap.from(".search-user-box", {
            opacity: 0,
            duration: .6,
            stagger: .2
        })
    })
    
    const handleClick = () => {
        
    }

    // console.log(searchData)

    return (
        <div className='userList-container'>
            {
                searchData?.map((data) => {
                    return (
                        <div className='search-user-box' onClick={()=>{
                            handleClick();
                            setShowExpend(true)
                        }}>
                            <div className='search-profile-box'  >
                                {
                                    data.profile_picture === "" ?
                                    <div style={{width:"50px",display:"flex",alignItems:"center",justifyContent:"center"}} >
                                            <img src='../../../image/profile.png' />
                                        </div> : 
                                        <img src={`${data.profile_picture}`} />
                                    }
                            </div>
                            <div className='search-detail-box' >
                                <h5>{data.name}</h5>
                                <div className='post-count' >45</div>
                            </div>
                        </div>
                    )
                })
            }
            {
                showExpend ? <UserExpend/> : ""
            }
        </div>
    )
}

export default UserList