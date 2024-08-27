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
    setShowDelete(false)
  }

  return (
    <div className='delete-pop-container' >
        <div className='delete-pop-card' >
            <h2>Are You Sure ?</h2>
            <div className='card-btns' >
              <button onClick={()=>setShowDelete(false)}>Keep</button>
              <button onClick={handleDelete} style={{color:"red"}}>Delete</button>
            </div>
        </div>
    </div>
  )
}

export default DeletePop