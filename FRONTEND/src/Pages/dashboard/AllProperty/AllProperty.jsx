import React, { useCallback, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import { fetchAllPropertyFromAdmin, fetchPendingPropertyApproval } from "../../../Api/dashboard/HandleAdminApi";
import Model from "../../../Components/dashboard/comman/Model";
import { FaMapLocationDot } from "react-icons/fa6";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";

const AllProperty = () => {
  const GOOGLE_MAPS_API_KEY = "AIzaSyC5oArfQeCOs0SeDNFzm7bCF5htor89riI";

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [images, setImages] = useState([]);
  const [allProperty, setAllProperty] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);



  // Filter data based on search
  const filteredData = allProperty.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(search.toLowerCase())
    )
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentData = filteredData.slice(startIndex, endIndex);

  // Generate page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  const gettingAllProperty = useCallback(async () => {
    try {
      const response = await fetchAllPropertyFromAdmin();
      if (response?.success) {
        setAllProperty(response?.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);


  useEffect(() => {
    gettingAllProperty();
    return () => {
      gettingAllProperty();
    };
  }, []);

  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Property Approval</h2>
      <div className="bg-white rounded-lg border p-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="w-auto text-sm p-2 border rounded outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          >
            <option value={5}>5 </option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>

          <input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-auto text-sm p-2 border rounded outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-500">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="py-3 px-4 font-normal text-dark/70 text-xs">ID</th>
                <th className="py-3 px-4 font-normal text-dark/70 text-xs">Image</th>
                <th className="py-3 px-4 font-normal text-dark/70 text-xs">Property Title</th>
                <th className="py-3 px-4 font-normal text-dark/70 text-xs">Property Approval</th>
                <th className="py-3 px-4 font-normal text-dark/70 text-xs">Property Type</th>
                <th className="py-3 px-4 font-normal text-dark/70 text-xs">Listing Type</th>
                <th className="py-3 px-4 font-normal text-dark/70 text-xs">Price</th>
                <th className="py-3 px-4 font-normal text-dark/70 text-xs">size</th>
                <th className="py-3 px-4 font-normal text-dark/70 text-xs">location</th>
              </tr>
            </thead>


            <tbody className="divide-y divide-gray-200">

              {currentData.map((property, i) => {

                const propertyImages = property?.images?.map((img) => img?.propertyImages) || [];
                return (

                  <tr key={i} className="hover:bg-gray-50 transition-colors">

                    <td className="py-3 px-4 text-sm text-gray-700">{i + 1}</td>

                    <td className="py-3 px-1 shrink-0">
                      {propertyImages.length > 0 && (
                        <img
                          src={propertyImages[0]}
                          className="w-16 h-16 object-contain rounded-lg cursor-pointer"
                          alt="property"
                          onClick={() => {
                            setImages(propertyImages);
                            setPhotoIndex(0);
                            setIsOpen(true);
                          }}
                        />
                      )}
                    </td>


                    <td className="py-3 px-4 text-sm text-gray-700">{property.propertyTitle}</td>
                    <td className="py-3 px-4 text-sm text-gray-700"><span className={`text-xs font-medium me-2 px-2.5 py-0.5 rounded-lg  ${property.approval === "Pending" ? 'bg-yellow-100 text-yellow-600  border-yellow-400' : property.approval === "Approved" ? 'bg-green-100 text-green-600  border-green-400' : 'bg-red-100 text-red-600  border-red-400'} border `}>{property.approval}</span></td>


                    <td className="py-3 px-4 text-sm text-gray-700">{property.propertyType}</td>


                    <td className="py-3 px-4 text-sm text-gray-700">{property.listingType}</td>


                    <td className="py-3 px-4 text-sm text-gray-700">
                      {property.price} {property.priceNegotiable ? "(Negotiable)" : ""}
                    </td>


                    <td className="py-3 px-4 text-sm text-gray-700">
                      {property.size} {property.sizeUnit}
                    </td>


                    <td className="py-3 px-4">
                      <Model
                        ModelOutSideBtn=<FaMapLocationDot />
                        ModelLable="View Location"
                        classDesign="bg-dark h-10 w-10 flex items-center justify-center text-lg text-white rounded"
                      >
                        <div className="model-body p-3">
                          <div className="space-y-3">
                            <p>
                              <strong>Street Address:</strong> {property.location.streetAddress}
                            </p>
                            <p>
                              <strong>Latitude:</strong> {property.location.locationCode[0].latitude}
                            </p>
                            <p>
                              <strong>Longitude:</strong> {property.location.locationCode[0].longitude}
                            </p>
                            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
                              <GoogleMap center={{ lat: property.location.locationCode[0].latitude, lng: property.location.locationCode[0].longitude }} zoom={15} mapContainerStyle={{ width: "100%", height: "350px" }}>
                                <Marker position={{ lat: property.location.locationCode[0].latitude, lng: property.location.locationCode[0].longitude }} />
                              </GoogleMap>
                            </LoadScript>
                            {/* <a
                              href={property.location.address_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-dark hover:underline"
                            >
                              Open Location
                            </a> */}
                          </div>
                        </div>
                      </Model>
                    </td>
                  </tr>
                );
              })}
              {!currentData.length && (
                <tr>
                  <td className="py-6 text-center text-gray-500" colSpan={9}>
                    No data found
                  </td>
                </tr>
              )}
            </tbody>



          </table>
        </div>


        {/* Pagination */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-6">
          <div className="text-sm text-gray-600 mb-4 md:mb-0">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredData.length)} of {filteredData.length} entries
          </div>
          <div className="flex space-x-2">
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => setCurrentPage(number)}
                className={`px-3 font-description w-10 h-10 py-1 rounded ${currentPage === number
                  ? "bg-dark text-white"
                  : "bg-white border hover:bg-gray-50"
                  }`}
              >
                {number}
              </button>
            ))}
          </div>
        </div>

        {/* Image Gallery Modal */}
        {isOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-50">
            <button
              className="absolute top-4 right-4 text-white text-2xl hover:text-gray-300 transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Close gallery"
            >
              ✖
            </button>
            <Swiper
              effect={"cards"}
              grabCursor={true}
              modules={[EffectCards]}
              className="w-80 h-96"
              initialSlide={photoIndex}
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={img}
                    alt={`property ${index}`}
                    className="w-full h-full object-contain rounded-lg bg-white"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </>
  );
};

export default React.memo(AllProperty);