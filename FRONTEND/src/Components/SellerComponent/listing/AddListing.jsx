import React, { useState } from "react";
import PropertyType from "./PropertyType";
// import LocationDetails from "./LocationDetails";
import MediaUpload from "./MediaUpload";
import PricingCard from "./PricingCard";
import { formValidation } from "./wizardFormValidation";

import { addListingSeller } from "../../../Api/website/HandleUserApi";
import { useMessage } from "../../../Contexts/MessageContext";
import { useAuth } from "../../../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ButtonSpinner from "../../Loaders/ButtonSpinner";
import SeachProperty from "./SeachProperty";

const AddListing = () => {
  const { currentAuth } = useAuth();
  const { showToast } = useMessage();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

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
      streetAddress: "", latitude: "", longitude: ""
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
        const error = formValidation(field, formData[field]);
        if (error) {
          errors[field] = error;
        }
      });
    }

    if (step === 3) {
      const mediaFields = ["propertyImages", "propertyVideo"];
      mediaFields.forEach((field) => {
        const error = formValidation(field, formData[field], field === "propertyImages" ? formData.propertyImages : undefined);
        if (error) {
          errors[field] = error;
        }
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

    // Validate the field and update form errors
    const error = formValidation(name, value, files);
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("adderId", formData.adderId);
      formDataToSend.append("role", formData.role);
      formDataToSend.append("propertyTitle", formData.propertyTitle);
      formDataToSend.append("listingType", formData.listingType);
      formDataToSend.append("propertyType", formData.propertyType);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("priceNegotiable", formData.priceNegotiable);
      formDataToSend.append("size", formData.size);
      formDataToSend.append("sizeUnit", formData.sizeUnit);
      formDataToSend.append("propertyVideo", formData.propertyVideo);

      formDataToSend.append("location", JSON.stringify(formData.location));

      if (formData.propertyImages && formData.propertyImages.length > 0) {
        formData.propertyImages.forEach((image, index) => {
          formDataToSend.append(`propertyImages`, image);
        });
      }

      for (let [key, value] of formDataToSend.entries()) {
        console.log(key, value);
      }

      const response = await addListingSeller(formDataToSend);

      if (response?.success) {
        showToast(response?.message, "success");
        navigate("/dashboard-seller/total-listing");
      }
      console.log(response);
    } catch (error) {
      showToast(error?.response?.data?.message, "error");
    } finally {
      setIsLoading(false);
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
          <SeachProperty
            setFormData={setFormData}
            formErrors={formErrors}
          />
        );
      case 3:
        return (
          <MediaUpload
            formData={formData}
            handleChange={handleChange}
            previewImages={previewImages}
            setPreviewImages={setPreviewImages}
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        <div className="bg-white rounded-lg order-1 lg:order-0 self-start border p-5 lg:col-span-8 col-span-1">
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
                {isLoading ? <ButtonSpinner /> : 'Submit Listing'}
              </button>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg order-0 lg:order-1 self-start border p-5 lg:col-span-4 col-span-1 lg:sticky lg:top-0">
          <ul className="space-y-4 rounded-lg overflow-hidden">
            <li className={`flex items-center bg-secondary py-2 p-3`}>
              <i className={`${step === 1 ? 'ri-arrow-right-circle-line' : 'ri-checkbox-circle-line'} text-xl me-2`}></i>
              <p className="font-inter text-sm">Property Type</p>
            </li>
            <li className={`flex items-center bg-secondary py-2 p-3`}>
              <i className={`${step === 2 ? 'ri-arrow-right-circle-line' : step < 2 ? 'ri-circle-line' : 'ri-checkbox-circle-line'} text-xl me-2`}></i>
              <p className="font-inter text-sm">Location</p>
            </li>
            <li className={`flex items-center bg-secondary py-2 p-3`}>
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


// {/* <LocationDetails
//             formData={formData.location}
//             handleChange={handleChange}
//             formErrors={formErrors}
//           /> */}