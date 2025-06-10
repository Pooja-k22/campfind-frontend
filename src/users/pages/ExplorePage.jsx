import React, { useContext, useState } from "react";
import Header from "../components/Header";
import { Link } from "react-router-dom";

import { FaSearch } from "react-icons/fa";
import { useEffect } from "react";
import { getAllCampApi } from "../../services/allApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSortDown } from "@fortawesome/free-solid-svg-icons";
import { searchkeyContex } from "../../context/ContextShare";

export default function ExplorePage() {
  const [status, setStatus] = useState(false);
  // token
  const [token, setToken] = useState("");

  // store camp
  const [allCamp, setallCamp] = useState([]);
  const [tempArray, settempArray] = useState([]);

  // get camp spot
  const getCampSpot = async (searchkey, token) => {
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
    const result = await getAllCampApi(searchkey, reqHeader);
    //console.log(result);
    if (result.status == 200) {
      setallCamp(result.data);
      settempArray(result.data);
    }
  };
  //console.log(allCamp);

  // search call
  const { searchkey, setsearchkey } = useContext(searchkeyContex);

  const [selectedType, setSelectedType] = useState("");
  const [selectedPrice, setSelectedPrice] = useState("");

  const applyFilters = (type, price) => {
    let filtered = [...tempArray];

    if (type) {
      filtered = filtered.filter(
        (item) => item.category.toLowerCase() === type.toLowerCase()
      );
    }

    if (price) {
      if (price === "below1000") {
        filtered = filtered.filter((item) => item.price < 1000);
      } else if (price === "1000-1500") {
        filtered = filtered.filter(
          (item) => item.price >= 1000 && item.price <= 1500
        );
      } else if (price === "1500-2000") {
        filtered = filtered.filter(
          (item) => item.price > 1500 && item.price <= 2000
        );
      } else if (price === "2000+") {
        filtered = filtered.filter((item) => item.price > 2000);
      }
    }

    setallCamp(filtered);
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      setToken(token);
      getCampSpot(searchkey, token);
    }
  }, [searchkey]);
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white text-gray-800 md:mt-20 ">
        {token ? (
          <div className="md:grid grid-cols-1 md:grid-cols-[1fr_4fr] gap-8 md:mt-16">
            {/* filter */}
            <div className="w-full bg-[#ffffff] p-3 md:p-6 h-auto md:min-h-screen md:shadow-2xl">
              <div className="flex justify-between items-center">
                {/* <h2 className="font-bold md:text-2xl">Filters</h2> */}
                <span onClick={() => setStatus(!status)} className="md:hidden">
                  <FontAwesomeIcon
                    icon={faSortDown}
                    className="text-xl text-[#a4ba62]"
                  />
                </span>
              </div>
              <div
                className={
                  status ? "md:block" : "md:block justify-center hidden"
                }
              >
                <h2 className="font-semibold text-lg mt-6 mb-2">Camp Type</h2>

                <div
                  onClick={() => {
                    setSelectedType("Tent");
                    applyFilters("Tent", selectedPrice);
                  }}
                >
                  <label className="block mb-2">
                    <input
                      checked={selectedType === "Tent"}
                      id="t
                Tent"
                      type="radio"
                      name="campType"
                      className="mr-2"
                    />
                    Tent
                  </label>
                </div>

                <div
                  onClick={() => {
                    setSelectedType("Glamping");
                    applyFilters("Glamping", selectedPrice);
                  }}
                >
                  <label className="block mb-2">
                    <input
                      checked={selectedType === "Glamping"}
                      id="Glamping"
                      type="radio"
                      name="campType"
                      className="mr-2"
                    />
                    Glamping
                  </label>
                </div>

                <div
                  onClick={() => {
                    setSelectedType("Cabin");
                    applyFilters("Cabin", selectedPrice);
                  }}
                >
                  <label className="block mb-2">
                    <input
                      checked={selectedType === "Cabin"}
                      id="Cabin"
                      type="radio"
                      name="campType"
                      className="mr-2"
                    />
                    Cabin
                  </label>
                </div>
                <div
                  onClick={() => {
                    setSelectedType("RV");
                    applyFilters("RV", selectedPrice);
                  }}
                >
                  <label className="block mb-2">
                    <input
                      checked={selectedType === "RV"}
                      id="RV"
                      type="radio"
                      name="campType"
                      className="mr-2"
                    />
                    RV
                  </label>
                </div>
                <div
                  onClick={() => {
                    setSelectedType("Treehouse");
                    applyFilters("Treehouse", selectedPrice);
                  }}
                >
                  <label className="block mb-2">
                    <input
                      checked={selectedType === "Treehouse"}
                      id="Treehouse"
                      type="radio"
                      name="campType"
                      className="mr-2"
                    />
                    Treehouse
                  </label>
                </div>

                <div
                  onClick={() => {
                    setSelectedType("Farm");
                    applyFilters("Farm", selectedPrice);
                  }}
                >
                  <label className="block mb-2">
                    <input
                      checked={selectedType === "Farm"}
                      id="Farm"
                      type="radio"
                      name="campType"
                      className="mr-2"
                    />
                    Farm
                  </label>
                </div>

                <h2 className="font-semibold text-lg mt-6 mb-2">Price</h2>

                <label className="block mb-2">
                  <input
                    checked={selectedPrice === "below1000"}
                    onChange={() => {
                      setSelectedPrice("below1000");
                      applyFilters(selectedType, "below1000");
                    }}
                    type="radio"
                    name="price"
                    className="mr-2"
                  />
                  below ₹1000
                </label>

                <label className="block mb-2">
                  <input
                    checked={selectedPrice === "1000-1500"}
                    onChange={() => {
                      setSelectedPrice("1000-1500");
                      applyFilters(selectedType, "1000-1500");
                    }}
                    type="radio"
                    name="price"
                    className="mr-2"
                  />
                  ₹1000–₹1500
                </label>

                <label className="block mb-2">
                  <input
                    checked={selectedPrice === "1500-2000"}
                    onChange={() => {
                      setSelectedPrice("1500-2000");
                      applyFilters(selectedType, "1500-2000");
                    }}
                    type="radio"
                    name="price"
                    className="mr-2"
                  />
                  ₹1500–₹2000
                </label>

                <label className="block mb-2">
                  <input
                    checked={selectedPrice === "2000+"}
                    onChange={() => {
                      setSelectedPrice("2000+");
                      applyFilters(selectedType, "2000+");
                    }}
                    type="radio"
                    name="price"
                    className="mr-2"
                  />
                  ₹2000+
                </label>

                <label className="block mb-2">
                  <input
                    checked={!selectedType && !selectedPrice}
                    onChange={() => {
                      setSelectedType("");
                      setSelectedPrice("");
                      setallCamp(tempArray); // reset to original
                    }}
                    type="radio"
                    name="nofilter"
                    className="mr-2"
                  />
                  No Filter
                </label>
              </div>
            </div>
            {/* Right Column: Explore Cards */}

            <div className="mt-6">
              <div>
                <div className="flex flex-col justify-center items-center mb-8">
                  {/* <h1 className="text-2xl md:text-3xl  font-bold text-gray-700  mb-5 ">
                    Explore
                  </h1> */}
                  <div className="relative w-80">
                    <input
                      value={searchkey}
                      onChange={(e) => setsearchkey(e.target.value)}
                      type="text"
                      placeholder="Search Here...."
                      className="rounded-full w-full py-2 px-4 pr-16 border shadow-2xl border-gray-300"
                    />
                    <button className="absolute right-0 top-1/2 transform -translate-y-1/2    text-orange-700 py-3  px-4 rounded-r-full hover:bg-orange-400 transition">
                      <FaSearch />
                    </button>
                  </div>
                </div>

                {/* Explore Cards */}
                {allCamp?.length > 0 ? (
                  <div className="md:grid grid-cols-3 gap-6 space-y-8 md:space-y-0 px-8 md:px-5 py-5">
                    {allCamp?.map((item) => (
                      <div
                        hidden={item?.status == "pending"}
                        className="bg-gray-100 rounded-xl overflow-hidden  shadow hover:shadow-lg transition"
                      >
                        <div className="">
                          <img
                            src={item?.imageUrl}
                            alt="Forest Retreat"
                            className="h-40 w-full object-cover"
                          />
                        </div>
                        <div className="p-4">
                          <h2 className="text-lg font-semibold">
                            {item?.title}
                          </h2>
                          <p className="text-sm text-gray-600">
                            {item?.location}
                          </p>
                          <div className="flex justify-between mt-2 text-sm">
                            <span>⭐ 4.9 </span>
                            <span>₹{item?.price}/night</span>
                          </div>
                          <Link to={`/campspot-details/${item?._id}`}>
                            <button className="mt-4 w-full text-white hover:text-black py-2 rounded  bg-gradient-to-r from-orange-400 to-pink-500 hover:bg-green-800">
                              View Details
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-column justify-center items-center">
                    <img
                      className="w-100 rounded-full"
                      src="https://cdn.prod.website-files.com/5fa27c3574b213fae018d63e/61db77ae62249315c10cf2d3_animation_500_kxszguql.gif"
                      alt=""
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="my-5 p-5 flex flex-col justify-center items-center">
            <p className="text-2xl">
              Please{" "}
              <Link to={"/login"} className="text-orange-600 hover:underline">
                Login
              </Link>{" "}
              to Explore More
            </p>
            <img
              src="https://assets-v2.lottiefiles.com/a/09c40a94-1179-11ee-a418-7394edff93c8/NEgtRnqrdz.gif"
              className=""
              alt=""
            />
          </div>
        )}
      </div>
    </>
  );
}
