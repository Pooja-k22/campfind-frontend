import React, { useEffect, useState } from "react";

import { getReservationApi } from "../../services/allApi";

function ReservationList() {
  

  // store reservation
  const [reservation, setReservation] = useState([]);

  // function for api reservation
  const getReservation = async (token) => {
    const reqHeader = {
      "Authorization": `Bearer ${token}`,
    };

    const result = await getReservationApi(reqHeader);
    //console.log(result);
    if (result.status == 200) {
      setReservation(result.data);
    }
  };
  console.log(reservation);

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      
      getReservation(token);
    }
  }, []);

  return (
    <>
      <div className=" bg-white px-6 py-4 ">
        <div className="space-y-4">
          {reservation.length > 0 ? (
            reservation.map((item) => (
              <div>
                <div className="flex items-center justify-between bg-gray-100 md:px-4 py-4 rounded-lg">
                  <div className="flex items-center space-x-4 ">
                    <img
                      src={item?.campId?.imageUrl}
                      alt="Forest Retreat"
                      className="w-18 h-18 md:h-30 md:w-40 rounded object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-orange-600">
                        {item?.userId?.username}
                      </h3>
                      <p className="text-sm text-black">
                        {item?.userId?.email}
                      </p>
                      <p className="text-sm text-gray-600">
                        Booked:{" "}
                        {new Date(item?.checkInDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-green-800 me-9">
                    Booked
                  </div>
                </div>
                <hr className="text-gray-400" />
              </div>
            ))
          ) : (
            <p className=" text-bold text-gray-700 text-2xl">
              No Reservation yet.
            </p>
          )}
        </div>
      </div>
    </>
  );
}

export default ReservationList;
