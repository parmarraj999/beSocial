import React, { useContext, useEffect, useState } from 'react'
import { UserDataContext } from '../../../context/context'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import MenuExtend from './menuExtend'
import axios, { Axios } from 'axios'
import { Link } from 'react-router-dom'


function PostExtend({data, postId, setPostExtend, handleRefresh }) {

    const userData = useContext(UserDataContext)
    // const [data,setData] = useState([]);
    const [showMenu, setShowMenu] = useState(false)
    const [createDate, setCreateDate] = useState()
    const [likeList, setLikeList] = useState(data?.like)
    const [commentList, setCommentList] = useState(data?.comments)

    const [showLike, setShowLike] = useState(false);
    const [showComment, setShowComment] = useState(false);

    function convertDate(dateText) {

        const date = new Date(dateText);

        const day = date.getDate().toString().padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();

        const formattedDate = `${day} ${month} ${year}`;
        return formattedDate;
        // console.log(formattedDate)
    }

    useEffect(()=>{
        getSinglePost();
    },[])

    const tl = gsap.timeline();

    useGSAP(() => {
        gsap.from(".post-extend-container", {
            background: "rgba(0,0,0,0)",
            duration: .4
        })
        gsap.from(".extend-post", {
            opacity: 0,
            duration: .8,
            ease: "expo.out"
        })
    })

    const handleDeleteAnime = () => {
        handleRefresh();
        tl.from(".delete-pop", {
            opacity: 0,
        })
        tl.to(".delete-pop", {
            y: 100,
            opacity: 1
        })
        tl.to(".delete-pop", {
            width: "120px",
            height: "120px",
            duration: .3
        })
        tl.to(".analytics-btns", {
           opacity:0
        })
        tl.to(".likes-list-container", {
           opacity:0
        })
        tl.to(".extend-post-container", {
            scale: 0.1,
            duration: .4,
            top: 100,
        })
        tl.to(".delete-pop", {
            border: "4px solid red",
            duration: .1
        })
        tl.to(".extend-post", {
            display: "none"
        })
        tl.to(".delete-pop", {
            width: "50px",
            height: "50px",
            duration: .3
        })
        tl.to(".delete-pop", {
            y: -80,
            opacity: 0
        })
        tl.to(".post-extend-container", {
            background: "rgba(0,0,0,0)",
            duration: .4
        })

    }

    console.log(data)
    console.log(postId)
    
    const getSinglePost = async () => {
        console.log(postId)
        const response = await axios.post("http://localhost:5000/getSinglePost/" + postId)
        const postData = response.data;
        console.log(postData)
        // setData(postData[0])
        setLikeList(postData[0].like);
        setCommentList(postData[0].comments)
    }

    const handleLikesList = () => {
        setShowLike(true)
        setShowComment(false)
    }
    const handleCommentList = () => {
        setShowComment(true)
        setShowLike(false)
    }

    const handleCommentDelete = (dataUser) => {
        console.log(dataUser)
        axios.put("http://localhost:5000/commentDeleteOwn/" + postId, {
            userId: dataUser.userId,
            userName: dataUser.userName,
            commentText: dataUser.commentText,
            profileImg: dataUser.profileImg
        })
            .then(result => {
                console.log(result)
                getSinglePost();
            })
            .catch((error) => {
                console.log(error)
            })
    }



    return (
        <div className='post-extend-container' >

            <div className='delete-pop' >
                <svg className='delete-icon' style={{ width: "25px", color: "red" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM6 10V20H18V10H6ZM9 12H11V18H9V12ZM13 12H15V18H13V12ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9Z"></path></svg>
            </div>
            <div className='close-container' onClick={() => setPostExtend(false)} ></div>
            <div className='extend-post-container' >
                <div className='extend-post' >
                    <div className='extend-post-header'>
                        <div className='extend-post-profile' >
                            <img className='extend-post-img-profile' src={data?.userProfile} />
                            <h2 className='extend-post-name' >
                                {userData.userData.username}</h2>
                        </div>
                        <div style={{ display: "flex", alignItems: "center" }}>
                            <p className='date-text' >{convertDate(data?.createdAt)}</p>
                            <div className='extend-post-menu-icon' onClick={() => setShowMenu(!showMenu)}>
                                {
                                    showMenu ?
                                        <MenuExtend postId={data?._id} handleDeleteAnime={handleDeleteAnime} /> : ""
                                }
                                <svg style={{ width: "25px", color: "white" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3C10.9 3 10 3.9 10 5C10 6.1 10.9 7 12 7C13.1 7 14 6.1 14 5C14 3.9 13.1 3 12 3ZM12 17C10.9 17 10 17.9 10 19C10 20.1 10.9 21 12 21C13.1 21 14 20.1 14 19C14 17.9 13.1 17 12 17ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z"></path></svg>
                            </div>
                        </div>
                    </div>
                    <img className='extend-post-img' src={data?.mediaUrl} />
                    {/* <div style={{ padding: "0 .5rem" }}>
                    <svg style={{ width: "30px", color: "#80ff00" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3Z"></path></svg>
                </div> */}
                    <div className='extend-post-details' >
                        <h3>{data?.caption}</h3>
                    </div>
                </div>
                <div className='analytics-btns' style={{ display: "flex", alignItems: "center", gap: '1rem' }} >
                    {
                        showLike ?
                            <button className='like-list-btn cancel' onClick={() => setShowLike(false)}>Cacnel </button>
                            :
                            <button className='like-list-btn' onClick={handleLikesList}>likes <svg style={{ width: "25px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg> </button>
                    }
                    {
                        showComment ? <button className='like-list-btn cancel' onClick={() => setShowComment(false)}>Cacnel </button> :
                            <button className='comment-list-btn' onClick={handleCommentList}>Comments <svg style={{ width: "25px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg></button>
                    }

                    <button className='list-cancel-btn' style={{ color: "white", maxWidth: "50px", display: "none", background: "red" }}><svg style={{ width: "30px", color: "white" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg></button>
                </div>
                {
                    showLike ?
                        <div className='likes-list-container' >
                            <div className='likes-list-header' >
                                <h3>Likes</h3>
                                <h3>{likeList.length}</h3>
                            </div>
                            <div className='likes-list' >
                                {
                                    likeList.map((data) => {
                                        return (
                                            <Link to={"/user-profile/" + data.userId} className='likes-list-item' >
                                                <h4>{data.userName}</h4>
                                                <svg style={{ width: "25px", color: "white" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
                                            </Link>
                                        )
                                    })
                                }
                            </div>
                        </div> : ""
                }
                {
                    showComment ?
                        <div className='likes-list-container' >
                            <div className='likes-list-header' >
                                <h3>Commnets</h3>
                                <h3>{`${commentList.length}`-1}</h3>
                            </div>
                            <div className='likes-list' >
                                {
                                    commentList.map((data) => {
                                        return ( 
                                            <>
                                                {
                                                    data.userId === undefined ? "" :
                                                        <div className='comment-list-item' >
                                                            <div style={{display:"flex",alignItems:'center',justifyContent:"space-between"}}>
                                                                <Link to={"/user-profile/" + data.userId} style={{ textDecoration: "none", color: "white", fontSize: "18px", fontWeight: "600" }}>{data.userName}</Link>
                                                                <div onClick={() => handleCommentDelete(data)}>
                                                                    <svg style={{ width: "30px", color: "tomato" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path></svg>
                                                                </div>
                                                            </div>
                                                            <p style={{fontSize:'16px',color:"rgb(218, 218, 218)",fontWeight:"600"}}>{data.commentText}</p>
                                                        </div>
                                                }
                                            </>
                                        )
                                    })
                                }
                            </div>
                        </div> : ""
                }
            </div>
        </div >
    )
}

export default PostExtend