import React, { useEffect, useMemo, useRef, useState } from "react";
import { searchPropertyByFilter } from "../../Api/website/HandleUserApi";

import { useMessage } from "../../Contexts/MessageContext";
import ButtonSpinner from "../Loaders/ButtonSpinner";
// import { useNavigate } from "react-router-dom";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { useSharedData } from "../../Contexts/SharedDataContext";

const GOOGLE_MAPS_API_KEY = "AIzaSyC5oArfQeCOs0SeDNFzm7bCF5htor89riI";




const HeroFilter = () => {
  const [filterSearchData, setFilterSearchData] = useState([]);

  const { setSearchFilterData } = useSharedData();


  const libraries = useMemo(() => ["places"], []);

  // const navigate = useNavigate();

  const autocompleteRef = useRef(null);


  const { showToast } = useMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [filterData, setFilterData] = useState({
    serviceType: "",
    propertyType: "",
    location: "",
  });

  const [isOpenMenu, setIsOpenMenu] = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpenMenu("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on unmount
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleOpenMenu = (e, action) => {
    e.preventDefault();
    setIsOpenMenu((prev) => (prev === action ? "" : action));
  };

  const handleClickServiceType = (e) => {
    setFilterData((prev) => ({ ...prev, serviceType: e.target.closest("li").getAttribute("value") }))
  }

  const handleClickPropertyType = (e) => {
    setFilterData((prev) => ({ ...prev, propertyType: e.target.closest("li").getAttribute("value") }))
  }

  const handleSearchChange = (e) => {
    setFilterData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const newLocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
        address: place.formatted_address,
      };
      setFilterData((prev) => ({ ...prev, location: newLocation.address }));
    }
  };

  const handleSubmitFilter = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formData = {
        serviceType: filterData.serviceType,
        propertyType: filterData.propertyType,
        location: filterData.location,
      };

      const response = await searchPropertyByFilter(formData); // Send JSON instead of FormData

      if (response?.success) {
        showToast(response?.message || "Filter Applied Successfully", "success");
        setFilterSearchData(response?.data);
        setSearchFilterData(response?.data);
      }
    } catch (error) {
      showToast(error?.response?.data?.message, "error");
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="filter mb-4">
      <div className="bg-white border shadow-lg p-6 rounded-md">
        <form onSubmit={handleSubmitFilter} className="grid grid-cols-1 lg:grid-cols-4 gap-4" ref={ref}>
          {/* Service Type Dropdown */}
          <div className="w-full relative">
            <button onClick={(e) => handleOpenMenu(e, "serviceType")} className="rounded bg-secondary w-full py-3 flex items-center justify-between px-4">
              <span className="text-dark/90">{filterData.serviceType || "serviceType"}</span>
              <i className="ri-arrow-down-wide-fill"></i>
            </button>
            {isOpenMenu === "serviceType" && (
              <div className="mt-2 z-20 shadow absolute bg-white overflow-hidden rounded border top-auto left-0 right-0">
                <ul onClick={handleClickServiceType}>
                  <li value="Rent" className="flex items-center hover:bg-secondary px-4 py-2 w-full border-b border-gray-300"><i className="ri-key-line mr-2"></i><p>Rent</p></li>
                  <li value="Buy" className="flex items-center hover:bg-secondary px-4 py-2 w-full border-b border-gray-300"><i className="ri-home-heart-line mr-2"></i><p>Buy</p></li>
                </ul>
              </div>
            )}
          </div>

          {/* Property Type Dropdown */}
          <div className="w-full relative">
            <button onClick={(e) => handleOpenMenu(e, "propertyType")} className="rounded bg-secondary w-full py-3 flex items-center justify-between px-4">
              <span className="text-dark/90">{filterData.propertyType || "propertyType"}</span>
              <i className="ri-arrow-down-wide-fill"></i>
            </button>
            {isOpenMenu === "propertyType" && (
              <div className="mt-2 z-20 shadow absolute bg-white overflow-hidden rounded border top-auto left-0 right-0">
                {/* <ul onClick={handleClickOption}>
                  <li value="House" className="hover:bg-secondary px-4 py-2 border-b">House</li>
                  <li value="PG" className="hover:bg-secondary px-4 py-2 border-b">PGs</li>
                  <li value="Apartment" className="hover:bg-secondary px-4 py-2">Apartment</li>
                </ul> */}

                <ul onClick={handleClickPropertyType}>
                  <li value="House" className="flex items-center hover:bg-secondary px-4 py-2 w-full border-b border-gray-300"><i className="ri-home-4-line mr-2"></i><p>House</p></li>
                  <li value="PG" className="flex items-center hover:bg-secondary px-4 py-2 w-full border-b border-gray-300"><i className="ri-community-line mr-2"></i><p>PGs</p></li>
                  <li value="Apartment" className="flex items-center hover:bg-secondary px-4 py-2 w-full border-b border-gray-300"><i className="ri-home-5-line mr-2"></i><p>Apartment</p></li>
                </ul>
              </div>
            )}
          </div>
          <div className="flex w-full">
            {/* Location Input */}
            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
              <Autocomplete onLoad={(ref) => (autocompleteRef.current = ref)} onPlaceChanged={handlePlaceSelect} className="w-full">
                <input
                  type="text"
                  id="address"
                  placeholder="Search location"
                  className="w-full p-1 px-2 h-full border rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark mb-4 duration-200 ease-in-out font-description tracking-wide"
                  value={filterData.location}
                  name="location"
                  onChange={handleSearchChange}
                />
              </Autocomplete>
            </LoadScript>
          </div>


          {/* Search Button */}
          <button type="submit" className="w-full bg-dark text-white px-6 py-3 hover:bg-gray-800 transition rounded-md">
            {
              isLoading ? <ButtonSpinner /> : "Find"
            }
          </button>
        </form>
      </div>
    </div>
  );
};

export default React.memo(HeroFilter);
