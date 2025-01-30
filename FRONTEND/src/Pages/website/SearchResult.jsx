import React from "react";

const SearchResult = () => {
  return (
    <div className="min-h-screen lg:h-screen flex flex-col lg:flex-row bg-gray-50">
      {/* Map Section */}
      <div className="w-full lg:w-1/2 h-96 lg:h-screen lg:max-h-screen relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d337.19718754609096!2d71.21780047540072!3d21.595410012236787!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39588159ad1cc6e7%3A0x429d0aa6485255be!2sGaytri%20krupa!5e1!3m2!1sen!2sin!4v1735450341240!5m2!1sen!2sin"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full"
        ></iframe>
        <div className="absolute top-4 right-4 bg-white shadow-lg rounded-md p-4">
          <h2 className="text-lg font-semibold text-gray-800">Interactive Map</h2>
          <p className="text-sm text-gray-600">Explore nearby properties</p>
        </div>
      </div>

      {/* Property Cards Section */}
      <div className="w-full lg:w-1/8 p-6 overflow-y-auto">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Search Results</h1>
          <p className="text-gray-600">Properties near your location</p>
        </header>

        <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Single Card */}
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="bg-white property-card hover:ease-in-out overflow-hidden hover:border-dark border-2 p-3 hover:border-2">
              <div className="relative overflow-hidden">
                <img
                  src="https://wallpapers.com/images/hd/real-estate-low-angle-shot-c9wnxm14uva0ydio.jpg"
                  alt="Property"
                  className="property-img w-full h-56 rounded-md hover:ease-in-out duration-300 object-cover"
                />
                <span className="absolute top-1 font-description bg-dark rounded left-1 text-white text-sm px-3 py-1 ">
                  $1,200/mo
                </span>
              </div>
              <div className="pt-1">
                <h2 className="text-lg font-semibold text-gray-800">
                  Luxurious Modern Apartment
                </h2>
                <p className="text-sm text-gray-600 flex items-center">
                  <i className="ri-map-pin-line text-dark mr-2"></i>
                  Beverly Hills, CA
                </p>
                <div className="flex justify-between items-center mt-4 text-gray-600">
                  <span className="flex items-center gap-2">
                    <i className="ri-hotel-line text-dark"></i> 3 Beds
                  </span>
                  <span className="flex items-center gap-2">
                    <i className="ri-shower-line text-dark"></i> 2 Baths
                  </span>
                  <span className="flex items-center gap-2">
                    <i className="ri-expand-line text-secondary"></i> 2,500 sq ft
                  </span>
                </div>
                <div className="buttons lg:flex lg:space-x-2">
                  <button className="mt-3 font-primary tracking-wider w-full text-sm py-2 bg-secondary text-dark">
                    <i className="ri-bookmark-3-fill"></i> Save
                  </button>
                  <button className="mt-3 w-full font-primary tracking-wider py-2 text-sm  bg-dark text-white">
                    View Details <i className="ri-arrow-right-long-line"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
