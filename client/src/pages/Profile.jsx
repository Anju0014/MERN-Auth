import React from 'react'
import { useSelector } from 'react-redux'
import { useRef,useState,useEffect } from 'react';
import axios from 'axios'
import { updateUserFailure,updateUserSuccess,updateUserStart, deleteUserStart,deleteUserFailure,deleteUserSuccess, signOut } from '../redux/user/userSlice';
import { useDispatch } from 'react-redux';


const Profile = () => {
  const fileRef=useRef(null);
  const dispatch=useDispatch()
  const {currentUser,loading,error}=useSelector((state)=>state.user)
  const [image,setImage]=useState(undefined)
  const [formData,setFormData]=useState({})
  const [imageError,setImageError]=useState("")
  const [updateSuccess,setUpdateSuccess]=useState(false)

  const CLOUDINARY_URL = "https://api.cloudinary.com/v1_1/dihyb66hn/image/upload";
  const CLOUDINARY_UPLOAD_PRESET = "life-mern";


  console.log(image)
  useEffect(()=>{
    if(image){
      uploadImageToCloudinary(image)
    }
  },[image])


  const uploadImageToCloudinary = async (image) => {
    const formImage = new FormData();
        formImage.append("file", image);  
        formImage.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);


    try {
        console.log(formData)
        const response = await axios.post(CLOUDINARY_URL, formImage);
        console.log("helllllo")
        const imageUrl=response.data.secure_url;
        console.log(imageUrl)
        setFormData({...formData,profilePicture:imageUrl})
        console.log(formData)
    } catch (error) {
        console.error("Cloudinary upload failed", error);
        setImageError("Image upload failed!");
      
    }   
};

const handleChange=(e)=>{
  setFormData({...formData,[e.target.id]:e.target.value})
}

const handleSubmit=async(e)=>{
  e.preventDefault();
  try{
    dispatch(updateUserStart())
    console.log("started")
    console.log(currentUser._id)
    const res=await fetch(`/api/user/update/${currentUser._id}`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    const data=await res.json();
    console.log(data)
    if(data.success===false){
      dispatch(updateUserFailure(data))
      return;
    }
    dispatch(updateUserSuccess(data))
    setUpdateSuccess(true)

  }catch(error){
    dispatch(updateUserFailure(error))
  }
}
const handleDeleteAccount=async()=>{
  try{
    dispatch(deleteUserStart())
    console.log("started")
    console.log(currentUser._id)
    const res=await fetch(`/api/user/delete/${currentUser._id}`,{
      method:'DELETE',
    })
    const data=await res.json();
    console.log(data)
    if(data.success===false){
      dispatch(deleteUserFailure(data))
      return;
    }
    dispatch(deleteUserSuccess(data))
  }catch(error){
    dispatch(deleteUserFailure(error))
  }
}

const handleSignout=async ()=>{
  try{
     await fetch('/api/auth/signout');
     dispatch(signOut());
  }catch(error){
     console.log(error)
  }
}


  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e)=>setImage(e.target.files[0])} />
        <img 
        src={formData.profilePicture||currentUser.profilePicture}
        alt="profile"
        className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"
        onClick={()=>fileRef.current.click()}
        />

        <p className='text-red-700'>
          {imageError}</p>
        <input 
        defaultValue={currentUser.username }
        type="text" 
        id='username'
        placeholder='Username'
        onChange={handleChange}
         className='bg-slate-100 rounded-lg p-3'/>
        <input 
        defaultValue={currentUser.email}
        type="email" 
        id='email'
        placeholder='Email' 
        onChange={handleChange}
        className='bg-slate-100 rounded-lg p-3'/>
        <input 
        type="password"
         id='password'
        placeholder='Password' 
        onChange={handleChange}
        className='bg-slate-100 rounded-lg p-3'/>
       <button type="submit"
       className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
        {loading? 'Loading...':'Update'}
       </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteAccount} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignout} className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-700 mt-5'>{error && 'Something went Wrong'}</p>
      <p className='text-green-700 mt-5'>{updateSuccess && 'User is Updated Successfully'}</p>
    </div>
  )
}

export default Profile