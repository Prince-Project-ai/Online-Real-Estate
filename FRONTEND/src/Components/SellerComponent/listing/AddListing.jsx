import React, { useState } from "react";
import BasicDetails from "./BasicDetails";
import LocationDetails from "./LocationDetails";
import FeaturesAmenities from "./FeaturesAmenities";
import MediaUpload from "./MediaUpload";
// import HeaderNavigation from "./HeaderNavigation";

const AddListing = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Details
    propertyTitle: "",
    propertyType: "",
    listingType: "",
    price: "",
    priceNegotiable: false,
    size: "",
    sizeUnit: "sq. ft",
    bedrooms: "",
    bathrooms: "",
    furnished: "",
    
    // Location Details
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    mapLocation: "",
    // Features & Amenities
    parkingSpaces: "",
    balconyTerrace: false,
    gardenYard: false,
    swimmingPool: false,
    gym: false,
    securitySystem: false,
    nearbyFacilities: [],
    // Media Upload
    propertyImages: [],
    propertyVideo: "",
    virtualTour: "",
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = () => {
    console.log("Form Data Submitted:", formData);
    alert("Form submitted successfully!");
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <BasicDetails formData={formData} handleChange={handleChange} />;
      case 2:
        return <LocationDetails formData={formData} handleChange={handleChange} />;
      case 3:
        return <FeaturesAmenities formData={formData} handleChange={handleChange} />;
      case 4:
        return <MediaUpload formData={formData} handleChange={handleChange} />;
      default:
        return null;
    }
  };

  return (
    // <div className="container mx-auto p-4">
    <>
      <h1 className="text-2xl font-bold font-inter mb-4">Property Listing.</h1>
      <div className="bg-white rounded-lg p-5 border">
        <div className="grid grid-cols-12">
          <div className="col-span-4"></div>
          <div className="col-span-8"> {renderStep()}</div>
        </div>

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="border font-inter tracking-wide border-dark text-dark  px-4 py-2 rounded-lg"
            >
              <i className="ri-arrow-left-long-line me-1"></i>
              Previous
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={nextStep}
              className="bg-dark font-inter tracking-wider text-white px-4 py-2 rounded-lg"
            >
              Next
              <i className="ri-arrow-right-long-line ms-2"></i>
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-green-500 text-white px-4 py-2 rounded-lg"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </>
    // </div>
  );
};

export default AddListing;
