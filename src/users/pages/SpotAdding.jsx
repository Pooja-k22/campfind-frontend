import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { faCloudArrowUp, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast, ToastContainer } from "react-toastify";
import { addCampSpotApi } from "../../services/allApi";

function SpotAdding() {
  const [preview, setpreview] = useState("");
  const [previewList, setpreviewList] = useState([]);
  // token
  const [token, setToken] = useState("");

  //  state to store camp details
  const [campSpotDetails, setCampSpotDetails] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    price: "",
    maxGuest: "",
    amenities: [],
    activities: [],
    uploadedImages: [],
    imageUrl: "",
  });

  // add amenities
  const handleAmenityChange = (amenity) => {
    const isSelected = campSpotDetails.amenities.includes(amenity);

    const updatedAmenities = isSelected
      ? campSpotDetails.amenities.filter((item) => item !== amenity)
      : [...campSpotDetails.amenities, amenity];

    setCampSpotDetails({
      ...campSpotDetails,
      amenities: updatedAmenities,
    });
  };

  console.log(campSpotDetails);

  const handleRemoveImg = () => {};

  // upload image
  const handleUpload = (e) => {
    console.log(e.target.files[0]);

    const fileArray = campSpotDetails.uploadedImages;
    fileArray.push(e.target.files[0]);
    setCampSpotDetails({ ...campSpotDetails, uploadedImages: fileArray });

    // url make
    const url = URL.createObjectURL(e.target.files[0]);
    setpreview(url);

    const newArray = previewList;
    newArray.push(url);
    setpreviewList(newArray);
  };

  // handle activities
  const handleActivityChange = (activity) => {
    const isSelected = campSpotDetails.activities.includes(activity);
    const updatedActivities = isSelected
      ? campSpotDetails.activities.filter((item) => item !== activity)
      : [...campSpotDetails.activities, activity];

    setCampSpotDetails({
      ...campSpotDetails,
      activities: updatedActivities,
    });
  };

  // submit
  const handleSubmit = async () => {
    const {
      title,
      description,
      category,
      location,
      price,
      maxGuest,
      amenities,
      activities,
      uploadedImages,
      imageUrl,
    } = campSpotDetails;
    if (
      !title ||
      !description ||
      !category ||
      !location ||
      !price ||
      !maxGuest ||
      uploadedImages.length == 0 ||
      !imageUrl
    ) {
      toast.warning("Please fill All fields");
    } else {
      // header
      const reqHeader = {
        Authorization: `Bearer ${token}`,
      };

      // body
      const reqBody = new FormData();

      for (let key in campSpotDetails) {
        if (key != "uploadedImages") {
          reqBody.append(key, campSpotDetails[key]);
        } else {
          campSpotDetails.uploadedImages.forEach((item) => {
            reqBody.append("uploadedImages", item);
          });
        }
      }
      const result = await addCampSpotApi(reqBody, reqHeader);
      console.log(result);
      if (result.status == 401) {
        toast.info(result.response.data);
      } else if (result.status == 200) {
        toast.success("Book added successfully");
        handleReset();
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  // reset
  const handleReset = () => {
    setCampSpotDetails({
      title: "",
      description: "",
      category: "",
      location: "",
      price: "",
      maxGuest: "",
      amenities: [],
      activities: [],
      uploadedImages: [],
      imageUrl: "",
    });
    setpreview("");
    setpreviewList([]);
  };

  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token");
      setToken(token);
    }
  }, []);
  return (
    <>
      <Header />
      <div className=" md:mt-18 md:grid grid-cols-[1fr_6fr_1fr] bg-gray-50">
        <div></div>

        <div className="bg-gray-100 rounded-xl px-6 pb-6 shadow-md">
          <h1 className="text-3xl my-6 font-bold bg-[#005d50] p-4 text-white ">
            Publish Your Place
          </h1>
          <form action="">
            <h2 className="text-orange-600 font-bold mb-3">
               Tell us about your place
            </h2>
            <hr />

            <div className="my-6">
              <h3 className="font-semibold text-gray-800 mb-2">Title</h3>
              <input
                onChange={(e) => {
                  setCampSpotDetails({
                    ...campSpotDetails,
                    title: e.target.value,
                  });
                }}
                value={campSpotDetails.title}
                type="text"
                className="w-full p-2 border bg-white border-gray-300 rounded mb-3"
              />
            </div>

            {/* description */}
            <div className="my-6">
              <h3 className="font-semibold text-gray-800 mb-2">Description</h3>
              <textarea
                onChange={(e) => {
                  setCampSpotDetails({
                    ...campSpotDetails,
                    description: e.target.value,
                  });
                }}
                value={campSpotDetails.description}
                className="w-full border bg-white border-gray-300 rounded px-4 py-2 mt-1"
                rows="4"
                required
              />
            </div>

            {/* category */}
            <div className="my-6">
              <h3 className="font-semibold text-gray-800 mb-2">
                Which categories best describe your place
              </h3>
              <input
                onChange={(e) => {
                  setCampSpotDetails({
                    ...campSpotDetails,
                    category: e.target.value,
                  });
                }}
                value={campSpotDetails.category}
                type="text"
                className="w-full bg-white border-gray-300 p-2 border rounded mb-3"
              />
            </div>

            {/* location */}
            <div className="my-6">
              <h3 className=" font-semibold text-gray-800 mb-2">
                Where's your place located?
              </h3>
              <div className="w-full">
                <input
                  onChange={(e) => {
                    setCampSpotDetails({
                      ...campSpotDetails,
                      location: e.target.value,
                    });
                  }}
                  value={campSpotDetails.location}
                  type="text"
                  placeholder="Address"
                  className="w-full p-2 border bg-white border-gray-300 rounded mb-3"
                />
              </div>
            </div>

            {/* price capacity */}
            <div className="md:flex gap-4 my-6">
              <div className="w-full">
                <label className="font-semibold text-gray-800">
                  Price per Night (INR)
                </label>
                <input
                  onChange={(e) => {
                    setCampSpotDetails({
                      ...campSpotDetails,
                      price: e.target.value,
                    });
                  }}
                  value={campSpotDetails.price}
                  type="text"
                  className="w-full border bg-white border-gray-300 rounded  p-2 mt-1"
                  required
                />
              </div>
              <div className="w-full">
                <label className="font-semibold text-gray-800">
                  Max Guests
                </label>
                <input
                  onChange={(e) => {
                    setCampSpotDetails({
                      ...campSpotDetails,
                      maxGuest: e.target.value,
                    });
                  }}
                  value={campSpotDetails.maxGuest}
                  type="text"
                  className="w-full border bg-white border-gray-300 rounded  p-2 mt-1"
                />
              </div>
            </div>

            {/* amenities */}
            <div className="my-6">
              <label className=" font-semibold text-gray-800">Amenities</label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {[
                  "Wi-Fi",
                  "Electricity",
                  "Water",
                  "Campfire",
                  "Parking",
                  "Toilets",
                  "Pet friendly",
                ].map((item) => (
                  <label key={item} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onChange={() => handleAmenityChange(item)}
                      checked={campSpotDetails.amenities.includes(item)}
                    />{" "}
                    {item}
                  </label>
                ))}
              </div>
            </div>

            {/* activity */}
            <div className="my-6">
              <label className=" font-semibold text-gray-800">Activities</label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                {[
                  "Hiking",

                  "Fishing",

                  "Swimming",

                  "Bird Watching",

                  "Kayaking",

                  "Boating",

                  "Cycling",

                  "Nature Walks",

                  "Wildlife Spotting",

                  "Outdoor Cooking",

                  "Rock Climbing",

                  "Outdoor Games",

                  "Yoga",

                  "Horse Riding",

                  "Petting Zoo",

                  "Indoor Games",
                ].map((activity) => (
                  <label key={activity} className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      onChange={() => handleActivityChange(activity)}
                      checked={campSpotDetails.activities.includes(activity)}
                    />{" "}
                    {activity}
                  </label>
                  //
                ))}
              </div>
            </div>

            {/* availability */}
            {/* <div className="md:flex  gap-4">
              <div className="w-full">
                <label className="font-semibold text-gray-800 mb-2">
                  Available From
                </label>
                <input
                  type="date"
                  className="w-full border bg-white border-gray-300 rounded px-4 py-2 mt-1"
                />
              </div>
              <div className="w-full">
                <label className="font-semibold text-gray-800">
                  Available To
                </label>
                <input
                  type="date"
                  className="w-full border bg-white border-gray-300 rounded px-4 py-2 mt-1"
                />
              </div>
            </div> */}

            <div className=" ">
              {/* Upload Image */}
              <div className="my-6">
                <h2 className="font-semibold text-gray-800 mb-2">
                  Upload Image
                </h2>

                {/* Main Image Preview */}
                <div className="w-auto h-auto py-5 rounded-xl flex flex-wrap  gap-3 ">
                  {!preview && (
                    <div className=" w-50 h-50 border rounded flex flex-col justify-center items-center">
                      <label htmlFor="imagefile">
                        <input
                          onChange={(e) => handleUpload(e)}
                          id="imagefile"
                          className=""
                          type="file"
                          style={{ display: "none" }}
                        />
                        <div className="flex flex-col justify-center items-center">
                          {" "}
                          <FontAwesomeIcon
                            icon={faCloudArrowUp}
                            className="text-3xl"
                          />
                          <p>Upload from your device</p>
                        </div>
                      </label>
                    </div>
                  )}

                  {preview && (
                    <div className="w-auto h-auto py-5 rounded-xl flex flex-wrap  gap-3 ">
                      {previewList?.map((item) => (
                        <div className=" w-50 h-50 border rounded relative">
                          <img src={item} alt="" className=" w-50 h-50" />
                          <button
                            type="button"
                            className="absolute top-3 right-3"
                            onClick={handleRemoveImg}
                          >
                            <FontAwesomeIcon icon={faTrashCan} />
                          </button>
                        </div>
                      ))}

                      {previewList.length < 3 && (
                        <div className=" w-50 h-50 border rounded flex flex-col justify-center items-center">
                          <label htmlFor="imagefile">
                            <input
                              onChange={(e) => handleUpload(e)}
                              id="imagefile"
                              className=""
                              type="file"
                              style={{ display: "none" }}
                            />
                            <div className="flex flex-col justify-center items-center">
                              {" "}
                              <FontAwesomeIcon
                                icon={faCloudArrowUp}
                                className="text-3xl"
                              />
                              <p>Upload from your device</p>
                            </div>
                          </label>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Upload Options */}
                <div className="mt-4 space-y-2">
                  <input
                    onChange={(e) =>
                      setCampSpotDetails({
                        ...campSpotDetails,
                        imageUrl: e.target.value,
                      })
                    }
                    type="text"
                    placeholder="Paste image URL"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-green-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-8 justify-center items-center">
              <button
                onClick={handleSubmit}
                type="button"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-semibold mt-4"
              >
                Add Spot
              </button>
              <button
                onClick={handleReset}
                type="button"
                className="bg-orange-600 hover:bg-orange-400 text-white px-6 py-2 rounded font-semibold mt-4"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        <div></div>
      </div>
      <ToastContainer position="top-center" theme="colored" autoClose={2000} />
    </>
  );
}

export default SpotAdding;
