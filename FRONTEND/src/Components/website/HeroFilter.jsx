import React from "react";
import { useNavigate } from "react-router-dom";

const HeroFilter = () => {
  const navigate = useNavigate();
  const handleSearch = (e) => {
    console.log(e);
    e.preventDefault();
    navigate("search-result");
  }

  const service = {
    serviceType: [
      {
        name: "Rent",
        icon: "ri-key-line"         // Standard key icon for rentals
      },
      {
        name: "Buy",
        icon: "ri-home-heart-line"  // Home with heart for buying
      }
    ],
    propertyType: [
      {
        name: "House",
        icon: "ri-home-4-line"      // Classic house icon
      },
      {
        name: "Shops",
        icon: "ri-store-3-line"     // Shop storefront icon
      },
      {
        name: "Plots",
        icon: "ri-landscape-line"   // Land/plot icon
      },
      {
        name: "PGs",
        icon: "ri-community-line"   // Community/shared living icon
      },
      {
        name: "FarmHouse",
        icon: "ri-home-5-line"      // Farmhouse style icon
      }
    ],
    location: {
      name: "amreli",
      icon: "ri-map-pin-2-line"    // Location pin icon
    }
  };
  return (
    <div className="bg-white border shadow-lg p-6 rounded-md">
      <form onSubmit={handleSearch} className="grid grid-cols-1 lg:grid-cols-4 gap-4 p-4">

        {/* Service Type */}
        <div className="w-full relative">
          <button className="rounded bg-secondary w-full py-3 flex items-center justify-between px-4">
            <span className="flex items-center">
              <i className="ri-home-9-line mr-2"></i>Service Type
            </span>
            <i className="ri-arrow-down-wide-fill"></i>
          </button>
          <div className="mt-2 group-hover:block z-10 shadow absolute bg-white overflow-hidden rounded border top-auto left-0 right-0">
            {service.serviceType.map((type, i) => (
              <div
                className="flex items-center hover:bg-secondary px-4 py-2 w-full border-b border-gray-300"
                key={i}
                value={type.name}
              >
                <i className={`${type.icon} mr-2`}></i>
                <p>{type.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Property Type */}
        <div className="w-full relative">
          <button className="rounded bg-secondary w-full py-3 flex items-center justify-between px-4">
            <span>Property Type</span>
            <i className="ri-arrow-down-wide-fill"></i>
          </button>
          <div className="mt-2 group-hover:block z-10 shadow absolute bg-white overflow-hidden rounded border top-auto left-0 right-0">
            {service.propertyType.map((type, i) => (
              <div
                className="flex items-center hover:bg-secondary px-4 py-2 w-full border-b border-gray-300"
                key={i}
                value={type.name}
              >
                <i className={`${type.icon} mr-2`}></i>
                <p>{type.name}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Location */}
        <input
          type="text"
          placeholder="Location"
          className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dark"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full col-span-1 lg:col-span-1 bg-dark text-white px-6 py-3 hover:bg-gray-800 transition duration-300 rounded-md"
        >
          Search
        </button>

      </form>
    </div>
  );
};

export default HeroFilter;
