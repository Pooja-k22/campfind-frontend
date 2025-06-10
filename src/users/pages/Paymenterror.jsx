import React from "react";

import { Link } from "react-router-dom";


function Paymenterror() {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex flex-col md:flex-row md:p-10 h-auto items-center shadow-lg rounded-xl md:space-y-0 md:space-x-10 bg-white">
          {/* Payment Card */}
          <div className="p-6 rounded-xl md:shadow-md w-100">
            <div className="flex flex-col items-center">
              {/* Red Cross Icon or Image */}
              <div className="rounded-full bg-red-100 p-4 mb-4">
                <svg
                  className="w-10 h-10 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>

              <h2 className="text-red-600 text-3xl font-semibold mb-1">
                Oops!
              </h2>
              <p className="text-gray-500 text-lg mb-4">Payment Failed!</p>

              <div className="flex flex-col w-full text-gray-700 text-sm border-t pt-4">
                <p className="p-3">
                  Something went wrong with your transaction. Please try again
                  or contact support.
                </p>

                <div className="flex justify-center items-center mt-8  space-x-4">
                  <Link to={"/"}>
                    <button className="rounded-full text-white px-4 py-2 bg-red-500 hover:bg-red-600 transition">
                      Back Home
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Illustration */}
          <div className="">
            <img
              src="https://thumbs.dreamstime.com/b/vector-illustration-broken-credit-card-327755205.jpg"
              alt="Payment Failed Illustration"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Paymenterror;
