import React from "react";
import { FaLock } from "react-icons/fa";
import { FaEnvelope } from "react-icons/fa6";

import { faEye } from "@fortawesome/free-solid-svg-icons/faEye";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons/faEyeSlash";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { googleLoginApi, loginApi } from "../services/allApi";
import { GoogleLogin } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode'

function Login() {
  // password eye
  const [showpassword, setShowPassword] = useState(false);

  //  state to store user details
  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });
  // navigate
  const navigate = useNavigate();

  // login button
  const login = async () => {
    const { email, password } = userDetails;

    if (!email || !password) {
      toast.warning("Please fill all fields");
    } else {
      const result = await loginApi({ email, password });
      console.log(result);
      // 200 status
      if (result.status == 200) {
        toast.success("login successfull");

        // session storage
        sessionStorage.setItem(
          "existingUser",
          JSON.stringify(result.data.existingUser)
        );
        sessionStorage.setItem("token", result.data.token);
        setTimeout(() => {
          if (result.data.existingUser.email == "campfindadmin@gmail.com") {
            navigate("/admin-dashboard");
          } else {
            navigate("/");
          }
        }, 2500);
      }

      // 401 status
      else if (result.status == 401 || result.status == 404) {
        toast.warning(result.response.data);
        setUserDetails({
          email: "",
          password: "",
        });
      }

      // else
      else {
        toast.error("Something went wrong");
        setUserDetails({
          email: "",
          password: "",
        });
      }
    }
  };

  // google login
  const handleGoogleLogin = async (credentialResponse) => {
    const details = jwtDecode(credentialResponse.credential)
    console.log(details);

    const result = await googleLoginApi({username:details.name, email:details.email, password:"googlepswd",photo:details.picture})
    console.log(result);
    
     // 200 status
      if (result.status == 200) {
        toast.success("login successfull");

        // session storage
        sessionStorage.setItem(
          "existingUser",
          JSON.stringify(result.data.existingUser)
        );
        sessionStorage.setItem("token", result.data.token);
        setTimeout(() => {
          if (result.data.existingUser.email == "campfindadmin@gmail.com") {
            navigate("/admin-dashboard");
          } else {
            navigate("/");
          }
        }, 2500);
      }
      // else
      else {
        toast.error("Something went wrong");
      }
    

  };
  return (
    <>
      <div className="md:flex items-center justify-center md:bg-gradient-to-t from-[#ffedd1] to-white min-h-screen">
        <div className="md:grid grid-cols-[1fr_2fr_1fr]">
          <div></div>

          <div className="md:flex shadow-xl md:rounded-3xl md:h-[500px] md:w-[900px] pb-9 md:pb-0 bg-white">
            {/* Left Curved Panel */}
            <div className="w-full p-5 flex  md:gap-4   bg-orange-500 justify-center md:justify-between items-center rounded-b-[130px] md:rounded-bl-[0px] md:rounded-r-[100px]  text-white ">
              <div className="hidden md:inline">
                <img src="/images/men2.png" alt="" className="h-60 w-70" />
              </div>

              <div className="w-full flex flex-col items-center justify-center md:block">
                <h2 className="text-3xl font-bold ">Hello, Welcome!</h2>
                <p className="mt-2 text-sm ">Don't have an account?</p>
                <Link to={"/register"}>
                  <button className="mt-4  border border-white px-6 py-2 rounded hover:bg-white hover:text-orange-400 transition">
                    Register
                  </button>
                </Link>
              </div>
            </div>

            {/* Right Login Form */}
            <div className="w-full p-10 py-20 ">
              <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
              <form className="flex flex-col gap-4">
                <div className="flex items-center border rounded px-3 py-2">
                  <FaEnvelope className="text-gray-500 mr-2" />
                  <input
                    onChange={(e) => {
                      setUserDetails({ ...userDetails, email: e.target.value });
                    }}
                    value={userDetails.email}
                    type="text"
                    placeholder="Email"
                    className="outline-none "
                  />
                </div>
                <div className="flex items-center border rounded px-3 py-2 overflow-hidden">
                  <FaLock className="text-gray-500 mr-2" />
                  <input
                    onChange={(e) => {
                      setUserDetails({
                        ...userDetails,
                        password: e.target.value,
                      });
                    }}
                    value={userDetails.password}
                    type={showpassword ? "text" : "password"}
                    placeholder="Password"
                    className="outline-none flex-1"
                  />
                  <FontAwesomeIcon
                    onClick={() => setShowPassword(!showpassword)}
                    icon={showpassword ? faEye : faEyeSlash}
                    className=" text-gray-500 "
                  />
                </div>
                <p className="text-right text-sm text-gray-500 cursor-pointer hover:underline">
                  Forgot password?
                </p>
                <button
                  onClick={login}
                  type="button"
                  className="bg-gradient-to-r from-orange-400 to-pink-500 text-white py-2 rounded hover:opacity-90 transition"
                >
                  Login
                </button>
              </form>

              {/* Social Icons */}
              <p className="text-center mt-4 text-sm text-gray-500">
                or login with social platforms
              </p>

              <div className="flex justify-center w-full mt-3 overflow-hidden">
                <GoogleLogin
                width={500}
                  onSuccess={(credentialResponse) => {
                    console.log(credentialResponse);
                    handleGoogleLogin(credentialResponse)
                  }}
                  onError={() => {
                    toast.error("Login Failed");
                  }}
                />
                
              </div>
            </div>
          </div>

          <div></div>
        </div>
      </div>

      <ToastContainer position="top-center" theme="colored" autoClose={2000} />
    </>
  );
}

export default Login;
