import {
  FaCalendarAlt,
  FaHeart,
  FaSignInAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import Header from "../components/Header";
import { Link, useParams } from "react-router-dom";

import {
  viewACampApi,
  addbookingApi,
  WishlistApi,
  checkCapacityApi,
  addReviewApi,
  getReviewApi,
} from "../../services/allApi";
import { useEffect, useState } from "react";
import { serverUrl } from "../../services/serverUrl";
import { FaLocationDot } from "react-icons/fa6";
import { loadStripe } from "@stripe/stripe-js";
import { toast, ToastContainer } from "react-toastify";

export default function CampSpotDetailPage() {
  // booking capacity check
  const [isFullyBooked, setIsFullyBooked] = useState(false);

  const [token, setToken] = useState("");
  // store camp detail
  const [viewCampDetails, setviewCampDetails] = useState({});

  // wishlist
  const [isWishlisted, setIsWishlisted] = useState(false);

  // for destructuring id from path parameter
  const { id } = useParams();
  //console.log(id);

  // view camp in detail api
  const viewCamp = async (id) => {
    const result = await viewACampApi(id);
    //console.log(result);
    if (result.status == 200) {
      setviewCampDetails(result.data);
    }
  };
  //console.log(viewCampDetails);

  // state for booking
  const [bookingDetails, setbookingDetails] = useState({
    checkInDate: "",
    guests: "",
  });
  // total price calculation
  let totalPrice = viewCampDetails.price * bookingDetails.guests;
  // api for booking
  const addBooking = async () => {
    const { checkInDate, guests } = bookingDetails;

    if (isFullyBooked) {
      toast.error("Cannot proceed. The selected date is fully booked.");
      return;
    }

    // stripe
    const stripe = await loadStripe(
      "pk_test_51RSxz4PGssiMfHaroWoclqHER4Q7BlG9UsidLU1TKP9HkbDIQPGpQQg2FbvdfWlxryuA9opwoqHpxC7XeS7qUYB700y0YJV8RL"
    );

    if (!checkInDate || guests < 1) {
      toast.warning("Please fill all fields correctly.");
    } else {
      const reqBody = {
        campId: viewCampDetails._id,
        checkInDate,

        numberOfGuests: guests,
        totalPrice,
      };

      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      const result = await addbookingApi(reqBody, reqHeader);
      console.log(result);

      // store session id from result
      const sessionId = result.data.sessionId;

      // for path redirect
      const response = stripe.redirectToCheckout({
        sessionId: sessionId,
      });

      if (response.error) {
        toast.error("Something went wrong");
      }
    }
  };

  const wishListLoader = async () => {
    const campId = viewCampDetails._id;

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const result = await WishlistApi({ campId }, reqHeader);
    const da = result.data;
    console.log({ da });

    if (result.status == 200) {
      const updatedWishlist = result.data.wishlist;
      console.log(updatedWishlist);

      updatedWishlist.includes(campId)
        ? setIsWishlisted(true)
        : setIsWishlisted(false);
    }
  };

  // wishlist
  const handleWishlist = async () => {
    const campId = viewCampDetails._id;

    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };

    const result = await WishlistApi({ campId }, reqHeader);
    console.log(result.data);

    if (result.status == 200) {
      const updatedWishlist = result.data.wishlist;
      console.log(updatedWishlist);

      if (updatedWishlist.includes(campId)) {
        toast.success("Added to wishlist");
        setIsWishlisted(true);
      } else {
        toast.success("Removed from wishlist");
        setIsWishlisted(false);
      }
    } else {
      toast.error("Something went wrong");
    }
  };

  // check booking capacity and disable button
  const checkCapacity = async () => {
    const { checkInDate, guests } = bookingDetails;
    const campId = viewCampDetails._id;

    if (!checkInDate || !guests || !campId) return;

    //  Check if guests exceed maxGuest frontend
    if (parseInt(guests) > viewCampDetails.maxGuest) {
      setIsFullyBooked(true);
      toast.error(
        `Only ${viewCampDetails.maxGuest} guests allowed for this camp`
      );
      return;
    }

    //  Backend capacity check for the selected date
    const result = await checkCapacityApi(campId, checkInDate, guests);

    if (result?.data?.isFull) {
      if (!isFullyBooked) {
        setIsFullyBooked(true);
        toast.error("This date is fully booked");
      }
    } else {
      setIsFullyBooked(false);
    }
  };

  // review add
  const [reviewD, setreviewD] = useState({
    rating: "",
    comment: "",
  });

  // api call review
  const handleSubmitReview = async () => {
    const { rating, comment } = reviewD;
    const campId = viewCampDetails._id;
    const reqHeader = {
      Authorization: `Bearer ${token}`,
    };
    const result = await addReviewApi({ rating, comment, campId }, reqHeader);
    //console.log(result);
    if (result.status == 200) {
      toast.success("review added successfully");
      getReviews();
      setreviewD({
        rating: "",
        comment: "",
      });
    } else {
      toast.error("something went wrong");
    }
  };

  // get review
  const [reviews, setReviews] = useState([]);

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        ).toFixed(1)
      : 0;

  const getReviews = async () => {
    const result = await getReviewApi(viewCampDetails._id);
    if (result.status === 200) {
      setReviews(result.data);
    }
  };
  //console.log(reviewD);
  console.log(reviews);

  useEffect(() => {
    console.log({ isWishlisted });
    viewCamp(id);

    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      setToken(token);
    }
  }, []);

  // Load reviews when camp details are loaded
  useEffect(() => {
    if (viewCampDetails._id) {
      getReviews();
      wishListLoader();
    }
  }, [viewCampDetails._id]);

  //  Booking capacity check (run ONLY when date or campId changes)
  useEffect(() => {
    if (
      viewCampDetails._id &&
      bookingDetails.checkInDate &&
      bookingDetails.guests
    ) {
      checkCapacity();
    }
    // handleWishlist()
  }, [viewCampDetails._id, bookingDetails.checkInDate, bookingDetails.guests]);

  return (
    <>
      <Header />
      <div className=" md:mt-12 mx-auto px-4 py-12 space-y-10">
        {/* Top Images Section */}
        <div className="grid grid-cols-1 md:grid-cols-3  md:gap-4">
          <div className="col-span-2 mb-4 md:mb-0">
            <img
              src={`${serverUrl}/upload/${viewCampDetails?.uploadedImages?.[0]}`}
              alt="Main Spot"
              className="w-full h-115 object-cover rounded-xl shadow"
            />
          </div>
          <div className="flex flex-col gap-4">
            <img
              src={`${serverUrl}/upload/${viewCampDetails?.uploadedImages?.[1]}`}
              alt="Small 1"
              className="h-55 object-cover rounded-xl shadow"
            />
            <img
              src={`${serverUrl}/upload/${viewCampDetails?.uploadedImages?.[2]}`}
              alt="Small 2"
              className="h-55 object-cover rounded-xl shadow"
            />
          </div>
        </div>

        {/* Details  */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8 items-start  ">
          <div className="shadow rounded relative p-4 md:p-8">
            {/* Left - Spot Details */}
            <div className="space-y-4 mb-8 ">
              <h1 className="text-3xl font-bold flex justify-between items-center">
                {viewCampDetails.title}
                <FaHeart
                  onClick={handleWishlist}
                  className={`text-xl cursor-pointer ${
                    isWishlisted ? "text-red-500" : "text-gray-400"
                  }`}
                />
              </h1>
              <div className="flex items-center">
                <FaLocationDot className="text-orange-500 text-lg me-2" />
                <p>{viewCampDetails.location}</p>
              </div>

              <p className="text-gray-700">{viewCampDetails.description}</p>

              <p className="text-gray-600">
                👥 Capacity:
                <span className="font-medium">
                  {viewCampDetails.maxGuest} people
                </span>
              </p>

              {/* Amenities */}
              <h1 className="text-xl font-bold mb-2 text-gray-700">
                Amenities
              </h1>
              <div className=" text-sm text-gray-700">
                {viewCampDetails.amenities?.map((item, index) => (
                  <div key={index} className="flex   gap-3">
                    <span className="text-green-600">✓</span>
                    <span className="">{item}</span>
                  </div>
                ))}
              </div>

              {/* activity */}
              <h1 className="text-xl font-bold mb-2 text-gray-700">
                Activities
              </h1>
              <div className="text-sm text-gray-600">
                {viewCampDetails.activities?.map((item, index) => (
                  <div key={index}>{item}</div>
                ))}
              </div>
            </div>

            <div className=" mb-8 md:left-37 bg-[#ffffff] text-gray-900 rounded-xl flex   items-center py-4 px-4  gap-8  ">
              {/* Best Time */}
              <div className="flex flex-col border border-gray-200 rounded-xl py-8 px-4 items-center gap-4">
                <FaCalendarAlt className="md:text-xl" />
                <div>
                  <p className="text-sm">Best time</p>
                  <p className="font-semibold">Jan–Dec</p>
                </div>
              </div>

              {/* Check-in */}
              <div className="flex flex-col border border-gray-200 py-8 px-4 rounded-xl items-center gap-4">
                <FaSignInAlt className="md:text-xl" />
                <div>
                  <p className="text-sm">Check-in</p>
                  <p className="font-semibold">1:00 PM</p>
                </div>
              </div>

              {/* Check-out */}
              <div className="flex flex-col border border-gray-200 py-8 rounded-xl px-4 items-center gap-4">
                <FaSignOutAlt className="md:text-xl" />
                <div>
                  <p className="text-sm">Check-out</p>
                  <p className="font-semibold">11:00 AM</p>
                </div>
              </div>
            </div>

            {/* Embedded Google Map (no API key required) */}
            <iframe
              title="Google Map"
              className="w-full h-64 rounded-md"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(
                viewCampDetails.location
              )}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              allowFullScreen
              loading="lazy"
            ></iframe>

            {/* Reviews Section */}
            <div className="bg-white mt-12 md:p-6">
              <h3 className="text-2xl font-bold mb-3">
                Reviews ⭐ ({reviews.length} reviews)
              </h3>

              <div className="flex gap-2 mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    value={reviewD.rating}
                    onClick={() => setreviewD({ ...reviewD, rating: star })}
                    className={`text-2xl cursor-pointer ${
                      star <= reviewD.rating
                        ? "text-yellow-500"
                        : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>

              <textarea
                className="w-full border rounded-md p-3 mb-4"
                placeholder="Share your thoughts"
                value={reviewD.comment}
                onChange={(e) =>
                  setreviewD({ ...reviewD, comment: e.target.value })
                }
              />

              <button
                className="bg-gradient-to-r from-orange-400  to-pink-500 text-white px-6 py-2 rounded-full hover:bg-orange-600"
                onClick={handleSubmitReview}
              >
                Submit
              </button>

              {/* Show reviews */}
              {reviews.map((r, i) => (
                <div
                  key={i}
                  className="bg-white flex gap-4 items-center shadow p-4 mt-6 rounded-xl"
                >
                  <div className="">
                    <img
                      src="https://avatar.iran.liara.run/public/49"
                      alt=""
                      className="w-20 rounded-full"
                    />
                  </div>

                  <div>
                    <h3 className=" text-md">{r.userMail}</h3>

                    <p className="italic text-gray-700">{r.comment}</p>
                    <p className="text-sm text-yellow-500 mt-1">
                      ⭐ {r.rating}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end items-end me-8">
              <Link to={"/explore"}>
                <button className="bg-blue-800 text-white px-6 py-2 rounded hover:bg-orange-600">
                  Back
                </button>
              </Link>
            </div>
          </div>

          {/* Right Booking Form */}
          <div className="md:w-full sticky top-20">
            <div className="bg-white border border-gray-300 rounded-xl shadow p-4 md:p-6 ">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                ₹{viewCampDetails.price}
                <span className="text-sm text-gray-500">/ per Person</span>
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="text-sm text-gray-600">Choose date</label>
                  <input
                    value={bookingDetails.checkInDate}
                    onChange={(e) =>
                      setbookingDetails({
                        ...bookingDetails,
                        checkInDate: e.target.value,
                      })
                    }
                    type="date"
                    className="w-full border p-2 rounded"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600">Guests</label>
                  <input
                    value={bookingDetails.guests}
                    className="w-full border p-2 rounded"
                    onChange={(e) =>
                      setbookingDetails({
                        ...bookingDetails,
                        guests: e.target.value,
                      })
                    }
                    type="number"
                    min={1}
                  />
                </div>
                <div className="flex justify-between items-center mt-5">
                  <h1>Total Price</h1>
                  <h1>₹{totalPrice}</h1>
                </div>
                <button
                  onClick={addBooking}
                  type="button"
                  disabled={isFullyBooked}
                  className={`w-full mt-4 py-2 rounded-full ${
                    isFullyBooked
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-orange-400 to-pink-500 text-white hover:bg-orange-600"
                  }`}
                >
                  {isFullyBooked ? "Fully Booked" : "Book Now"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <ToastContainer theme="colored" position="top-center" autoClose="2000" />
    </>
  );
}
