import React, { useEffect, useState } from "react";
import Adminsidebar from "../components/Adminsidebar";
import AdminHeader from "../components/AdminHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons/faUsers";
import { faTent } from "@fortawesome/free-solid-svg-icons/faTent";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getAllBookingsApi } from "../../services/allApi";

function AdminDashboard() {
  const [bookings, setBookings] = useState([]);
  const getBookings = async () => {
    const result = await getAllBookingsApi();
    console.log(result);
    if (result.status == 200) {
      setBookings(result.data);
    } else {
      alert("something went wrong");
    }
  };

  useEffect(() => {
    getBookings();
  }, []);
  return (
    <>
      <AdminHeader />
      <div className="md:grid grid-cols-[1fr_4fr] min-h-screen md:mt-0 ">
        <Adminsidebar />

        <div className="p-8  ">
          {/* Stats cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-10 mt-5">
            <div className="bg-gradient-to-r from-[#002850] to-[#09779c]  text-white rounded-xl shadow p-6 flex  items-center gap-5">
              <FontAwesomeIcon
                icon={faUsers}
                className="text-white  text-4xl"
              />

              <div className="flex flex-col justify-center items-start md:items-center">
                <p className="text-lg mb-2">Total Number of Users</p>
                <h2 className="text-3xl font-semibold">100+</h2>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#cf7031] to-[#ffa200]  text-white rounded-xl shadow p-6 flex  items-center gap-5">
              <FontAwesomeIcon icon={faTent} className="text-white text-4xl" />

              <div className="flex flex-col justify-center items-start md:items-center">
                <p className="text-lg mb-2">Total Number of Camps</p>
                <h2 className="text-3xl font-semibold">100+</h2>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#007400] to-[#004934]  text-white rounded-xl shadow p-6 flex  items-center gap-5">
              <FontAwesomeIcon
                icon={faUsers}
                className="text-white  text-4xl"
              />

              <div className="flex flex-col justify-center items-start md:items-center">
                <p className="text-lg mb-2">Total Number of Bookings</p>
                <h2 className="text-3xl font-semibold">100+</h2>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto p-4">
            <h2 className="text-2xl font-bold mb-4 text-green-900">
              Booking List
            </h2>
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
              <thead className="bg-[#f2f6ec] text-green-900">
                <tr>
                  <th className="py-3 px-4 text-left">#</th>
                  <th className="py-3 px-4 text-left">User</th>
                  <th className="py-3 px-4 text-left">Email</th>
                  <th className="py-3 px-4 text-left">Camp Title</th>
                  <th className="py-3 px-4 text-left">Location</th>
                  <th className="py-3 px-4 text-left">Guests</th>
                  <th className="py-3 px-4 text-left">Check-In</th>
                  <th className="py-3 px-4 text-left">Total Price</th>
                  <th className="py-3 px-4 text-left">Host Email</th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                {bookings && bookings.length > 0 ? (
                  bookings.map((booking, index) => (
                    <tr key={booking._id} className="border-t hover:bg-gray-50">
                      <td className="py-3 px-4">{index + 1}</td>
                      <td className="py-3 px-4">
                        {booking.userId?.username || "N/A"}
                      </td>
                      <td className="py-3 px-4">
                        {booking.userId?.email || "N/A"}
                      </td>
                      <td className="py-3 px-4">
                        {booking.campId?.title || "N/A"}
                      </td>
                      <td className="py-3 px-4">
                        {booking.campId?.location || "N/A"}
                      </td>
                      <td className="py-3 px-4">{booking.numberOfGuests}</td>
                      <td className="py-3 px-4">
                        {new Date(booking.checkInDate).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4">₹{booking.totalPrice}</td>
                      <td className="py-3 px-4">{booking.hostMail}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="text-center py-4 text-gray-400">
                      No bookings available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminDashboard;
