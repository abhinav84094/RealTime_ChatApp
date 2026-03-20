import React, { useRef, useState } from 'react'
import blank_dp from '../assets/blank_dp.jpg'
import { CiCamera } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { serverUrl } from '../main';
import { setUserData } from '../redux/userSlice';


function Profile() {

  let {userData} = useSelector(state=>state.user)
  let navigate = useNavigate()
  let dispatch = useDispatch();
  let [name, setName] = useState(userData?.name || "");
  let [frontendImage, setFrontendImage] = useState(userData?.image || blank_dp)
  let [backendImage , setBackendImage] = useState(null)
  let image = useRef();
  let [saving, setSaving] = useState(false)
  

  const handleImage = (e)=>{
    let file = e.target.files[0]
    setBackendImage(file)
    setFrontendImage(URL.createObjectURL(file))
  }

  const handleProfile = async (e) => {
    setSaving(true);
    e.preventDefault()
    try{
      let formData = new FormData()
      formData.append("name", name)
      if(backendImage){
        formData.append("image", backendImage)
      }

      let result = await axios.put(`${serverUrl}/api/user/profile`, formData, {withCredentials:true})
      setSaving(false);
      dispatch(setUserData(result.data));

    }
    catch(err){
      setSaving(false);
      console.log(err)
    }
  }


  return (
    <div className='w-full min-h-screen bg-slate-200 flex flex-col items-center py-10 gap-8'>
      
      <div className='fixed top-[20px] left-[20px]'>
        <IoMdArrowBack className=' w-[30px] h-[30px] text-gray-600 cursor-pointer' onClick={()=>navigate("/")} />
      </div>
      <div className='w-[200px] h-[200px] bg-white rounded-full border-4 border-[#20c7ff] shadow-lg relative'>
        
        <div className='overflow-hidden w-full h-full rounded-full'>
          <img src={frontendImage} alt='' className='h-full w-full object-cover' />
        </div>

        <CiCamera onClick={()=>image.current.click()} className='h-[28px] w-[28px] absolute bottom-2 right-2 bg-white rounded-full p-1 cursor-pointer shadow-md hover:scale-110 transition' />
      </div>

      {/* Form */}
      <form className='w-full max-w-[400px] flex flex-col gap-4 px-4' onSubmit={handleProfile}>

        <input type='file' accept='image/*' ref={image} hidden onChange={handleImage} />
        
        <input 
          type='text' value={name}
          placeholder='Enter your name' onChange={(e)=>setName(e.target.value)}
          className='w-full h-[50px] outline-none border-2 border-[#20c7ff] px-4 rounded-lg shadow-md text-gray-700 text-[16px]'
        />

        <input 
          type='text' 
          readOnly 
          value={userData?.username}
          className='w-full h-[50px] outline-none border-2 border-[#20c7ff] px-4 rounded-lg bg-gray-100 text-gray-600 shadow-md'
        />

        <input 
          type='email' 
          readOnly 
          value={userData?.email}
          className='w-full h-[50px] outline-none border-2 border-[#20c7ff] px-4 rounded-lg bg-gray-100 text-gray-600 shadow-md'
        />

        <button 
          type="submit" disabled={saving}
          className='w-full h-[50px] bg-[#20c7ff] text-white rounded-lg font-semibold shadow-md hover:bg-[#0fb2e6] transition'
        >
          {saving?"Saving..." : "Save Profile"}
        </button>

      </form>

    </div>
  )
}

export default Profile;