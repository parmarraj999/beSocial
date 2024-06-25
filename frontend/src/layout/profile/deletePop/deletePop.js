import React, { useContext } from 'react'
import "./deletePop.css"
import { UserDataContext } from '../../../context/context'
import { refFromUrl } from "@firebase/storage";
import { firebaseStorage } from '../../firebase/firebaseConfig';

 
function DeletePop({setShowDelete}) {

  const userData = useContext(UserDataContext)

  const handleDelete = () => {
    const imgUrl = userData.userData.profile_picture;
    // const fileRef = refFromUrl(firebaseStorage,imgUrl)
    // fileRef.delete().then(()=>{
    //   console.log("fiel delete")
    // })
  }

  return (
    <div className='delete-pop-container' >
        <div className='delete-pop-card' >
          <img src='../../../image/delete-icon.jpg' />
          <h2>Are you sure You want to Delete your Profile Photo</h2>
          <div>
            <button className='delete-btn' onClick={handleDelete} >Yes, Delete</button>
            <button className='cancel-btn' onClick={()=>setShowDelete(false)} >Keep Photo</button>
          </div>
        </div>
    </div>
  )
}

export default DeletePop