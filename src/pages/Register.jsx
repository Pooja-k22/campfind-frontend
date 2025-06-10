import React from 'react'
import {
  FaUser,
  FaEnvelope,
  FaLock,
 
} from "react-icons/fa";
import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { registerApi } from '../services/allApi';


function Register() {
     // password eye 
  const [showpassword , setShowPassword]= useState(false)
const [userDetails,setUserDetails]= useState({
  username: "",
    email: "",
    password: "",
})
const navigate = useNavigate()
console.log(userDetails);

const handleRegister =async()=>{
  const { username, email, password } = userDetails

  if (!username || !email || !password){
    toast.info("Please fill all field")
  }
  else{
    const result = await registerApi({username, email, password})
    //console.log(result);
    if(result.status == 200){
      toast.success("registration successfull")
      setUserDetails({
        username: "",
          email: "",
          password: "",
      })
      navigate("/login");
    }
    else if(result.status == 409){
      toast.warning(result.response.data);
        setUserDetails({
          username: "",
          email: "",
          password: "",
        });
    }
    else{
      toast.error(result.response.data)
      setUserDetails({
          username: "",
          email: "",
          password: "",
        });
    }
    
  }
}





  return (
    <>
    <div className="md:flex items-center justify-center md:bg-gradient-to-t from-[#ffedd1] to-white min-h-screen">
            <div className="md:grid grid-cols-[1fr_2fr_1fr]">
                <div></div>

             <div className="md:flex shadow-xl md:rounded-3xl md:h-[500px] md:w-[900px] pb-9 md:pb-0 bg-white" >
                  {/* Left Curved Panel */}
                  <div className="w-full p-5 flex  md:gap-4   bg-orange-500 justify-center md:justify-between items-center rounded-b-[130px] md:rounded-bl-[0px] md:rounded-r-[100px]  text-white ">
                                       <div className='hidden md:inline'><img src="/images/men3.png" alt="" className='h-60 w-78' /></div>

                    <div className='w-full flex flex-col items-center justify-center md:block'>
                      <h2 className="text-3xl font-bold ">Welcome Back!</h2>
                      <p className="mt-2 text-sm ">Have an account?</p>
                      
                     <Link to={'/login'}>
                          <button className="mt-4  border border-white px-6 py-2 rounded hover:bg-white hover:text-orange-400 transition">
                             Login
                          </button>
                     </Link>
                    </div>
                  </div>
        
                  {/* Right Login Form */}
                  <div className="w-full px-10 py-20 flex flex-col justify-center ">
                     <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>
              <form className="flex flex-col gap-4 mb-10 md:mb-0">
                <div className="flex items-center border rounded px-3 py-2">
                  <FaUser className="text-gray-500 mr-2" />
                  <input onChange={(e)=>{setUserDetails({...userDetails,username:e.target.value})}} value={userDetails.username} type="text" placeholder="Username" className="outline-none flex-1" />
                </div>
                <div className="flex items-center border rounded px-3 py-2">
                  <FaEnvelope className="text-gray-500 mr-2" />
                  <input onChange={(e)=>{setUserDetails({...userDetails,email:e.target.value})}} value={userDetails.email} type="email" placeholder="Email" className="outline-none flex-1" />
                </div>
                <div className="flex items-center border rounded px-3 py-2 overflow-hidden">
                  <FaLock className="text-gray-500 mr-2" />
                  <input onChange={(e)=>{setUserDetails({...userDetails,password:e.target.value})}} value={userDetails.password} type={showpassword? "text": "password"} placeholder="Password" className="outline-none flex-1" />
                  <FontAwesomeIcon onClick={() => setShowPassword(!showpassword)} icon={showpassword ? faEye : faEyeSlash} className=' text-gray-500 ' /> 
                </div>
                
                <button
                onClick={handleRegister}
                  type="button"
                  className="bg-gradient-to-r from-orange-600 to-pink-500 text-white py-2 rounded hover:opacity-90 transition"
                >
                  Register
                </button>
              </form>
    
              
                    
                  </div>
             </div>

             <div></div>
            </div>
          </div>
          <ToastContainer position='top-center' theme='colored' autoClose={2000}/>
    </>
  )
}

export default Register