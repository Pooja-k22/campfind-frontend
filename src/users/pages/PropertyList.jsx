import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";

import { deleteCampApi, gethostCampApi } from "../../services/allApi";

function PropertyList() {
  const [camp, setCamp] = useState([]);

  // detete status
  const [deleteStatus, setdeleteStatus] = useState("");

  // get host camp
  const getHostCamp = async (token) => {
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const result = await gethostCampApi(reqHeader);
    console.log(result);
    if (result.status == 200) {
      setCamp(result.data);
    }
  };

  // camp delete
  const handleDelete = async (id) => {
    const result = await deleteCampApi(id);
    console.log(result);
    if (result.status == 200) {
      setdeleteStatus(result.data);
    }
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      getHostCamp(token);
    }
  }, [deleteStatus]);

  return (
    <>
      <div className="p-4 md:px-15 w-full ">
        {camp?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3  gap-4">
            {camp?.map((item) => (
              <div className="bg-white rounded-xl relative shadow-2xl overflow-hidden hover:shadow-lg transition duration-300">
                <img
                  src={item?.imageUrl}
                  alt="no image"
                  className="w-full h-45 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {item?.title}
                  </h3>
                  <p className="text-sm  text-gray-500">
                    {item?.location.slice(0, 28)}...
                  </p>

                  <div className="mt-4 flex justify-end items-center">
                    {item?.status == "pending" ? (
                      <img
                        src="https://st3.depositphotos.com/2229436/13719/v/450/depositphotos_137196464-stock-illustration-yellow-rhomb-exclamation-mark-icon.jpg"
                        className="w-10 h-10"
                        alt=""
                      />
                    ) : (
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/9463/9463474.png"
                        className="w-10 h-10"
                        alt=""
                      />
                    )}

                    <div className="absolute top-1 right-2">
                      <button
                        onClick={() => handleDelete(item?._id)}
                        className="text-red-600 bg-white py-1 px-2 rounded-full  hover:text-red-100 font-medium"
                      >
                        <FontAwesomeIcon icon={faTrashCan} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className=" text-gray-700 text-bold text-center text-2xl">
            Not Host Anything!
          </p>
        )}
      </div>
    </>
  );
}

export default PropertyList;
