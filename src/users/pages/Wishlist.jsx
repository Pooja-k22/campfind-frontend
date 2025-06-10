import React, { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { getWishlistApi } from "../../services/allApi";
import { wishlistContext } from "../../context/ContextShare";

function Wishlist() {
  
  const {wishlist,setWishlist} = useContext(wishlistContext)

  // get wishlist
  const getWishlist = async (token) => {
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
    const result = await getWishlistApi(reqHeader);
    //console.log(result);
    if (result.status == 200) {
     
      setWishlist(result.data.wishlist)
    }
  };
  console.log(wishlist);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      getWishlist(token);
    }
  }, []);
  return (
    <>
      <div className=" p-5 ">
        {wishlist?.length > 0 ? (
          <div className="md:grid grid-cols-3 gap-6 space-y-5 md:space-y-0   ">
            {wishlist?.map((item) => (
              <div className="bg-gray-100 rounded-xl overflow-hidden shadow hover:shadow-lg transition">
                <div className="relative">
                  <img
                    src={item?.imageUrl}
                    alt="Forest Retreat"
                    className="h-35 w-full object-cover"
                  />
                  {/* <FaTimes className="text-orange-500 text-xl absolute top-3 right-3 " /> */}
                </div>
                <div className="p-4">
                  <h2 className="text-md font-semibold">{item?.title}</h2>
                  <p className="text-sm text-gray-600">{item?.location}</p>

                  <Link to={`/campspot-details/${item?._id}`}>
                    <button className="mt-4 w-full text-white py-2 rounded hover:bg-green-800 bg-gradient-to-r from-orange-400 to-pink-500">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className=" text-bold text-gray-700 text-2xl">No Wishlist yet.</p>
        )}
      </div>
    </>
  );
}

export default Wishlist;
