import React from "react";
import { Link } from "react-router-dom";


function Paymentsuccess() {
  return (
    <>
      <div className="min-h-screen flex  items-center justify-center bg-gray-100 mx-7">
        <div className="flex flex-col md:flex-row md:p-10  md:h-140 items-center  shadow-lg rounded-xl  space-y-6 md:space-y-0 md:space-x-10 bg-white ">
          {/* Payment Card */}
          <div className="  p-6  rounded-xl  md:shadow-md w-100">
            <div className="flex flex-col items-center">
              <div className=" rounded-full ">
                <img
                  src="https://lh5.googleusercontent.com/proxy/hzihlVDBC8a7rHOdijfUwQXND6HU6FZl12s1hmNkhrBugSgWI4gHFmpokB2K0KOR03W2wQ_7znYs5FDlLAeUEFtJ"
                  alt=""
                  className="w-50 rounded-full"
                />
              </div>
              <h2 className="text-[#00c294] text-3xl font-semibold mb-1">
                Thank You!
              </h2>

              <p className="text-gray-500 text-lg mb-4">Payment Successful!</p>
              <div className="flex  flex-col  w-full text-gray-700 text-sm border-t pt-4 ">
                <p className="p-4">
                  {" "}
                  You will be redirected to the home page shortly or click here
                  to return to home page
                </p>

                <div className="flex justify-center items-center mt-8">
                  <Link to={"/"}>
                    <button className="rounded-full text-white px-3 py-2  bg-[#00c294]">
                      Back Home
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="w-60 h-60 md:w-100 md:h-auto ">
            <img
              src="https://cdni.iconscout.com/illustration/premium/thumb/man-booking-hotel-on-mobile-illustration-download-in-svg-png-gif-file-formats--app-online-lodge-business-activities-pack-illustrations-6836368.png"
              alt="Payment Illustration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Paymentsuccess;
