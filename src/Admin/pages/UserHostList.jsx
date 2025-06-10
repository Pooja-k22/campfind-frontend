import React, { useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import Adminsidebar from "../components/Adminsidebar";
import { getAllUserApi } from "../../services/allApi";
import { serverUrl } from "../../services/serverUrl";

function UserHostList() {
  // state to store user
  const [users, setusers] = useState([]);

  // get all users
  const getAllUser = async () => {
    const result = await getAllUserApi();
    //console.log(result);
    if (result.status == 200) {
      setusers(result.data);
    } else {
      alert("something went wrong");
    }
  };

  console.log(users);

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <>
      <AdminHeader />
      <div className="md:grid grid-cols-[1fr_4fr] md:mt-0">
        <Adminsidebar />
        <div className="min-h-screen  p-6">
          <div className="flex justify-start items-center space-x-4 mb-6">
            {/* <button className="text-blue-500 ">Users</button> */}
          </div>

          <div className="md:grid grid-cols-3 space-y-4 md:space-y-0 gap-4">
            {/* grid 1 */}
            {users?.length > 0 &&
              users?.map((item) => (
                <div className="p-5 bg-gray-100 border border-gray-50 rounded shadow-2xl">
                  <h4 className="text-[#84b000] mb-5">ID: {item?._id}</h4>

                  <div className="flex items-center gap-9">
                    <div>
                      <img
                        src={
                          item.profile == ""
                            ? "https://static.vecteezy.com/system/resources/previews/009/292/244/non_2x/default-avatar-icon-of-social-media-user-vector.jpg"
                            : `${serverUrl}/upload/${item.profile}`
                        }
                        alt=""
                        className="w-15 h-15 rounded-full"
                      />
                    </div>
                    <div className="mb-3">
                      <h1 className="text-blue-800 text-xl">
                        {item?.username}
                      </h1>
                      <p>{item?.email}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default UserHostList;
