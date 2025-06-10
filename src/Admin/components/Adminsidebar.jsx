import React, { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTachometerAlt,
  faCheckCircle,
  faUser,
  faCog,

} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons/faBars";
import { adminProfileContex } from "../../context/ContextShare";
import { serverUrl } from "../../services/serverUrl";


function Adminsidebar() {
  const [sidebar, setSideBar] = useState(false);

  const {adminProfile} = useContext(adminProfileContex)

  const [adminD, setadminD] = useState({
    username:"",
    profile:""
  })

  useEffect(()=>{
    if(sessionStorage.getItem('token')){
      const admin = JSON.parse(sessionStorage.getItem('existingUser'))
        setadminD({
          username:admin.username,
          profile:admin.profile
        })
    }

  },[adminProfile])
  return (
    <div className="">

      {/* mobile screen */}
      <div className=" md:hidden h-full w-full bg-[#032722] text-gray-700 border-r-2 border-gray-200 ps-4 pt-3 md:py-6 flex flex-col justify-start">
        <div className="flex justify-between items-center mb-2">
          <FontAwesomeIcon
            icon={faBars}
            onClick={() => setSideBar(true)}
            className="text-[#a4ba62] md:hidden text-lg"
          />
          {sidebar && (
            <p
              onClick={() => setSideBar(false)}
              className="text-[#a4ba62] md:hidden font-bold text-lg me-2"
            >
              x
            </p>
          )}
        </div>
        {sidebar && (
         <div>
          <div className=" hidden ms-24 mb-5">
            <img src={adminD.profile ? `${serverUrl}/upload/${adminD.profile}` :"https://cdn-icons-png.freepik.com/512/8742/8742495.png"} alt="" style={{ width: "150px", height: "150px" }} />
          <h3 className='mt-5 ms-10'>{adminD.username}</h3>
          </div>
            <ul className="space-y-6  text-gray-200">
              <Link to="/admin-dashboard">
                <li className="flex items-center gap-4 cursor-pointer py-3 pe-3 hover:bg-[#edeef8] hover:border-r-4 hover:border-[#a4ba62] rounded-md transition">
                  <FontAwesomeIcon
                    icon={faTachometerAlt}
                    className="text-[#a4ba62] text-lg"
                  />
                  <span className="text-base ms-2 font-medium">Dashboard</span>
                </li>
              </Link>
  
              <Link to="/camp-approve">
                <li className="flex items-center gap-4 cursor-pointer py-3 pe-3 hover:bg-[#edeef8] hover:border-r-4 hover:border-[#a4ba62] rounded-md transition">
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className="text-[#a4ba62]  text-lg"
                  />
                  <span className="text-base ms-2 font-medium">
                    Host Approvals
                  </span>
                </li>
              </Link>
  
              <Link to="/userhostlist">
                <li className="flex items-center gap-4 cursor-pointer py-3 pe-3 hover:bg-[#edeef8] hover:border-r-4 hover:border-[#a4ba62] rounded-md transition">
                  <FontAwesomeIcon
                    icon={faUser}
                    className="text-[#a4ba62]  text-lg"
                  />
                  <span className="text-base ms-2 font-medium">Users List</span>
                </li>
              </Link>
  
              <Link to="/adminsettings">
                <li className="flex items-center gap-4 cursor-pointer py-3 pe-3 hover:bg-[#edeef8] hover:border-r-4 hover:border-[#a4ba62] rounded-md transition">
                  <FontAwesomeIcon
                    icon={faCog}
                    className="text-[#a4ba62]  text-lg"
                  />
                  <span className="text-base ms-2 font-medium">Settings</span>
                </li>
              </Link>
  
              
            </ul>
         </div>
        )}
      </div>

{/* largr screen */}
      <div className="hidden h-full w-full bg-[#032722] text-gray-400 border-r-2 border-gray-200 ps-4 py-6 md:flex flex-col justify-start">
       <div className="ms-11">
          <img src={adminD.profile ? `${serverUrl}/upload/${adminD.profile}` :"/images/admin.png"} alt="" className="" style={{ width: "150px", height: "150px" }} />
          <h3 className='mt-5 ms-10 text-lg '>{adminD.username}</h3>
       </div>
        <ul className="space-y-6 ms-9 mt-5">
          <Link to="/admin-dashboard">
            <li className="flex items-center gap-4 cursor-pointer py-3 px-4 hover:bg-[#f9f9f9] hover:border-r-4 hover:border-[#a4ba62] rounded-md transition">
              <FontAwesomeIcon
                icon={faTachometerAlt}
                className="text-[#a4ba62] text-lg"
              />
              <span className="text-base ms-2 font-medium">Dashboard</span>
            </li>
          </Link>

          <Link to="/camp-approve">
            <li className="flex items-center gap-4 cursor-pointer py-3 px-4 hover:bg-[#edeef8] hover:border-r-4 hover:border-[#a4ba62] rounded-md transition">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className="text-[#a4ba62]  text-lg"
              />
              <span className="text-base ms-2 font-medium">Host Approvals</span>
            </li>
          </Link>

          <Link to="/userhostlist">
            <li className="flex items-center gap-4 cursor-pointer py-3 px-4 hover:bg-[#edeef8] hover:border-r-4 hover:border-[#a4ba62] rounded-md transition">
              <FontAwesomeIcon
                icon={faUser}
                className="text-[#a4ba62]  text-lg"
              />
              <span className="text-base ms-2 font-medium">Users List</span>
            </li>
          </Link>

          <Link to="/adminsettings">
            <li className="flex items-center gap-4 cursor-pointer py-3 px-4 hover:bg-[#edeef8] hover:border-r-4 hover:border-[#a4ba62] rounded-md transition">
              <FontAwesomeIcon
                icon={faCog}
                className="text-[#a4ba62]  text-lg"
              />
              <span className="text-base ms-2 font-medium">Settings</span>
            </li>
          </Link>

         
        </ul>
      </div>
    </div>
  );
}

export default Adminsidebar;
