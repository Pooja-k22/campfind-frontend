import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { serverUrl } from "../../services/serverUrl";
import { updateProfileApi } from "../../services/allApi";
import { userProfileContex } from "../../context/ContextShare";

function EditProfile() {
  const [offcanvasStatus, setoffcanvasStatus] = useState(false);
  // contex share
 const {setuserProfile}= useContext(userProfileContex)

const [userDetails, setUserDetails] = useState({
    username: "",
    password: "",
    cPassword: "",
    profile: "",
  });

  // pic preview
  const [preview, setPreview]= useState("")
  // existing profile image
  const [existingProfile, setexistingProfile]=useState('')
  // token store
  const [token, setToken] = useState("");
   // for update status of edit profile section
  const [updateStatus, setupdateStatus] = useState({});


  // upload image
  const handleUpload = (e)=>{
    console.log(e.target.files[0]);
    setUserDetails({
      ...userDetails,profile:e.target.files[0]
    })
    if(e.target.files[0] != ""){
      const url = URL.createObjectURL(e.target.files[0])
      setPreview(url)
    }
    
  }

  // reset
  const handleReset = ()=>{
    if(sessionStorage.getItem("token")){
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      setUserDetails({
        username:user.username,
        password:user.password,
        cPassword:user.password
      })
      setexistingProfile(user.profile)
    }
    setPreview("")
  }

  // submit 
  const handleSubmit = async()=>{
    const {username,password,cPassword,profile} = userDetails

    if(!username || !password || !cPassword ){
      toast.warning('please fill all')

    }
    else{
      if(password !== cPassword){
        toast.warning('password must match')
      }
      else{
        if(preview){

          const reqHeader = {
            Authorization: `Bearer ${token}`,
          };

          const reqBody = new FormData() 
          
          for(let key in userDetails){
            reqBody.append(key,userDetails[key])
          }

          const result = await updateProfileApi(reqBody, reqHeader)
          console.log(result);
          if(result.status ==200){
             toast.success("update successfully");
             sessionStorage.setItem('existingUser', JSON.stringify(result.data))
             setupdateStatus(result.data)
             setuserProfile(result.data)

          }
          else{
            toast.error("something went wrong");
          }
          
        
        }
        else{
          const reqHeader = {
            Authorization: `Bearer ${token}`,
          };

          const result = await updateProfileApi({username,password,profile:existingProfile}, reqHeader)
          console.log(result);
          if(result.status ==200){
             toast.success("update successfully");
             sessionStorage.setItem('existingUser', JSON.stringify(result.data))
             setupdateStatus(result.data)
             setuserProfile(result.data)

          }
          else{
            toast.error("something went wrong");
            setupdateStatus(result)
          }

        }
      }
    }
  }

  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      const token = sessionStorage.getItem("token");
      setToken(token);
      const user=JSON.parse(sessionStorage.getItem('existingUser'))
      setUserDetails({
        username: user.username,
        password: user.password,
        cPassword: user.password,
       
      });
      setexistingProfile(user.profile);
    
    }
  },[updateStatus])

  return (
    <>
      <div>
        <button
          onClick={() => setoffcanvasStatus(true)}
          className="mt-4 px-4 bg-gradient-to-r p-3 from-orange-400 to-pink-500 text-white text-sm rounded-full hover:bg-orange-600"
        >
          Edit Profile
        </button>
      </div>

      {offcanvasStatus && (
        <div className="">
          {/* to make background light */}
          <div
            onClick={() => setoffcanvasStatus(false)}
            className="fixed inset-0 bg-gray-500/75 transition-opacity"
          ></div>
          {/* offcavas content */}
          <div className="bg-white h-full w-90 z-50 fixed top-0 left-0 pb-5">
            {/* title od offcanvas */}
            <div className="bg-blue-950 text-white text-2xl px-3 py-4 flex justify-between">
              <h1>Edit User Profile</h1>
              <FontAwesomeIcon
                onClick={() => setoffcanvasStatus(false)}
                icon={faXmark}
              />
            </div>
            <div className="flex justify-center items-center  flex-col">
              <label htmlFor="profilefile" className="mt-10">
                <input
                onChange={(e)=>handleUpload(e)}
                  type="file"
                  id="profilefile"
                  style={{ display: "none" }}
                  className=""
                />
                { existingProfile == "" ? <img className="rounded-full"
                  src={preview? preview:"https://cdn-icons-png.flaticon.com/512/219/219988.png"}
                  alt="no image"
                  style={{ height: "200px", width: "200px" }}
                />:
                <img className="rounded-full"
                  src={preview? preview:`${serverUrl}/upload/${existingProfile}`}
                  alt="no image"
                  style={{ height: "200px", width: "200px" }}
                />
              }
                <div
                  className=" z-53 fixed text-blue-950 bg-white py-3 px-4 rounded-full"
                  style={{ marginLeft: "119px", marginTop: "-40px" }}
                >
                  <FontAwesomeIcon icon={faPen} />
                </div>
              </label>

              <div className="mb-3 w-full mt-5  px-5">
                <input
                value={userDetails.username}
                onChange={(e)=>setUserDetails({...userDetails,username:e.target.value})}
                  type="text"
                  placeholder="Username"
                  className="w-full border border-gray-300 placeholder:text-gray-400 p-2 rounded"
                />
              </div>

              <div className="mb-3 w-full mt-5 px-5">
                <input
                value={userDetails.password}
                onChange={(e)=>setUserDetails({...userDetails,password:e.target.value})}
                  type="text"
                  placeholder="Password"
                  className="w-full border border-gray-300 placeholder:text-gray-400 p-2 rounded"
                />
              </div>

              <div className="mb-3 w-full mt-5 px-5">
                <input
                value={userDetails.cPassword}
                onChange={(e)=>setUserDetails({...userDetails,cPassword:e.target.value})}
                  type="text"
                  placeholder="Conform Password"
                  className="w-full border border-gray-300 placeholder:text-gray-400 p-2 rounded"
                />
              </div>

             

              <div className="flex justify-between ">
                <button onClick={handleReset} className="bg-blue-950 text-white rounded py-3 px-4 hover:text-blue-950 hover:border hover:border-blue-950 hover:bg-white">
                  Reset
                </button>
                <button 
                onClick={handleSubmit}
                className="bg-white text-blue-950 border border-blue-950 rounded py-3 px-4 ms-5 hover:text-white hover:bg-blue-950  ">
                  
                  Update
                </button>{" "}
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="top-center" theme="colored" autoClose="2000"/>
    </>
  );
}

export default EditProfile;
