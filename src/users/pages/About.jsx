import React from "react";
import Header from "../components/Header";
import CountUp from "react-countup";

function About() {
  return (
    <>
      <Header />

      <div className=" text-gray-800">
        {/* Banner */}
        <section className="relative">
          <div className="rounded-b-[60px] overflow-hidden">
            <img
              src="/images/compus.jpg"
              alt="About Us"
              className="w-full h-[400px] object-cover"
            />
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-6xl font-extrabold drop-shadow-lg">
            ABOUT US
          </div>
        </section>

        {/* Subtitle */}
        <section className="text-center px-6 mt-10">
          <h2 className="text-2xl md:text-4xl font-bold text-green-800 mb-4">
            Discover the Thrill of Adventure with CampFind
          </h2>
          <p className="text-gray-600 text-sm md:text-lg max-w-2xl mx-auto">
            Your Ultimate Guide to Scenic Camping Experiences and Nature Escapes
          </p>
        </section>

        {/* Stats */}
        <section className="grid  md:grid-cols-3 gap-6 px-6 mt-12 max-w-6xl mx-auto">
          <div className="bg-gray-100 rounded-xl p-6 text-center shadow">
            <h3 className="text-3xl font-bold text-orange-600">
              <CountUp end={100} duration={6} suffix="+" />
            </h3>
            <p className="text-sm text-gray-700 mt-1">Camping Spots Listed</p>
          </div>

          <div className="bg-gray-100 rounded-xl p-6 text-center shadow">
            <h3 className="text-3xl font-bold text-orange-600">
              <CountUp end={20} duration={6} suffix="+" />
            </h3>
            <p className="text-sm text-gray-700 mt-1">Verified Reviews</p>
          </div>
          <div className="bg-gray-100 rounded-xl p-6 text-center shadow">
            <h3 className="text-3xl font-bold text-orange-600">
              <CountUp end={100} duration={6} suffix="+" />
            </h3>
            <p className="text-sm text-gray-700 mt-1">Happy Campers Hosted</p>
          </div>
        </section>

        {/* Paragraph */}
        <section className="mt-12 px-6 max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="">
            <p className="md:text-xl font-medium text-gray-800">
              Elevate every step, embrace every trail. Adventure awaits—let’s
              make it unforgettable.
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-justify">
              At CampFind, we are passionate about nature and dedicated to
              helping you make the most of your camping adventures. Our mission
              is to provide curated spot suggestions, gear tips, and a thriving
              community for campers of all levels. Whether you're seeking
              solitude in the mountains or beachside tenting, we help you create
              unforgettable outdoor memories.
            </p>
          </div>
        </section>

        {/* Services */}
        <section className="mt-16 bg-[#e4efc8] py-12 px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-3 md:mb-10">
            Services We Provide
          </h2>
          <p className="text-center  text-gray-700 max-w-3xl mx-auto mb-7 md:mb-12">
            Dedicated to outdoor lovers, we provide curated camping spot
            information and easy booking options to make every adventure smooth,
            simple, and memorable.
          </p>
          <div className="grid md:grid-cols-[1fr_3fr_3fr_1fr] gap-6  mx-auto">

            <div></div>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Camping Spot Discovery
              </h3>
              <p className="text-gray-700">
                Browse a curated list of scenic camping locations with detailed
                descriptions, amenities, user reviews, and directions—helping
                you find the perfect place for your next getaway.{" "}
              </p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-md">
              <h3 className="text-xl font-semibold text-green-800 mb-2">
                Booking & Availability
              </h3>
              <p className="text-gray-700">
                Easily check availability, reserve spots, and manage your
                camping trips—all from one convenient platform.
              </p>
            </div>

            <div></div>
          </div>
        </section>
      </div>
    </>
  );
}

export default About;
