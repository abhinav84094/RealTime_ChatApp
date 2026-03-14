import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { serverUrl } from '../main.jsx';
import axios from "axios"

function SignUp() {

    let navigate = useNavigate();

    let [show, setShow] = useState(false);
    let [username, setUserName] = useState("");
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [loading, setLoading] = useState(false);
    let [error, setError] = useState("");


    const handleSignUp = async (e)=>{
        e.preventDefault();
        setError("")
        setLoading(true);
        try{
            const res = await axios.post(`${serverUrl}/api/auth/signup`, {
                username, email, password
            }, {withCredentials:true})
            console.log(res);
            setLoading(false);
        }
        catch(err){
            setLoading(false)
            setError(error?.response?.data?.message)
            console.log(err.response.data);
        }
    }



  return (
    <>
        <div className='w-full h-[100vh] bg-slate-200 flex items-center justify-center'>
            <div className='w-full max-w-[500px] h-[550px] bg-white rounded-lg shadow-gray-300 shadow-lg'>
                <div className='w-full h-[150px] bg-[#20c7ff] rounded-b-[30%] shadow-gray-300 shadow-lg flex justify-center items-center'>
                    <h1 className='text-gray-600 font-bold text-[30px]'>Welcome to 
                        <span className='text-white'>Chatly</span>
                    </h1>
                </div>

                <form onSubmit={handleSignUp}
                className='w-full py-[20px] flex flex-col gap-[30px] items-center justify-center'>

                    <input onChange={(e)=>setUserName(e.target.value)} value = {username}
                     type='text' placeholder='UserName' className='w-[90%] outline-none h-[50px] border-2 border-[#20c7ff]
                     px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-400 shadow-lg text-gray-700 text-[19px]' />
                    <input onChange={(e)=>setEmail(e.target.value)} value={email}
                     type='email' placeholder='Email' className='w-[90%] outline-none h-[50px] border-2 border-[#20c7ff]
                     px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-400 shadow-lg text-gray-700 text-[19px]'  />
                    <div
                     className='relative w-[90%] h-[50px] border-2 border-[#20c7ff] overflow-hidden rounded-lg shadow-gray-400 shadow-lg  '>
                        <input onChange={(e)=>setPassword(e.target.value)} value = {password}
                         type={`${show?"text":"password"}`} placeholder='Password' className='w-[88%] outline-none h-[50px]
                     px-[20px] py-[10px] bg-[white] rounded-lg shadow-gray-300 shadow-lg text-gray-700 text-[19px]' />
                        <span onClick={()=>setShow(!show)}
                          className='cursor-pointer abolute top-[05px] right-[20px]  text-[17px] text-[#20c7ff] font-semibold '>
                            {`${show?"hide":"show"}`}</span>
                    </div>
                    {error && <p className='text-red-500'>{error}</p>}
                    <button type='submit' disabled={loading}
                     className='px-[20px] py-[10px] bg-[#20c7ff] rounded-2xl shadow-gray-300 shadow-lg 
                     text-[20px] w-[200px] mt-[20px] font-semibold hover:shadow-inner '>{loading?"Loading":"Sign Up"}</button>
                    <p className='cursor-pointer'>Already Have An Account ? <span onClick={()=>navigate("/login")} className='text-[#20c7ff] text-[bold] text-bold' > LogIn</span></p>
                </form>
            </div>

            

        </div>
    
    </>
  )
}

export default SignUp