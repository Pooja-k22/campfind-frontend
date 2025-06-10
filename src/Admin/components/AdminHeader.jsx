import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Link, useNavigate } from "react-router-dom";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons/faSignOutAlt";

const AdminHeader = () => {
  const navigate = useNavigate();
  // logout
  const logout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("existingUser");
    navigate("/");
  };
  return (
    <>
      <header className="w-full bg-[#f2f6ec] text-white  px-6 py-1 flex justify-between items-center border border-gray-300 shadow-2xl">
        <div className="flex items-center">
          <div className="flex flex-col justify-center  items-center ">
            <img src="/images/logo1.png" alt="" className="w-15" />
            <h1 className="text-green-900  text-2xl font-bold">CAMPFIND</h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
          
            <div
              onClick={logout}
              className="flex items-center border  text-black gap-4 cursor-pointer py-3 px-4 hover:bg-[#1c2e18] hover:text-white  hover:border-[#a4ba62] rounded-md transition"
            >
              <FontAwesomeIcon
                icon={faSignOutAlt}
                className=" hover:text-white text-lg"
              />
              <span className="text-base  font-medium">Logout</span>
            </div>
        
        </div>
      </header>
    </>
  );
};

export default AdminHeader;
