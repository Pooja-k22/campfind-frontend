import React, { useContext, useEffect, useState } from "react";
import AdminHeader from "../components/AdminHeader";
import Adminsidebar from "../components/Adminsidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { toast, ToastContainer } from "react-toastify";
import { adminProfileUpdateApi } from "../../services/allApi";
import { adminProfileContex } from "../../context/ContextShare";
import { serverUrl } from "../../services/serverUrl";

const AdminSettings = () => {
  const { setadminProfile } = useContext(adminProfileContex);
  // state to store adminD
  const [adminD, setadminD] = useState({
    username: "",
    password: "",
    cPassword: "",
    profile: "",
  });
  // preview
  const [preview, setpreview] = useState("");
  const [token, setToken] = useState("");

  // existingprofileImg
  const [existingProfileImg, setexistingProfileImg] = useState("");
  // for update status of edit profile section
  const [updateStatus, setupdateStatus] = useState({});

  const handleimg = (e) => {
    setadminD({ ...adminD, profile: e.target.files[0] });

    if (e.target.files[0]) {
      const url = URL.createObjectURL(e.target.files[0]);
      setpreview(url);
    }
  };

  // handle reset
  const handlereset = () => {
    if (sessionStorage.getItem("token")) {
      const admin = JSON.parse(sessionStorage.getItem("existingUser"));
      setadminD({
        username: admin.username,
        password: admin.password,
        cPassword: admin.password,
      });
      setexistingProfileImg(admin.profile);
    }
    setpreview("");
  };

  // handle submit
  const handleSubmit = async () => {
    const { username, password, cPassword, profile } = adminD;
    if (!username || !password || !cPassword) {
      toast.warning("please fill all field");
    } else {
      if (password != cPassword) {
        toast.warning("password must match");
      } else {
        if (preview) {
          const reqHeader = {
            Authorization: `Bearer ${token}`,
          };

          const reqBody = new FormData();

          for (let key in adminD) {
            reqBody.append(key, adminD[key]);
          }

          const result = await adminProfileUpdateApi(reqBody, reqHeader);
          console.log(result);

          if (result.status == 200) {
            toast.success("update successfully");
            sessionStorage.setItem("existingUser", JSON.stringify(result.data));

            setupdateStatus(result.data);
            setadminProfile(result.data);
          } else {
            toast.error("something went wrong");
          }
        } else {
          const reqHeader = {
            Authorization: `Bearer ${token}`,
          };

          const result = await adminProfileUpdateApi(
            { username, password, profile: existingProfileImg },
            reqHeader
          );
          //console.log(result);

          if (result.status == 200) {
            toast.success("update successfully");
            sessionStorage.setItem("existingUser", JSON.stringify(result.data));

            setupdateStatus(result.data);
            setadminProfile(result.data);
          } else {
            toast.error("something went wrong");
          }
        }
      }
    }
  };

  console.log(adminD);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      setToken(token);
      const admin = JSON.parse(sessionStorage.getItem("existingUser"));
      setadminD({
        username: admin.username,
        password: admin.password,
        cPassword: admin.password,
      });
      setexistingProfileImg(admin.profile);
    }
  }, [updateStatus]);

  return (
    <>
      <AdminHeader />

      <div className="md:grid grid-cols-[1fr_4fr] md:mt-0">
        <Adminsidebar />

        <div className="min-h-screen flex flex-col items-center justify-start p-4 mt-5">
          <h1 className="text-2xl font-bold mb-6">Settings</h1>
          <div className="flex flex-col md:flex-row md:items-start items-center gap-8 w-full ">
            {/* Left Text Section */}
            <div className="w-full md:mt-2 text-lg text-gray-700  space-y-4 py-4 rounded px-5">
              <p className="text-justify">
                As an administrator of CampFind, you have the tools to manage
                and oversee the entire platform efficiently. From updating your
                profile to managing user-submitted camp spots, your role ensures
                that campers have a safe, reliable, and enjoyable experience.
              </p>
              <p className="text-justify">
                You can update your personal information, change your password,
                and upload a new profile picture at any time. Keeping your
                profile up-to-date helps us maintain transparency and a
                professional experience for everyone using CampFind.
              </p>
            </div>

            {/* Right Form Section */}
            <div className=" w-full  p-6">
              <form className=" bg-[#f5ffe3] p-6 rounded-xl shadow space-y-4">
                {/* Profile Picture Section */}

                <div className="flex flex-col items-center mb-6">
                  <div className="relative">
                    <label
                      htmlFor="profilefile"
                      className="relative cursor-pointer"
                    >
                      <input
                        onChange={(e) => handleimg(e)}
                        type="file"
                        id="profilefile"
                        style={{ display: "none" }}
                      />
                      {existingProfileImg == "" ? (
                        <img
                          src={preview ? preview : "/images/admin.png"}
                          alt="Profile"
                          className="h-40 w-40 rounded-full object-cover bg-gray-300"
                        />
                      ) : (
                        <img
                          src={
                            preview
                              ? preview
                              : `${serverUrl}/upload/${existingProfileImg}`
                          }
                          alt="Profile"
                          className="h-40 w-40 rounded-full object-cover bg-gray-300"
                        />
                      )}
                      <div className="absolute bottom-2 right-2 bg-orange-500 text-white p-2 rounded-full">
                        <FontAwesomeIcon icon={faPen} />
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <input
                    name="name"
                    value={adminD.username}
                    onChange={(e) =>
                      setadminD({ ...adminD, username: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    type="text"
                    placeholder="Enter your name"
                  />
                </div>

                <div>
                  <input
                    name="email"
                    value={adminD.password}
                    onChange={(e) =>
                      setadminD({ ...adminD, password: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    type="password"
                    placeholder="Enter new password"
                  />
                </div>

                <div>
                  <input
                    name="password"
                    value={adminD.cPassword}
                    onChange={(e) =>
                      setadminD({ ...adminD, cPassword: e.target.value })
                    }
                    className="w-full border border-gray-300 rounded-lg px-4 py-2"
                    type="password"
                    placeholder="Confirm password"
                  />
                </div>

                <div className="flex gap-6 ">
                  <button
                    onClick={handlereset}
                    type="button"
                    className="mt-4 px-6 py-2 bg-orange-500 hover:bg-orange-500 text-white font-semibold rounded-lg"
                  >
                    Reset
                  </button>

                  <button
                    onClick={handleSubmit}
                    type="button"
                    className="mt-4 px-6 py-2 border border-orange-500 border-dashed hover:bg-orange-500 hover:text-white text-orange-500 font-semibold rounded-lg"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer position="top-center" theme="colored" autoClose={2000} />
    </>
  );
};

export default AdminSettings;
