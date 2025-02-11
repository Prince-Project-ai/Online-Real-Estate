import React, { useEffect, useRef, useState } from "react";
import { MdOutlineBookmarkAdd } from "react-icons/md";
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import SwiperGallery from "./swiperExample/SwiperGallery";



const SearchResult = () => {

  const [isOpenMenu, setIsOpenMenu] = useState("");

  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!ref.current.contains(event.target)) {
        setIsOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [ref]);

  const handleOpenMenu = (e, action) => {
    e.preventDefault();
    setIsOpenMenu(action);
  }

  const handleFilterValue = (e) => {
    console.log(e.target.getAttribute("value"));
  }
  return (
    <>
      <div className="grid grid-cols-12 ">

        <div className="col-span-4 border border-dark bg-secondary">
          <p>local</p>
        </div>
        <div className="col-span-8 p-4">
          <div className="search info mb-2">
            <h2 className="text-3xl font-bold">Property listing.</h2>
          </div>
          <div className="filter mb-4">
            <div className="bg-white border shadow-lg p-6 rounded-md">
              <form className="grid grid-cols-1 lg:grid-cols-4 gap-4" ref={ref}>
                <div className="w-full relative" >
                  <button onClick={(e) => handleOpenMenu(e, "serviceType")} className="rounded bg-secondary w-full py-3 flex items-center justify-between px-4">
                    <span className="flex items-center">
                      <i className="ri-home-9-line mr-2"></i>Service Type</span><i className="ri-arrow-down-wide-fill"></i>
                  </button>
                  {
                    isOpenMenu === "serviceType" && (<div className="mt-2 group-hover:block z-20 shadow absolute bg-white overflow-hidden rounded border top-auto left-0 right-0">
                      <ul onClick={handleFilterValue}>
                        <li className="flex items-center hover:bg-secondary px-4 py-2 w-full border-b border-gray-300" value="Rent">
                          <i className="ri-key-line mr-2"></i><p>Rent</p>
                        </li>
                        <li className="flex items-center hover:bg-secondary px-4 py-2 w-full border-b border-gray-300" value="Buy">
                          <i className="ri-home-heart-line mr-2"></i><p>Buy</p>
                        </li>
                      </ul>
                    </div>)
                  }

                </div>
                <div className="w-full relative" >
                  <button onClick={(e) => handleOpenMenu(e, "propertyType")} ref={ref} className="rounded bg-secondary w-full py-3 flex items-center justify-between px-4" fdprocessedid="evr3h">
                    <span>Property Type</span><i className="ri-arrow-down-wide-fill"></i>
                  </button>
                  {
                    isOpenMenu === "propertyType" && (
                      <div className="mt-2 group-hover:block z-20 shadow absolute bg-white overflow-hidden rounded border top-auto left-0 right-0">
                        <ul>
                          <li className="flex items-center hover:bg-secondary px-4 py-2 w-full border-b border-gray-300" value="House">
                            <i className="ri-home-4-line mr-2"></i><p>House</p>
                          </li>
                          <li className="flex items-center hover:bg-secondary px-4 py-2 w-full border-b border-gray-300" value="Shops"><i className="ri-store-3-line mr-2"></i><p>Shops</p></li>

                          <li className="flex items-center hover:bg-secondary px-4 py-2 w-full border-b border-gray-300" value="Plots"><i className="ri-landscape-line mr-2"></i><p>Plots</p></li>

                          <li className="flex items-center hover:bg-secondary px-4 py-2 w-full border-b border-gray-300" value="PGs"><i className="ri-community-line mr-2"></i><p>PGs</p></li>

                          <li className="flex items-center hover:bg-secondary px-4 py-2 w-full border-b border-gray-300" value="FarmHouse"><i className="ri-home-5-line mr-2"></i><p>FarmHouse</p>
                          </li>
                        </ul>
                      </div>
                    )
                  }


                </div>
                <input placeholder="Location" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-dark" type="text" />
                <button type="submit" className="w-full col-span-1 lg:col-span-1 bg-dark text-white px-6 py-3 hover:bg-gray-800 transition duration-300 rounded-md" >Search</button>
              </form>
            </div>
          </div>
          {/* Property Cards Section */}
          <div className="w-full">
            {/* <header className="mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Search Results</h1>
            <p className="text-gray-600">Properties near your location</p>
          </header> */}

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Single Card */}
              {[...Array(6)].map((_, index) => (

                <div
                  key={index}
                  className="bg-white property-card w-full rounded-lg group">

                  <div className="w-full rounded-lg border border-dark overflow-hidden">
                    {/* <img
                      src="https://wallpapers.com/images/hd/real-estate-low-angle-shot-c9wnxm14uva0ydio.jpg"
                      alt="Property"
                      clas
                      sName="w-full aspect-square rounded-md group-hover:scale-125 transition-transform  object-cover"
                    /> */}
                    <div className="w-full relative group">
                      <SwiperGallery />
                      <span className="absolute z-10 top-1 font-description bg-dark rounded left-1 text-white text-sm px-2 py-1 ">
                        Sell
                      </span>
                      <div className="save-layer z-10 absolute top-0 right-0 -translate-y-full transition-transform group-hover:translate-y-0 duration-200 ease flex items-center justify-center rounded-lg backdrop-blur-[2px]">
                        <button className="bg-dark text-white flex justify-center items-center text-xl h-12 w-12 rounded-full">
                          <MdOutlineBookmarkAdd />
                        </button>
                      </div>
                    </div>


                  </div>

                  <div className="pt-1">
                    <h2 className="text font-semibold text-gray-800">
                      Luxurious Modern Apartment
                    </h2>
                    <p className="font-description flex items-center text-sm">
                      <HiOutlineCurrencyRupee className="me-1" />235,980
                      {/* <i className="ri-map-pin-line text-dark mr-2"></i> */}
                    </p>

                    <div className="buttons text-end">
                      <button className="mt-3 px-3 rounded  font-inter tracking-wider py-2 text-sm  bg-dark text-white">
                        Details
                      </button>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchResult;
