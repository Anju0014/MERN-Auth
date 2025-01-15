import React from 'react'
import { useSelector } from 'react-redux'
import { useRef,useState,useEffect } from 'react';
import axios from 'axios'

const Profile = () => {
  const fileRef=useRef(null);
  const {currentUser}=useSelector((state)=>state.user)
  const [image,setImage]=useState(undefined)
  const [formData,setFormData]=useState({})
  const [imageError,setImageError]=useState("")
   
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
        setFormData({...formData,profilPicture:imageUrl})
        console.log(formData)
    } catch (error) {
        console.error("Cloudinary upload failed", error);
        setImageError("Image upload failed!");
      
    }
};


  return (
    <div className="p-3 max-w-lg mx-auto ">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e)=>setImage(e.target.files[0])} />
        <img 
        src={formData.profilPicture||currentUser.profilePicture}
        alt="profile"
        className="h-24 w-24 self-center cursor-pointer rounded-full object-cover"
        onClick={()=>fileRef.current.click()}
        />

        <p className='text-red-700'>
          {imageError}</p>
        <input defaultValue={currentUser.username }type="text" id='username'
        placeholder='Username' className='bg-slate-100 rounded-lg p-3'/>
        <input defaultValue={currentUser.email}type="email" id='email'
        placeholder='Email' className='bg-slate-100 rounded-lg p-3'/>
        <input type="password" id='password'
        placeholder='Password' className='bg-slate-100 rounded-lg p-3'/>
       <button className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
        UPDATE
       </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      
    </div>
  )
}

export default Profile