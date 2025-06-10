import React, { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

import { useState } from "react";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import {
  FaMapMarkedAlt,
  FaCalendarAlt,
  FaLock,
  FaCampground,
  FaPhone,
  FaEnvelope,
  FaArrowRight,
} from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { getHomeCampSpotApi } from "../../services/allApi";

function HomePage() {
  // this create reference for section in dom element
  const ref1 = useRef(null);
  // check if that section is visible on screen - framer motn hook
  const isInView1 = useInView(ref1, { once: true, margin: "-100px" });

  const ref2 = useRef(null);
  const isInView2 = useInView(ref2, { once: true, margin: "-100px" });
  const ref3 = useRef(null);
  const isInView3 = useInView(ref3, { once: true, margin: "-100px" });

  const [openIndex, setOpenIndex] = useState(null);

  const [token, setToken] = useState("");
  const navigate = useNavigate();

  // state to store camp spot
  const [homeCamp, sethomeCamp] = useState([]);

  const getAllHomeCamp = async () => {
    const result = await getHomeCampSpotApi();
    // console.log(result);
    if (result.status == 200) {
      sethomeCamp(result.data);
    }
  };
  //console.log(homeCamp);

  // navigate getstart
  const getstart = () => {
    if (token) {
      navigate("/explore");
    } else {
      navigate("/login");
    }
  };

  // navigate starthosting
  const startHosting = () => {
    if (token) {
      navigate("/spot-adding");
    } else {
      navigate("/login");
    }
  };

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  useEffect(() => {
    getAllHomeCamp();
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      setToken(token);
    }
  }, []);
  return (
    <>
      <Header />
      <div className=" overflow-hidden md:mt-8 bg-white text-gray-800">
        {/* Hero Section */}
        <section className="bg-[#d1dda6] relative  min-h-auto py-9  md:grid grid-cols-2  gap-10 justify-center items-start  px-5 md:px-9">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className=" mt-10 mb-8 md:mb-0 md:mt-48 "
          >
            <h1 className="text-4xl md:text-6xl text-[#191a17] font-bold mt-5 md:mt-10 mb-3 text-start w-full md:w-200">
              Find Your Perfect Camping Escape
            </h1>
            <p className="text-[#2f302e] ps-1">
              Fuel your wanderlust with the perfect campsite.
            </p>
            {/* Get Started Button */}
            <div onClick={getstart} className="flex mt-9">
              <span className="  bg-gray-200 text-gray-500 px-12 py-2  rounded text-sm md:text-lg  hover:from-orange-600 hover:to-yellow-600 transition duration-300">
                Get Started
              </span>
              <span className="bg-[#191a17] py-2 px-6 flex items-center rounded-r text-white">
                <FaArrowRight />
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <img src="/images/camp.png" alt="" className=" w-85 md:w-full " />
          </motion.div>
        </section>
        {/* Featured Camps */}

        <section ref={ref1} className="py-12 px-6 md:px-16">
          <motion.h2
            initial={{ y: 40, opacity: 0 }}
            animate={isInView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1 }}
            className="text-3xl font-bold text-center text-gray-900 mb-3"
          >
            Popular Spots
          </motion.h2>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={isInView1 ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-6 text-[#b2a824]"
          >
            Explore our most popular camping destinations and start planning
            your next getaway.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {homeCamp?.length > 0 ? (
              homeCamp?.map((item) => (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView1 ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.8, type: "spring", stiffness: 300 }}
                  whileHover={{ y: -12, scale: 1.03 }}
                  className="bg-gray-100 mt-5 rounded-xl overflow-hidden shadow hover:shadow-lg transition relative"
                >
                  <img
                    src={item?.imageUrl}
                    alt="Camp"
                    className="h-40 w-full object-cover "
                  />

                  <div className="p-4">
                    <h3 className="text-lg font-medium">{item?.title}</h3>
                    <p className="text-sm text-gray-500">{item.location}</p>
                    <div className="mt-2 flex justify-between text-sm">
                      {/* <span>⭐ 4.8</span> */}
                      <span>₹{item?.price}/night</span>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <p>Loading...</p>
            )}
          </div>

          <div className="flex justify-center items-center mt-10">
            <Link to="/explore">
              <button className="px-3 py-2 bg-green-900 text-white hover:border hover:border-blue-950 hover:text-blue-950 hover:bg-white">
                Explore More
              </button>
            </Link>
          </div>
        </section>

        {/* host */}
        <motion.div
          ref={ref2}
          initial={{ opacity: 0, y: 80 }}
          animate={isInView2 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
          className="z-0 md:mx-12 my-12 px-4"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-lg">
            <img
              src="https://www.h-und.ch/default-wAssets/img/camping-mit-hund/schweiz/jungfrau-camp/weblication/wThumbnails/JungfrauCamp-14-1-b1fc3f5f-7a02c253@688ll.jpg"
              alt="Glamping Pods"
              className="w-full h-[400px] object-cover "
            />
            <div className="absolute top-0 left-0 w-full h-full  bg-opacity-30 flex items-center">
              <div className="bg-orange-600 text-white sm:w-3/4 md:w-1/4 p-8 rounded-2xl mx-5 md:ml-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4">
                  Grow your camping or glamping business.
                </h2>
                <p className="text-sm sm:text-base mb-6">
                  Host our community of good-natured campers at your campsite,
                  glamping site.
                </p>

                <button
                  onClick={startHosting}
                  className="bg-white text-orange-600 font-semibold px-6 py-3 rounded-full shadow hover:bg-orange-100 transition"
                >
                  Start hosting
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* how its work */}
        <section className="bg-[#ecf4de] py-16 px-6 md:px-20">
          <motion.div
            whileHover={{ y: -12, scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="text-center mb-5 md:mb-12 "
          >
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              How It Works
            </h2>
            <p className="text-gray-500 text-lg">
              Plan your perfect outdoor getaway in 3 easy steps!
            </p>
          </motion.div>
          <div className="grid space-y-5 md:space-y-0 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              whileHover={{ x: -12, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className=" p-6  rounded-2xl bg-gray-50 hover:shadow-lg  flex flex-col justify-center items-start"
            >
              <FaMapMarkedAlt className="text-orange-400  text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Discover Spots
              </h3>
              <p className="text-gray-500 ">
                Search and explore unique camping spots near lakes, forests, and
                mountains.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -12, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className=" p-6 rounded-2xl bg-gray-50 hover:shadow-lg  flex flex-col justify-center items-start"
            >
              <FaCalendarAlt className="text-orange-400 text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Choose Dates
              </h3>
              <p className="text-gray-500 ">
                Pick your dates and check real-time availability.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ x: -12, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className=" p-6 rounded-2xl bg-gray-50 hover:shadow-lg  flex flex-col justify-center items-start"
            >
              <FaLock className="text-orange-400 text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Book Securely
              </h3>
              <p className="text-gray-500 ">
                Confirm your spot with secure payment and instant confirmation.
              </p>
            </motion.div>

            <motion.div
              whileHover={{ y: -12, scale: 1.03 }}
              transition={{ type: "spring", stiffness: 300 }}
              className=" p-6 rounded-2xl bg-gray-50  hover:shadow-lg  flex flex-col justify-center items-start"
            >
              <FaCampground className="text-orange-400 text-4xl mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Enjoy Your Trip
              </h3>
              <p className="text-gray-500 ">
                Pack your gear and enjoy the great outdoors with peace of mind.
              </p>
            </motion.div>
          </div>
        </section>

        {/* faq section */}
        <section className="bg-[#ffffff] py-15 px-6 md:px-16">
          {" "}
          <h2 className="text-3xl font-bold text-center text-green-800 mb-8">
            Frequently Asked Questions
          </h2>{" "}
          <div ref={ref3} className="max-w-3xl mx-auto space-y-4">
            {/* Question 1 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView3 ? { opacity: 1, x: 0 } : {}}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="border-b pb-4"
            >
              <button
                onClick={() => toggle(0)}
                className="w-full text-left text-lg font-medium mb-2 flex justify-between items-center"
              >
                How do I book a campsite?
                <span className="text-xl">{openIndex === 0 ? "−" : "+"}</span>
              </button>
              {openIndex === 0 && (
                <p className="text-gray-600 text-sm">
                  Simply search for your desired location, select the campsite
                  you like, and click "View Details" to proceed with booking.
                </p>
              )}
            </motion.div>

            {/* Question 2 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView3 ? { opacity: 1, x: 0 } : {}}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="border-b pb-4"
            >
              <button
                onClick={() => toggle(1)}
                className="w-full text-left text-lg font-medium mb-2 flex justify-between items-center"
              >
                How do I become a host and list my campsite?
                <span className="text-xl">{openIndex === 1 ? "−" : "+"}</span>
              </button>
              {openIndex === 1 && (
                <p className="text-gray-600 text-sm">
                  Click “Become a Host,” sign up, and follow the steps to list
                  your property.
                </p>
              )}
            </motion.div>

            {/* Question 3 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView3 ? { opacity: 1, x: 0 } : {}}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="border-b pb-4"
            >
              <button
                onClick={() => toggle(2)}
                className="w-full text-left text-lg font-medium mb-2 flex justify-between items-center"
              >
                Are the camping spots verified?
                <span className="text-xl">{openIndex === 2 ? "−" : "+"}</span>
              </button>
              {openIndex === 2 && (
                <p className="text-gray-600 text-sm">
                  Yes, every listing goes through a verification process before
                  being made public.
                </p>
              )}
            </motion.div>

            {/* Question 4 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView3 ? { opacity: 1, x: 0 } : {}}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="border-b pb-4"
            >
              <button
                onClick={() => toggle(3)}
                className="w-full text-left text-lg font-medium mb-2 flex justify-between items-center"
              >
                What amenities are usually provided at campsites?
                <span className="text-xl">{openIndex === 3 ? "−" : "+"}</span>
              </button>
              {openIndex === 3 && (
                <p className="text-gray-600 text-sm">
                  Amenities vary by location but may include tents, restrooms,
                  fire pits, electricity, and more.
                </p>
              )}
            </motion.div>
          </div>
        </section>

        <section className=" bg-[#ebf3d3] md:flex justify-between items-center py-10 px-5 gap-8 md:px-17">
          <div className="mb-3 md:mb-0 ">
            <h4 className="font-bold text-2xl mb-2">
              We are always here to help{" "}
            </h4>
            <p className="text-gray-400 ">
              Have questions or need assistance? Our team is ready to support
              you anytime, so you can focus on enjoying your adventure.
            </p>
          </div>

          <div className="md:flex flex-wrap gap-15">
            <div className="flex items-center gap-4 mb-3 md:mb-0">
              <FaLocationDot className="font-bold text-xl" />
              <div>
                <h5 className="font-bold">Location</h5>
                <p className="text-gray-400">123,xyy</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-3 md:mb-0">
              <FaPhone className="font-bold text-xl" />
              <div>
                <h5 className="font-bold">Phone</h5>
                <p className="text-gray-400">+0123456789</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-3 md:mb-0">
              <FaEnvelope className="font-bold text-xl" />
              <div>
                <h5 className="font-bold">Email Support</h5>
                <p className="text-gray-400">campfind@gmail.com</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default HomePage;
