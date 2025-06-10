import { faFacebook } from "@fortawesome/free-brands-svg-icons/faFacebook";
import { faInstagram } from "@fortawesome/free-brands-svg-icons/faInstagram";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import { faTwitter } from "@fortawesome/free-brands-svg-icons/faTwitter";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { FaArrowRight, FaCampground } from "react-icons/fa";

function Footer() {
  return (
    <>
      <footer className="bg-[#2c2e2a] text-white py-8 ">
        <div className=" px-5 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-[2fr_2fr_1fr] gap-8 mb-5">
            {/* Camp Your Way Section */}
            <div>
              <div className="flex flex-col justify-center  items-center w-33 mb-3">
            <img src="/images/logo1.png" alt="" className="w-15" />
            <h1 className="text-orange-400  text-2xl font-bold">CAMPFIND</h1>
          </div>
              <p className="mb-4">
                Explore the best camping spots tailored to your needs. Whether
                you're into hiking, fishing, or just relaxing, we have the
                perfect spots for you. Start planning your adventure now!
              </p>
            </div>

            {/* Quick Links Section */}
            <div className="flex justify-start md:justify-center md:mt-5">
              <div className="">
                <h5 className=" text-xl md:text-2xl  mb-2 md:mb-4">STAY UPDATED</h5>
               <p>Subscribe to our newsletter for camping inspiration and special offers</p>
               <div className="flex mt-2">
                <input type="text" placeholder="Your email" className="border bg-white px-3 py-2 placeholder:text-gray-400 border-gray-300 rounded-l" />
                <span className="bg-orange-400 py-2 px-4 flex items-center rounded-r text-white"><FaArrowRight/></span>
               </div>
                  
              </div>
            </div>

            {/* Follow Us Section */}
            <div className="md:mt-5">
              <h4 className="text-xl md:text-2xl">FOLLOW US</h4>
              <p className="mt-3 md:mt-4 text-justify">Let Us be social</p>

              <div className="flex  items-center gap-8 mt-2 ">
                <div className=" rounded-full   text-2xl " >
                  <FontAwesomeIcon icon={faInstagram}  className="hover:text-amber-400"/>
                </div>
                <div className=" rounded-full  text-2xl ">
                  <FontAwesomeIcon icon={faTwitter} className="hover:text-amber-400" />
                </div>
                <div className=" rounded-full   text-2xl ">
                  <FontAwesomeIcon icon={faFacebook} className="hover:text-amber-400" />
                </div>
                <div className=" rounded-full   text-2xl  ">
                  <FontAwesomeIcon icon={faLinkedin} className="hover:text-amber-400"/>
                </div>
              </div>
            </div>
          </div>

          <hr className="text-gray-400" />
<p className="text-gray-300 text-sm mt-5 text-center">© 2025 CampFind All rights reserved | CampFind is created with ❤️ and hope for our future..</p>
        </div>
       
      </footer>
    </>
  );
}

export default Footer;
