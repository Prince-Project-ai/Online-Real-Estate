import React, { useState } from "react";
import PropertyType from "./PropertyType";
import LocationDetails from "./LocationDetails";
import MediaUpload from "./MediaUpload";
import PricingCard from "./PricingCard";
import { formValidation } from "./wizardFormValidation";
import { useAuth } from "../../../Contexts/AuthContext";

const AddListing = () => {
  const { currentAuth } = useAuth();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    adderId: currentAuth?._id,
    role: currentAuth?.role,
    propertyTitle: "",
    listingType: "Sell",
    propertyType: "House",
    price: "",
    priceNegotiable: false,
    size: "",
    sizeUnit: "Square meter",
    location: {
      streetAddress: "", district: "", state: "Gujarat", country: "India", address_url: "", latitude: "", longitude: ""
    },
    propertyImages: [],
    propertyVideo: "",
  });

  const [previewImages, setPreviewImages] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const prevStep = (e) => {
    e.preventDefault();
    setStep((prev) => prev - 1);
  };

  const nextStep = (e) => {
    e.preventDefault();

    let errors = {};

    if (step === 1) {
      const fieldsToValidate = ["propertyTitle", "price", "size", "sizeUnit"];
      fieldsToValidate.forEach((field) => {
        const fieldErrors = formValidation(field, formData[field]);
        errors = { ...errors, ...fieldErrors };
      });
    }

    if (step === 2) {
      const locationFields = ["streetAddress", "district", "state", "country", "address_url", "latitude", "longitude"];
      locationFields.forEach((field) => {
        const fieldErrors = formValidation(field, formData.location[field]);
        errors = { ...errors, ...fieldErrors };
      });
    }

    if (step === 3) {
      const mediaFields = ["propertyImages", "propertyVideo"];
      mediaFields.forEach((field) => {
        const fieldErrors = formValidation(field, formData[field], field === "propertyImages" ? formData.propertyImages : undefined);
        errors = { ...errors, ...fieldErrors };
      });
    }

    // If there are validation errors, stop the process and update state
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors); // Set errors for UI display
      return;
    }

    // Clear previous errors and move to next step
    setFormErrors({});
    setStep((prevStep) => prevStep + 1);
  };



  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      const newImages = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        propertyImages: [...prev.propertyImages, ...newImages],
      }));
      newImages.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewImages((prevImages) => [...prevImages, reader.result]);
        };
        reader.readAsDataURL(file);
      });
    } else {
      setFormData((prev) => {
        if (name in prev.location) {
          // Updating nested location object properly
          return {
            ...prev,
            location: {
              ...prev.location,
              [name]: value,
            },
          };
        }
        return { ...prev, [name]: value };
      });
    }

    const handleFormError = formValidation(name, value, files);
    setFormErrors((prevErrors) => ({ ...prevErrors, ...handleFormError }));
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = addListingSeller(formData);
      console.log(response);
    } catch (error) {
      console.error("Error submitting listing:", error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <PropertyType
            formData={formData}
            handleChange={handleChange}
            formErrors={formErrors}
          />
        );
      case 2:
        return (
          <LocationDetails
            formData={formData.location}
            handleChange={handleChange}
            formErrors={formErrors}
          />
        );
      case 3:
        return (
          <MediaUpload
            formData={formData}
            handleChange={handleChange}
            previewImages={previewImages}
            formErrors={formErrors} // Pass errors here
          />
        );
      case 4:
        return (
          <PricingCard
            formData={formData}
            handleChange={handleChange}
            formErrors={formErrors} // Pass errors here
          />
        );
      default:
        return null;
    }
  };


  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      <div className="grid grid-cols-12 gap-x-5">
        <div className="bg-white rounded-lg self-start border p-5 col-span-8">
          {renderStep()}
          <div className="flex justify-between mt-6">
            {step > 1 && (
              <button type="button" onClick={prevStep} className="border font-inter tracking-wide border-dark text-dark px-4 py-2 rounded-lg">
                <i className="ri-arrow-left-long-line me-1"></i> Previous
              </button>
            )}
            {step < 4 && (
              <button type="button" onClick={nextStep} className="bg-dark font-inter tracking-wider text-white px-4 py-2 rounded-lg">
                Next <i className="ri-arrow-right-long-line ms-2"></i>
              </button>
            )}
            {step === 4 && (
              <button type="submit" className="bg-dark font-inter tracking-wider text-white px-4 py-2 rounded-lg">
                Submit Listing
              </button>
            )}
          </div>
        </div>
        <div className="bg-white rounded-lg self-start border p-5 col-span-4 sticky top-0">
          <ul className="space-y-4 rounded-lg overflow-hidden">
            <li className="flex items-center bg-secondary py-2 p-3">
              <i className={`${step === 1 ? 'ri-arrow-right-circle-line' : 'ri-checkbox-circle-line'} text-xl me-2`}></i>
              <p className="font-inter text-sm">Property Type</p>
            </li>
            <li className="flex items-center bg-secondary py-2 p-3">
              <i className={`${step === 2 ? 'ri-arrow-right-circle-line' : step < 2 ? 'ri-circle-line' : 'ri-checkbox-circle-line'} text-xl me-2`}></i>
              <p className="font-inter text-sm">Location</p>
            </li>
            <li className="flex items-center bg-secondary py-2 p-3">
              <i className={`${step === 3 ? 'ri-arrow-right-circle-line' : step < 3 ? 'ri-circle-line' : 'ri-checkbox-circle-line'} text-xl me-2`}></i>
              <p className="font-inter text-sm">Photos and videos</p>
            </li>
            <li className="flex items-center bg-secondary py-2 p-3">
              <i className="ri-circle-line text-xl me-2"></i>
              <p className="font-inter text-sm">Final Submit</p>
            </li>
          </ul>
        </div>
      </div>
    </form>
  );
};

export default React.memo(AddListing);




// const firstStepValidation = ["propertyTitle", "price", "size", "sizeUnit"];

// const stepOneValidation = Object.entries(formData).filter(([key, value], index) => (key === firstStepValidation[index]))
// console.log(stepOneValidation);

// const errors = formValidation([...firstStepValidation], formData);
// console.log(errors);
// if (firstStepValidation.includes(key)) {
//   const newError = formValidation(key, value);
//   setFormErrors((prev) => ({ ...prev, ...newError }));

//   // setFormErrors((prevError) => ({ ...prevError, ...newError }));
// }
// }

// Object.entries(formData).map(([key, value], index) => {
//   if (step === 1) {


//   }
// });
// console.log("Form All Error : ", formErrors);