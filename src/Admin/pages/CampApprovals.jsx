import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import Adminsidebar from "../components/Adminsidebar";
import { approveCampApi, getAllCampAminApi } from "../../services/allApi";


function CampApprovals() {
  const [pendingStatus, setpendingStatus] = useState(true);

  const [approvedStatus, setapprovedStatus] = useState(false);

  const [approveCampStatus, setapproveCampStatus] = useState({})

  // state to store camp details
  const [campD, setcampD] = useState([]);

  // get all camp
  const getAllCampAdmin = async (token) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`,
    };

    const result = await getAllCampAminApi(reqHeader);
    //console.log(result);
    if (result.status == 200) {
      setcampD(result.data);
    }
  };
  //console.log(campD);

  // approve camp
  const approveCamp = async(data)=>{

    const result = await approveCampApi(data)
    //console.log(result);
    if(result.status == 200){
      setapproveCampStatus(result.data)
    }
    
  }

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      getAllCampAdmin(token);
    }
  }, [approveCampStatus]);

  return (
    <>
      <AdminHeader />
      <div className="md:grid grid-cols-[1fr_4fr] md:mt-0">
        <Adminsidebar />

        <div className="min-h-screen  p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Camp Spot</h1>

          {/* tab */}
          <div className="flex justify-start items-center my-5">
            <p
              onClick={() => {
                setpendingStatus(true);
                setapprovedStatus(false);
              }}
              className={
                pendingStatus
                  ? "text-orange-600 p-4 border-l border-t border-r border-gray-200 rounded cursor-pointer"
                  : "p-4 text-black border-b border-gray-200 cursor-pointer"
              }
            >
              Pending
            </p>
            <p
              onClick={() => {
                setapprovedStatus(true);
                setpendingStatus(false);
              }}
              className={
                approvedStatus
                  ? "text-orange-600 p-4 border-l border-t border-r border-gray-200 rounded cursor-pointer"
                  : "p-4 text-black border-b border-gray-200 cursor-pointer"
              }
            >
              Approved
            </p>
          </div>

          {pendingStatus && (
            <div className="">
              {/* Pending Approvals */}
              <div>
                {campD?.length > 0 && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {campD
                      ?.filter((item) => item.status === "pending")
                      .map((item) => (
                        <div className="bg-white p-4 rounded-xl shadow-md">
                          <div>
                            <img
                              src={item?.imageUrl}
                              alt=""
                              style={{ width: "350px", height: "250px" }}
                            />
                          </div>
                          <h3 className="font-semibold text-gray-800 mt-4">
                            {item?.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Location:{item?.location} | ₹{item?.price}/night
                          </p>
                          <p className="text-sm text-gray-500">
                            Host:{item?.userMail}
                          </p>
                          <div className="mt-3 flex gap-2">
                            <button type="button" onClick={()=>approveCamp(item)} className="px-3 py-1 rounded bg-green-500 text-white text-sm hover:bg-green-600">
                              Approve
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
          )}
          {/* Approved Camps */}
          {approvedStatus && (
            <div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {campD
                  ?.filter((item) => item.status === "approved")
                  ?.map((item) => (
                    <div
                      key={item._id}
                      className="bg-white p-4 rounded-xl shadow-md"
                    >
                      <div>
                        <img
                          src={item?.imageUrl}
                          alt=""
                          style={{ width: "350px", height: "250px" }}
                        />
                      </div>
                      <h3 className="font-semibold text-gray-800 mt-4">
                        {item?.title}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Location: {item?.location} | ₹{item?.price}/night
                      </p>
                      <p className="text-sm text-gray-500">
                        Host: {item?.userMail}
                      </p>
                      <p className="text-sm text-green-600 bg-green-100 py-2 px-3 mt-3 text-center">
                        ✔ Approved
                      </p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default CampApprovals;
