import { faCircleCheck } from "@fortawesome/free-solid-svg-icons/faCircleCheck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useContext } from "react";
import Header from "../components/Header";
import EditProfile from "../components/EditProfile";
import { useState, useEffect } from "react";
import { getUserBookingApi } from "../../services/allApi";
import { serverUrl } from "../../services/serverUrl";
import { userProfileContex } from "../../context/ContextShare";
import PropertyList from "../pages/PropertyList";
import ReservationList from "../pages/ReservationList";
import Wishlist from "../pages/Wishlist";

function UserProfile() {
  const [token, setToken] = useState("");

  const [activeTab, setActiveTab] = useState("booking");

  // contex share
  const { userProfile } = useContext(userProfileContex);
  const [booking, setBooking] = useState([]);

  // userdetails
  const [userD, setuserD] = useState({
    username: "",
    email: "",
    profile: "",
  });

  const getUserBooking = async (token) => {
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const result = await getUserBookingApi(reqHeader);
    //console.log(result);
    if (result.status == 200) {
      setBooking(result.data);
    }
  };
  console.log(booking);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      setToken(token);
      getUserBooking(token);
      const user = JSON.parse(sessionStorage.getItem("existingUser"));
      setuserD({
        username: user.username,
        email: user.email,
        profile: user.profile,
      });
    }
  }, [userProfile]);

  return (
    <>
      <Header />
      <div className="min-h-screen md:mt-16 bg-gray-100">
        {/* Background Image */}
        <div
          className="h-48 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://campmonk.s3.ap-south-1.amazonaws.com/event-banner/c096ea37-d4bb-45c6-86a0-97ca1401de67.webp",
            height: "250px",
          }}
        ></div>

        <div className="  grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-6 p-4">
          {/* Profile Image */}
          <div className="flex flex-col items-center -mt-15 md:ml-10 bg-white rounded-2xl shadow-md p-10  max-h-[350px]">
            {/* Profile Image */}
            <div className="relative">
              <img
                src={
                  userD.profile == ""
                    ? "https://cdn-icons-png.flaticon.com/512/219/219988.png"
                    : `${serverUrl}/upload/${userD.profile}`
                }
                alt="Profile"
                className=" h-28 rounded-full border-4 border-white shadow-md"
              />
              <FontAwesomeIcon
                icon={faCircleCheck}
                className="absolute bottom-0 right-0 bg-white text-orange-500 p-1 rounded-full shadow"
              />
            </div>

            {/* User Info */}
            <h2 className="mt-4 text-xl font-semibold">{userD.username}</h2>
            <p className="text-gray-600 text-sm">{userD.email}</p>

            {/* Booking & Review Counts */}
            <div className="flex justify-center items-center w-full mt-4"></div>

            {/* Edit Button */}
            <EditProfile />
          </div>

          {/* tabs and content */}
          <div className="bg-white md:p-6 rounded-xl">
            <div className="flex gap-2 mt-4 md:mt-0 md:gap-4 mb-6 overflow-auto">
              <button
                onClick={() => setActiveTab("booking")}
                className={
                  activeTab === "booking"
                    ? "bg-orange-500 text-white rounded-full font-bold  px-2 md:px-3 py-2"
                    : "text-orange-500 border border-orange-500 bg-white rounded-full px-2 md:px-3 py-2"
                }
              >
                Booking
              </button>

              <button
                onClick={() => setActiveTab("wishlist")}
                className={
                  activeTab === "wishlist"
                    ? "bg-orange-500 text-white rounded-full font-bold  px-2 md:px-3 py-2"
                    : "text-orange-500 border border-orange-500 bg-white rounded-full px-2 md:px-3 py-2"
                }
              >
                Wishlist
              </button>
            </div>

            <div>
              {activeTab === "booking" && (
                <div className="text-sm text-gray-600 p-3">
                  {booking.length > 0 ? (
                    booking.map((item) => (
                      <div
                        key={item._id}
                        className="shadow bg-gray-100 rounded py-3 px-5 flex justify-between items-center mb-4"
                      >
                        <div className="flex justify-center items-center">
                          <img
                            src={item?.campId?.imageUrl}
                            className="w-30 h-30 rounded"
                            alt=""
                          />
                          <div className="ms-7">
                            <div className="text-orange-600 font-bold">
                              {item?.campId?.title}
                            </div>
                            <div className="text-gray-400">
                              {new Date(item.checkInDate).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        <div className="text-gray-600 font-semibold hidden md:block">
                          Booked
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="mt-5 text-bold text-2xl">
                      No completed bookings yet.
                    </p>
                  )}
                </div>
              )}

              {activeTab === "wishlist" && <Wishlist />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserProfile;
