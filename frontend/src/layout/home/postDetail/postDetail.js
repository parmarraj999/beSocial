import React, { useContext, useEffect, useState } from 'react'
import "./postDetail.css"
import { useGSAP } from '@gsap/react';
import axios from "axios";
import gsap from 'gsap';
import { UserDataContext } from '../../../context/context';

function PostDetail({ onePost, setShowDetail, handleGetPost }) {

    const [showClose, setShowClose] = useState(false)
    const [comment, setComment] = useState();
    const [postComments, setPostComments] = useState([])
    const [postLikes, setPostLikes] = useState()
    const reverseComment = [...postComments].reverse();

    const [isLike, setIsLike] = useState(false)

    const userData = useContext(UserDataContext);
    const data = userData.userData

    const tl = gsap.timeline();
    const hanldeCommentAnime = () => {
        setShowClose(true)
        tl.to(".detail-btn", {
            y: -10,
            opacity: 0,
            display: "none",
            stagger: .1
        })
        if (window.innerWidth < 765) {
            tl.to(".details-btns", {
                width: "100%"
            })
        }
        tl.to(".details-btns", {
            width: "90%"
        })
        tl.to(".comment-input-box", {
            display: "flex",
            width: "100%",
        })
    }

    const hanldeCloseComment = () => {
        tl.to(".comment-input-box", {
            width: "0%",
            display: "none"
        })
        if (window.innerWidth < 765) {
            tl.to(".details-btns", {
                width: "90%"
            })
        }
        tl.to(".details-btns", {
            width: "90%"
        })
        tl.to(".detail-btn", {
            y: 0,
            opacity: 1,
            display: "flex",
            stagger: .1
        })
        setShowClose(false)
    }

    const getSinglePost = async () => {
        const response = await axios.post("http://localhost:5000/getSinglePost/" + onePost._id)
        const postData = response.data;
        setPostComments(postData[0].comments);
        setPostLikes(postData[0].like)
    }

    console.log(postLikes)
    const likeIds = postLikes?.map((data) => data.userId)
    console.log(likeIds)

    useEffect(() => {
        if (likeIds?.includes(data._id)) {
            console.log("present")
            setIsLike(true)
            console.log(isLike)
        }else{
            setIsLike(false)
        }
    })


    const handleComment = () => {
        axios.put("http://localhost:5000/comment/" + onePost._id, {
            userId: data._id,
            userName: data.username,
            commentText: comment,
            profileImg: data.profile_picture
        })
            .then(result => {
                getSinglePost();
                setComment("")
            })
            .catch((error) => {
                console.log(error)
            })
    }
    const handleCommentDelete = (userId, text, username, profileImg) => {
        console.log(userId, text, username, profileImg)
        axios.put("http://localhost:5000/commentDelete/" + onePost._id, {
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



    const handleLike = () => {
        console.log(data.username)
        axios.put("http://localhost:5000/like/" + onePost._id, {
            userId: data._id,
            userName: data.username,
        })
            .then(result => {
                console.log(result)
                getSinglePost();
            })
    }
    const handleUnlike = () => {
        console.log(data.username)
        axios.put("http://localhost:5000/unlike/" + onePost._id, {
            userId: data._id,
            userName: data.username,
        })
            .then(result => {
                console.log(result)
                getSinglePost();
                
            })
    }

    useEffect(() => {
        getSinglePost();
    }, [])

    // const likeIds = postLikes?.map((data) => data.userId)
    return (
        <div className='post-detail-container' >
            <div className='post-detail-wrapper' >
                <div className='post-detail-profile' >
                    <img src={onePost.userProfile} />
                </div>
                <img className='main-img' src={onePost.mediaUrl} />
                <div className='details-btns' >
                    {/* comment box input  */}
                    <div className='comment-input-box' >
                        <input value={comment} placeholder='Comment' onChange={(e) => setComment(e.target.value)} />
                        <button onClick={handleComment}>
                            <svg style={{ width: "25px", color: "black" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1.94619 9.31543C1.42365 9.14125 1.41953 8.86022 1.95694 8.68108L21.0431 2.31901C21.5716 2.14285 21.8747 2.43866 21.7266 2.95694L16.2734 22.0432C16.1224 22.5716 15.8178 22.59 15.5945 22.0876L12 14L18 6.00005L10 12L1.94619 9.31543Z"></path></svg>
                        </button>
                    </div>
                    <div style={{ display: "flex", gap: ".5rem" }} >
                        {/* all buttons  */}
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
                        <div onClick={hanldeCommentAnime} className='detail-btn' >
                            <svg style={{ width: "27px", color: "white" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10 3H14C18.4183 3 22 6.58172 22 11C22 15.4183 18.4183 19 14 19V22.5C9 20.5 2 17.5 2 11C2 6.58172 5.58172 3 10 3ZM12 17H14C17.3137 17 20 14.3137 20 11C20 7.68629 17.3137 5 14 5H10C6.68629 5 4 7.68629 4 11C4 14.61 6.46208 16.9656 12 19.4798V17Z"></path></svg>
                        </div>
                        <div className='detail-btn' >
                            <svg style={{ width: "23px", color: "white" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5759 17.2714L8.46576 14.484C7.83312 15.112 6.96187 15.5 6 15.5C4.067 15.5 2.5 13.933 2.5 12C2.5 10.067 4.067 8.5 6 8.5C6.96181 8.5 7.83301 8.88796 8.46564 9.51593L13.5759 6.72855C13.5262 6.49354 13.5 6.24983 13.5 6C13.5 4.067 15.067 2.5 17 2.5C18.933 2.5 20.5 4.067 20.5 6C20.5 7.933 18.933 9.5 17 9.5C16.0381 9.5 15.1669 9.11201 14.5343 8.48399L9.42404 11.2713C9.47382 11.5064 9.5 11.7501 9.5 12C9.5 12.2498 9.47383 12.4935 9.42408 12.7285L14.5343 15.516C15.167 14.888 16.0382 14.5 17 14.5C18.933 14.5 20.5 16.067 20.5 18C20.5 19.933 18.933 21.5 17 21.5C15.067 21.5 13.5 19.933 13.5 18C13.5 17.7502 13.5262 17.5064 13.5759 17.2714Z"></path></svg>
                        </div>
                    </div>
                    {
                        showClose ?
                            <div style={{ background: "red" }} onClick={hanldeCloseComment} className='delete-btn' >
                                <svg style={{ width: "28px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
                            </div> :
                            <div onClick={() => setShowDetail(false)} style={{ background: "red" }} className='delete-btn' >
                                <svg style={{ width: "28px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
                            </div>
                    }
                </div>
                {
                    onePost.comments.length === 0 ?
                        <p style={{ color: "white" }}>No comments</p> :
                        <div className='comments-container' >
                            {
                                reverseComment.map((data) => {
                                    return (
                                        <>
                                            {
                                                data.userId === undefined ? "" :
                                                    <div className='comment-box' >
                                                        <div className='comment-profile'>
                                                            <img src={data.profileImg} />
                                                        </div>
                                                        <div className='comment-detail'>
                                                            <h4>{data.userName}</h4>
                                                            <p>{data.commentText}</p>
                                                        </div>
                                                        {
                                                            data.userId === userData.userData._id ?
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
    )
}

export default PostDetail
// https://images.unsplash.com/photo-1721048166150-3b2bb2ca3431?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D