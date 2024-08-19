import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../../../context/context'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import axios from 'axios'
import { Link } from 'react-router-dom'
// postDetail.css link in this file 

function UserPostExtend({ data, setPostExtend, handleRefresh, profileImg, username }) {

    const userDataContext = useContext(UserDataContext)
    const userData = userDataContext.userData
    const [showMenu, setShowMenu] = useState(false)
    const [postComments, setPostComments] = useState([])
    const [onePost, setOnePost] = useState([])
    const [postLikes, setPostLikes] = useState([])
    const [comment, setComment] = useState("");
    const reverseComment = [...postComments].reverse();

    const [isLike, setIsLike] = useState(false)

    // comment animation 

    if (comment === "") {
        gsap.to(".comment-box-user button", {
            display: "none",
            opacity: 0
        })
        gsap.to(".extra-space .detail-btn", {
            display: "flex",
            opacity: 1,
            x: 0
        })
    } else {
        gsap.to(".comment-box-user button", {
            display: "block",
            opacity: 1
        })
        gsap.to(".extra-space .detail-btn", {
            display: "none",
            opacity: 0,
            x: -30
        })
    }

    // console.log(onePost)

    function convertDate(dateText) {

        const date = new Date(dateText);

        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        const formattedDate = `${day} ${month} ${year}`;
        return formattedDate;
    }

    const getSinglePost = async() => {
        await axios.post("https://besocial-q86i.onrender.com/getSinglePost/" + data._id)
        .then((response)=>{
            const postData = response.data;
            setPostComments(postData[0].comments);
            setPostLikes(postData[0].like)
        })
    }

 

    const likeIds = postLikes?.map((data) => data.userId)
    console.log(likeIds)

    useEffect(() => {
        if (likeIds?.includes(userData._id)) {
            console.log("present")
            setIsLike(true)
            console.log(isLike)
        } else {
            setIsLike(false)
        }
    })

    // like section 
    const handleLike = () => {
        console.log(userData.username)
        axios.put("https://besocial-q86i.onrender.com/like/" + data._id, {
            userId: userData._id,
            userName: userData.username,
        })
            .then(result => {
                console.log(result)
                getSinglePost();
            })
    }

    const handleUnlike = () => {
        axios.put("https://besocial-q86i.onrender.com/unlike/" + data._id, {
            userId: userData._id,
            userName: userData.username,
        })
            .then(result => {
                console.log(result)
                getSinglePost();
            })
    }

    // comment section
    const handleComment = () => {
        axios.put("https://besocial-q86i.onrender.com/comment/" + data._id, {
            userId: userData._id,
            userName: userData.username,
            commentText: comment,
            profileImg: userData.profile_picture
        })
            .then(result => {
                setComment("")
                getSinglePost();
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleCommentDelete = (userId, text, username, profileImg) => {
        console.log(userId, text, username, profileImg)
        axios.put("https://besocial-q86i.onrender.com/commentDelete/" + data._id, {
            userId: userId,
            userName: username,
            commentText: text,
            profileImg: profileImg
        })
            .then(result => {
                console.log(result)
                getSinglePost();
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        getSinglePost();
    }, [])

    return (
        <div className='post-extend-container' >
            <div className='delete-pop' >
                <svg className='delete-icon' style={{ width: "25px", color: "red" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM6 10V20H18V10H6ZM9 12H11V18H9V12ZM13 12H15V18H13V12ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9Z"></path></svg>
            </div>
            <div className='close-container' onClick={() => setPostExtend(false)} ></div>
            <div className='extend-post-container'>

                <div className='cancel-btn-post-extend' onClick={() => setPostExtend(false)} >
                    <svg style={{ width: "30px", color: "white" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
                </div>

                <div className='extend-post' >
                    <div className='extend-post-header'>
                        <div className='extend-post-profile' >
                            <img className='extend-post-img-profile' src={profileImg} />
                            <h2 className='extend-post-name' >
                                {username}</h2>
                        </div>
                        <p className='date-text'>{convertDate(data.createdAt)}</p>
                    </div>
                    <img className='extend-post-img' src={data.mediaUrl} />
                    <div className='extend-post-details' >
                        <h3>{data.caption}</h3>
                        <p></p>
                    </div>
                </div>
                <div className='extra-space' >
                    {
                        isLike ?
                            <div onClick={handleUnlike} className='detail-btn liked-btn' >
                                <svg style={{ width: "30px", color: "#80ff00" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C5.51545 2.99926 8.09315 2.56029 10.2605 3.44044L6.34315 7.35843L7.75736 8.77264L12 4.53L11.9872 4.51617C11.9918 4.52028 11.9964 4.5244 12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736Z"></path></svg>
                            </div>
                            :
                            <div onClick={handleLike} className='detail-btn likebtn' >
                                <svg style={{ width: "27px", color: "white" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20.2426 4.75736C22.5053 7.02472 22.583 10.637 20.4786 12.993L11.9999 21.485L3.52138 12.993C1.41705 10.637 1.49571 7.01901 3.75736 4.75736C6.02157 2.49315 9.64519 2.41687 12.001 4.52853C14.35 2.42 17.98 2.49 20.2426 4.75736ZM5.17157 6.17157C3.68183 7.66131 3.60704 10.0473 4.97993 11.6232L11.9999 18.6543L19.0201 11.6232C20.3935 10.0467 20.319 7.66525 18.827 6.1701C17.3397 4.67979 14.9458 4.60806 13.3743 5.98376L9.17157 10.1869L7.75736 8.77264L10.582 5.946L10.5002 5.87701C8.92545 4.61197 6.62322 4.71993 5.17157 6.17157Z"></path></svg>
                            </div>
                    }
                    <div className='comment-box-user' >
                        <input className='comment-box-input' placeholder='comment' value={comment} onChange={(e) => setComment(e.target.value)} />
                        <button onClick={handleComment}>
                            <svg style={{ width: "25px", color: "black" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1.94619 9.31543C1.42365 9.14125 1.41953 8.86022 1.95694 8.68108L21.0431 2.31901C21.5716 2.14285 21.8747 2.43866 21.7266 2.95694L16.2734 22.0432C16.1224 22.5716 15.8178 22.59 15.5945 22.0876L12 14L18 6.00005L10 12L1.94619 9.31543Z"></path></svg>
                        </button>
                    </div>
                </div>
                <div className='comment-container-user'>
                    {
                        data.comments.length === 0 ?
                            <p style={{ color: "white" }}>No comments</p> :
                            <div className='comments-container' >
                                {
                                    reverseComment.map((data) => {
                                        return (
                                            <>
                                                {
                                                    data.userId === undefined ? "" :
                                                        <div className='comment-box' >
                                                            <Link to={"/user-profile/" + data.userId} className='comment-profile'>
                                                                <img src={data.profileImg} />
                                                            </Link>
                                                            <div className='comment-detail'>
                                                                <h4>{data.userName}</h4>
                                                                <p>{data.commentText}</p>
                                                            </div>
                                                            {
                                                                data.userId === userData._id ?
                                                                    <div className='comment-delete' onClick={() => handleCommentDelete(data.userId, data.commentText, data.userName, data.profileImg)} >
                                                                        <svg style={{ width: "20px", color: "white" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4V2H17V4H22V6H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V6H2V4H7ZM6 6V20H18V6H6ZM9 9H11V17H9V9ZM13 9H15V17H13V9Z"></path></svg>
                                                                    </div> : ""
                                                            }
                                                        </div>
                                                }
                                            </>
                                        )
                                    })
                                }
                            </div>
                    }
                </div>
            </div>
        </div >
    )
}

export default UserPostExtend