import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMessage } from "../../../Contexts/MessageContext";
import { deleteSellerListing, getAllListing, updateListingSeller } from "../../../Api/website/HandleUserApi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cards";
import { EffectCards } from "swiper/modules";
import Model from "../../dashboard/comman/Model";
import { NavLink } from "react-router-dom";
import { RiDeleteBin5Line } from "react-icons/ri";
import { FaRegEye, FaSpinner } from "react-icons/fa";
import { TbEdit } from "react-icons/tb";
import { formValidation } from "./wizardFormValidation";
import { FaMapMarkedAlt } from "react-icons/fa";
import house from "../../../assets/sellerDashboard/house.png";
import pg from "../../../assets/sellerDashboard/pg.png";
import building from "../../../assets/sellerDashboard/appartment.png";
import MarkerLocation from "./MarkerMap/MarkerLocation";

const DataTableListing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [images, setImages] = useState([]);
  const { showToast } = useMessage();
  const [totalListing, setTotalListing] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [entriesPerPage, setEntriesPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenToggle, setIsOpenToggle] = useState(false);
  const [modelState, setModelState] = useState(false);


  const closeModel = useCallback(() => {
    setModelState(false);
  }, []);


  const fileInputRef = useRef(null);

  const handleButtonClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const propertyTypes = useMemo(() => [
    { icon: house, type: "House" },
    { icon: pg, type: "PG" },
    { icon: building, type: "Apartment" },
  ], []);

  const categoryType = useMemo(() => ["Sell", "Rent"], []);


  const [changeUpdatedField, setChangeUpdatedField] = useState({});
  const [formData, setFormData] = useState({ propertyImages: [], location: {} });
  const [previewImages, setPreviewImages] = useState([]);
  const [formErrors, setFormErrors] = useState({});


  const openModel = useCallback((data) => {
    setModelState(true);
    setFormData((prev) => ({
      ...prev,
      ...data,
      propertyImages: data.propertyImages || [],  // Ensure propertyImages is an array
      location: data.location || {},             // Ensure location is an object
    }));
  }, []);

  const handleUpdateChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const newImages = Array.from(files);

      // Update formData with new images
      setFormData((prev) => ({
        ...prev,
        propertyImages: [...(prev.propertyImages || []), ...newImages],
      }));

      // Store the changed field
      setChangeUpdatedField((prev) => ({
        ...prev,
        [name]: newImages, // Store the new images in changed fields
      }));

      // Preview Images
      newImages.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImages((prevImages) => [...prevImages, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name in (prev.location || {})
          ? { ...prev, location: { ...prev.location, [name]: value } }
          : value,
      }));

      // Track the changed text field
      setChangeUpdatedField((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Validate the field and update form errors
    const error = formValidation(name, value, files);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };


  const handleSave = async (e) => {
    setIsLoading(true);

    e.preventDefault();
    try {
      if (!formData || !Object.keys(changeUpdatedField).length) {
        console.error("No data to update.");
        return;
      }

      const propertyId = formData._id;
      const updatedData = new FormData();

      // Append all form fields to FormData
      for (const key in changeUpdatedField) {
        if (key === "propertyImages" && Array.isArray(changeUpdatedField[key])) {
          changeUpdatedField[key].forEach((file, index) => {
            updatedData.append("propertyImages", file); // Backend expects "propertyImages" (array)
          });
        } else {
          updatedData.append(key, changeUpdatedField[key]);
        }
      }

      // Call API function with FormData
      const response = await updateListingSeller(propertyId, updatedData);

      if (response?.success) {
        showToast(response?.message, "success");
        fetchAllListing();
      }
    } catch (error) {
      showToast(error?.response?.data?.message, "error");
    } finally {
      setIsLoading(false);
    }
  };





  const handleDeleteImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));

    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const fetchAllListing = useCallback(async () => {
    try {
      const res = await getAllListing();
      if (res?.success) {
        setTotalListing(res?.data);
        showToast(res?.message, "success");
      }
    } catch (error) {
      showToast(error?.response?.data?.message, "error");
      console.error(error);
    }
  }, [showToast]);

  useEffect(() => {
    fetchAllListing();
  }, [fetchAllListing]);

  // Filter data based on search
  const filteredData = totalListing.filter((item) =>
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

  const handleDeleteListing = async (e, id) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await deleteSellerListing(id);
      if (response.success) {
        setTotalListing(totalListing.filter((item) => item.id !== id));
        showToast(response?.message, "success");
      }
    } catch (error) {
      showToast(error?.response?.data?.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">All Listings</h2>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <select
            value={entriesPerPage}
            onChange={(e) => setEntriesPerPage(Number(e.target.value))}
            className="w-auto text-sm p-2 border rounded outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
          </select>

          <NavLink
            to="/dashboard-seller/add-listing"
            className="text-sm bg-dark py-2 px-4 text-white rounded hover:bg-dark/80 transition duration-200"
          >
            Add Listing
          </NavLink>

          <input
            type="search"
            placeholder="Search anything.. "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full md:w-auto text-sm p-2 border rounded outline-none focus:ring-1 focus:ring-dark focus:border-dark transition duration-200"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-full divide-y divide-gray-500">
            <thead className="bg-gray-50">
              <tr className="text-left">
                <th className="py-3 px-4 font-normal text-dark/70 text-xs">ID</th>
                <th className="py-3 px-4 font-normal text-dark/70 text-xs">Image</th>
                <th className="py-3 px-4 font-normal text-dark/70 text-xs">Property Title</th>
                <th className="py-3 px-4 font-normal text-dark/70 text-xs">Property Type</th>
                <th className="py-3 px-4 font-normal text-dark/70 text-xs">Listing Type</th>
                <th className="py-3 px-4 font-normal text-dark/70 text-xs">Price</th>
                <th className="py-3 px-4 font-normal text-dark/70 text-xs">size</th>
                <th className="py-3 px-4 font-normal text-dark/70 text-xs">location</th>
                <th className="py-3 px-4 font-normal text-dark/70 text-xs">Action</th>
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
                        ModelOutSideBtn={<FaMapMarkedAlt />}
                        ModelLable="View Location"
                        classDesign="bg-dark h-10 w-10 flex items-center justify-center text-white text-lg rounded"
                      >
                        <div className="model-body p-3">
                          <div className="space-y-3">
                            <p>
                              <strong>Street Address:</strong> {property.location.streetAddress}
                            </p>
                            <p>
                              <strong>District:</strong> {property.location.district}
                            </p>
                            <p>
                              <strong>State:</strong> {property.location.state}
                            </p>
                            <p>
                              <strong>Country:</strong> {property.location.country}
                            </p>
                            <p>
                              <strong>Latitude:</strong> {property.location.locationCode[0].latitude}
                            </p>
                            <p>
                              <strong>Longitude:</strong> {property.location.locationCode[0].longitude}
                            </p>
                          </div>
                        </div>
                      </Model>
                    </td>



                    {/* update model */}
                    <td className="py-3 px-4 space-x-2">
                      <button
                        onClick={() => openModel(property)}
                        className="bg-green-500 text-white rounded text-xl p-2"
                      >
                        <TbEdit />
                      </button>
                      {modelState &&
                        <div className="fixed inset-0 z-50">
                          <div className="fixed inset-0 overflow-y-auto backdrop-blur-sm flex items-center justify-center p-4">
                            <div className="min-h-full flex items-center justify-center p-4">
                              <div className="bg-white overflow-hidden border-gray-300 animate-slideDown border rounded-lg shadow-lg max-w-2xl w-full relative flex flex-col max-h-[80vh]">


                                {/* Modal Header (Fixed) */}
                                <div className="p-3 border-b border-gray-300 flex justify-between items-center sticky top-0 bg-white z-10">
                                  <h2 className="text-xl font-inter font-bold text-dark">Edit Listing</h2>
                                  <button
                                    onClick={closeModel}
                                    className="text-gray-600 hover:border border-gray-300 bg-secondary w-7 h-7 text-center rounded-lg leading-[7px] hover:text-gray-800"
                                  >
                                    <i className="ri-close-fill"></i>
                                  </button>
                                </div>



                                <div className="model-body overflow-y-auto p-4 flex-1">

                                  <div className="space-y-4">

                                    {/* Property Title */}
                                    <div>
                                      <label htmlFor="propertyTitle" className="tracking-wide font-semibold text-sm">
                                        Property Title*
                                      </label>
                                      <input
                                        type="text"
                                        id="propertyTitle"
                                        name="propertyTitle"
                                        value={formData.propertyTitle}
                                        onChange={handleUpdateChange}
                                        placeholder="Property Title"
                                        className="w-full p-2 border rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out mt-1 font-description tracking-wide"
                                      />
                                      {formErrors.propertyTitle && <p className="text-red-500 text-xs mt-1">{formErrors.propertyTitle}</p>}
                                    </div>

                                    {/* Category Type */}
                                    <div className="flex space-x-10 items-center">
                                      <div>
                                        <label className="tracking-wide font-semibold text-sm">Category*</label>
                                        <div className="space-x-4 mt-1">
                                          {categoryType.map((category, i) => (
                                            <label key={i} className="inline-flex items-center cursor-pointer">
                                              <input
                                                type="radio"
                                                name="listingType"
                                                value={category}
                                                checked={formData.listingType === category}
                                                onChange={handleUpdateChange}
                                                // checked={formData.listingType === category}
                                                // onChange={handleChange}
                                                className="hidden"
                                              />
                                              <span className={`border block text-xs px-5 py-3 rounded-full ${formData.listingType === category ? "bg-secondary border-dark" : ""}`}>
                                                {category} Property
                                              </span>
                                            </label>
                                          ))}
                                        </div>
                                        {formErrors.listingType && <p className="text-red-500 text-xs mt-1">{formErrors.listingType}</p>}
                                      </div>

                                      {/* Property Type Selection */}
                                      <div>
                                        <label className="font-semibold text-sm">Property Type*</label>
                                        <div className="flex space-x-3 mt-1 flex-wrap">
                                          {propertyTypes.map((propertyTY, i) => (
                                            <label key={i} htmlFor={propertyTY.type}

                                              className={`${formData.propertyType === propertyTY.type ? 'bg-secondary border-dark' : ''} cursor-pointer flex flex-col items-center gap-2 rounded-lg border p-3 w-24 text-center`}

                                            >
                                              <input
                                                type="radio"
                                                id={propertyTY.type}
                                                name="propertyType"
                                                value={propertyTY.type}
                                                checked={formData.propertyType === propertyTY.type}
                                                onChange={handleUpdateChange}
                                                className={`hidden`}
                                              />
                                              <img src={propertyTY.icon} alt={propertyTY.type} className="w-12 h-12 object-contain" />
                                              <span className="text-sm text-dark">{propertyTY.type}</span>
                                            </label>
                                          ))}
                                        </div>
                                        {formErrors.propertyType && <p className="text-red-500 text-xs mt-1">{formErrors.propertyType}</p>}
                                      </div>
                                    </div>


                                    {/* Property Price */}
                                    <div className="flex items-center gap-x-4">
                                      <div className="w-full">
                                        <label
                                          htmlFor="price"
                                          className="tracking-wide font-semibold text-sm"
                                        >
                                          Property Price*
                                        </label>
                                        <div className="relative mt-1">
                                          <input
                                            type="number"
                                            id="price"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleUpdateChange}
                                            placeholder="Property Price"
                                            className="w-full p-2 border rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out font-description tracking-wide pl-9"
                                          />
                                          <i className="ri-money-rupee-circle-line absolute left-2 top-1/2 -translate-y-1/2 text-zinc-400 text-xl"></i>
                                        </div>
                                        {formErrors.price && <p className="text-red-500 text-xs mt-1">{formErrors.price}</p>}
                                      </div>

                                      <div className="w-full self-start">
                                        <label className="tracking-wide font-semibold text-sm">
                                          Price Negotiable
                                        </label>
                                        <div
                                          onClick={() => setIsOpenToggle((prev) => !prev)}
                                          className={`${isOpenToggle ? 'bg-green-500' : 'bg-secondary'
                                            } cursor-pointer w-16 h-8 p-1 rounded-full mt-2`}
                                        >
                                          <span
                                            className={`bg-white w-6 ${isOpenToggle ? 'ms-auto' : ""
                                              } rounded-full h-full block`}
                                          ></span>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Sizing Component */}
                                    <div>
                                      {/* <Sizing /> */}
                                    </div>
                                    <div className="grid lg:grid-cols-2 grid-col-1 gap-4">
                                      <div className="col-span-2">
                                        <label htmlFor="address" className="tracking-wide font-semibold text-sm">Street address*</label>
                                        <input
                                          type="text"
                                          id="address"
                                          name="streetAddress"
                                          value={formData.location.streetAddress}
                                          onChange={handleUpdateChange}
                                          placeholder="Street address"
                                          className="w-full text-sm p-2 border rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out font-description tracking-wide"
                                        />
                                        {formErrors?.streetAddress && (
                                          <p className="text-red-500 text-xs">{formErrors?.streetAddress}</p>
                                        )}
                                      </div>
                                      <div>
                                        <label htmlFor="Latitude" className="tracking-wide font-semibold text-sm">Latitude*</label>
                                        <input
                                          type="number"
                                          id="Latitude"
                                          name="latitude"
                                          value={formData.location.locationCode[0].latitude}
                                          onChange={handleUpdateChange}
                                          placeholder="Latitude"
                                          min={0}
                                          className="w-full p-2 border text-sm rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out font-description tracking-wide"
                                        />
                                        {formErrors?.latitude && (
                                          <p className="text-red-500 text-xs">{formErrors.district}</p>
                                        )}
                                      </div>
                                      <div>
                                        <label htmlFor="Longitude" className="tracking-wide font-semibold text-sm">Longitude*</label>
                                        <input
                                          type="number"
                                          id="Longitude"
                                          name="longitude"
                                          value={formData.location.locationCode[0].longitude}
                                          onChange={handleUpdateChange}
                                          placeholder="Longitude"
                                          min={0}
                                          className="w-full p-2 border text-sm rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out font-description tracking-wide"
                                        />
                                        {formErrors?.longitude && (
                                          <p className="text-red-500 text-xs">{formErrors.longitude}</p>
                                        )}
                                      </div>
                                      {/* Add other fields similarly */}
                                      <div className="col-span-2 h-[300px]">
                                        <MarkerLocation latitude={formData.location.locationCode[0].latitude} longitude={formData.location.locationCode[0].longitude} />
                                      </div>

                                      <div className="col-span-2">
                                        <p className="pb-1 text-zinc-500">The maximum photo size is 8 MB. Formats: jpeg, jpg, png. Put the main picture first.</p>
                                        <hr />
                                        <div className="border rounde d-lg p-4 mt-4">
                                          <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
                                            {[...(formData.images || []), ...(previewImages || [])].map((image, index) => (
                                              <div key={index} className="relative rounded-lg overflow-hidden main-cover-block w-full h-[200px] group">
                                                <img
                                                  src={typeof image === "string" ? image : image.propertyImages}
                                                  className="z-0 w-full h-full object-cover rounded-lg border"
                                                  alt=""
                                                />
                                                <div className="z-[2] absolute rounded-lg inset-0 bg-dark/30 flex items-center justify-center -translate-x-full group-hover:translate-x-0 transition-transform duration-200">
                                                  <button
                                                    className="w-10 h-10 bg-white rounded-md"
                                                    onClick={() => handleDeleteImage(index)}
                                                  >
                                                    <i className="ri-delete-bin-line"></i>
                                                  </button>
                                                </div>
                                              </div>
                                            ))}

                                            <div className="file-choose-block w-full h-[200px]">
                                              {/* Hidden File Input */}
                                              <input
                                                type="file"
                                                ref={fileInputRef}
                                                className="hidden"
                                                name="propertyImages"
                                                accept='image/*'
                                                onChange={handleUpdateChange}
                                                multiple
                                              />

                                              {
                                                formErrors.propertyImages && (
                                                  <p className="text-red-500 text-xs">{formErrors.propertyImages}</p>
                                                )
                                              }

                                              {/* Upload Button */}
                                              <button
                                                className="bg-secondary h-full w-full rounded-lg border-dashed border border-dark cursor-pointer flex flex-col justify-center items-center"
                                                onClick={handleButtonClick}
                                              >
                                                <i className="ri-upload-2-fill text-3xl"></i>
                                                Upload photos
                                              </button>
                                            </div>
                                          </div>



                                          <div className="mt-3">
                                            <label htmlFor="location-link" className="tracking-wide font-semibold text-sm">Video Link *</label>
                                            <input
                                              id="location-link"
                                              placeholder="Past Youtube video Link here" className="w-full p-2 border text-sm rounded outline-none focus:ring-1 focus:ring-offset-1 focus:border-dark focus:ring-dark duration-200 ease-in-out font-description tracking-wide" type="url"
                                              onChange={handleUpdateChange}
                                              value={formData.propertyVideo}
                                              name="propertyVideo" />
                                            {
                                              formErrors.propertyVideo && (
                                                <p className="text-red-500 text-xs">{formErrors.propertyVideo}</p>
                                              )
                                            }

                                          </div>


                                        </div>
                                      </div>
                                    </div>
                                  </div>


                                </div>

                                {/* Modal Footer (Fixed) */}
                                <form onSubmit={handleSave} encType="multipart/form-data">
                                  <div className="p-3 border-t border-gray-300 flex justify-end stiSavecky bottom-0 bg-white z-10">
                                    <button className="bg-dark text-white px-4 text-sm py-2 rounded font-description tracking-wider">
                                      {isLoading ? 'Saving...' : 'save'}
                                    </button>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      }
                      <button
                        className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-200"
                        onClick={(e) => handleDeleteListing(e, property._id)}
                      >
                        {isLoading ? <FaSpinner className="animate-spin" /> : <RiDeleteBin5Line className="text-xl" />}
                      </button>
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
                className={`w-10 h-10 font-description rounded ${currentPage === number
                  ? "bg-dark text-white"
                  : "bg-white border hover:bg-gray-50"
                  }`}
              >
                {number}
              </button>
            ))}
          </div>
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
  );
};

export default DataTableListing;