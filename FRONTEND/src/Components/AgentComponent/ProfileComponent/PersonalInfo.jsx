import React, { useCallback, useEffect, useState } from "react";
import defaultProfile from "../../../assets/AgentDashboard/default-profile-img.jpg";
import { useAuth } from "../../../Contexts/AuthContext";
import { UpdateAgentProfile } from "../../../Api/website/HandleUserApi";

const PersonalInfo = () => {
  const { currentAuth } = useAuth();
  const [formUpdate, setFormUpdate] = useState(currentAuth);
  const [changedFields, setChangedFields] = useState({});
  const [isDisable, setIsDisable] = useState(true);
  const [imageSrc, setImageSrc] = useState({
    liveAvatar: currentAuth?.avatar,
    avatar: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setFormUpdate(currentAuth);
    setChangedFields({});
  }, [currentAuth]);

  // Handle input changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormUpdate((prevForm) => ({ ...prevForm, [name]: value }));
    setChangedFields((prevChanged) => ({
      ...prevChanged,
      [name]: value,
    }));
  }, []);

  // Toggle button disable state based on form changes
  useEffect(() => {
    const isChange =
      Object.keys(changedFields).length > 0 || imageSrc.fileObject;
    setIsDisable(!isChange);
  }, [changedFields, imageSrc]);

  // Handle image file change
  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc((prev) => ({
          ...prev,
          liveAvatar: reader.result,
          avatar: file,
        }));
      };
      reader.readAsDataURL(file);
    }
  }, []);

  // Form validation
  const validateForm = () => {
    const errors = {};
    if (!formUpdate.fullName) errors.fullName = "Full Name is required.";
    if (!formUpdate.email || !/\S+@\S+\.\S+/.test(formUpdate.email))
      errors.email = "Valid email is required.";
    if (!formUpdate.phoneNumber || formUpdate.phoneNumber.length < 10)
      errors.phoneNumber = "Phone number must be at least 10 digits.";
    if (!formUpdate.address) errors.address = "Address is required.";
    return errors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsLoading(true);
    try {
      const res = await UpdateAgentProfile(changedFields, imageSrc.avatar);
      console.log("Profile updated successfully:", res);
    } catch (error) {
      console.error("Error updating profile:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="heading mb-3">
        <h1 className="text-2xl font-semibold font-inter">
          Personal Information
        </h1>
      </div>

      <div className="profile-form">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="profile-photo mb-5 flex space-x-5 items-center">
            <div className="photo">
              <img
                src={imageSrc?.liveAvatar || defaultProfile}
                alt="Avatar"
                className="w-20 h-20 rounded-full border-2 object-cover"
                onError={(e) => {
                  e.target.src = defaultProfile;
                }}
              />
            </div>
            <div className="upload-input">
              <input
                type="file"
                name="profilePhoto"
                className="bg-secondary rounded-lg px-2 py-2 font-inter cursor-pointer"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Full Name Field */}
          <FormField
            type="text"
            placeholder="Enter Full Name"
            required
            value={formUpdate?.fullName}
            label="Full Name"
            handleChange={handleChange}
            name="fullName"
            icon="ri-user-3-line"
            error={formErrors.fullName}
          />

          {/* Email Field */}
          <FormField
            type="email"
            placeholder="Enter Email"
            required
            value={formUpdate?.email}
            handleChange={handleChange}
            label="Email"
            name="email"
            icon="ri-mail-line"
            error={formErrors.email}
          />

          {/* Phone Number Field */}
          <FormField
            type="number"
            placeholder="Enter Phone Number"
            required
            value={formUpdate?.phoneNumber}
            handleChange={handleChange}
            label="Phone Number"
            name="phoneNumber"
            icon="ri-phone-line"
            error={formErrors.phoneNumber}
          />

          {/* Address Field */}
          <TextArea
            placeholder="Enter Address"
            required
            value={formUpdate?.address}
            handleChange={handleChange}
            label="Address"
            name="address"
            error={formErrors.address}
          />

          <div className="text-end">
            <button
              type="submit"
              disabled={isDisable}
              className={`${
                isDisable && "cursor-not-allowed"
              } px-8 rounded-lg mt-5 text-white font-medium font-inter tracking-wider py-2 bg-dark hover:ring-dark hover:ring-2 hover:ring-offset-1`}
            >
              {isLoading ? "Loading..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;

// FormField Component
const FormField = React.memo(
  ({
    type,
    placeholder,
    required,
    value,
    handleChange,
    label,
    name,
    icon,
    error,
  }) => (
    <div className="mb-3">
      <label htmlFor={label} className="block mb-1 font-description text-sm">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <i className={`${icon} opacity-50`}></i>
        </div>
        <input
          type={type}
          className={`bg-secondary font-description focus:bg-white border-gray-300 text-dark text-sm placeholder:text-zinc-500 rounded-lg block w-full p-2.5 ps-9 ${
            error ? "border-red-500" : ""
          }`}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
        />
        {error && <span className="text-xs text-red-500">{error}</span>}
      </div>
    </div>
  )
);

// TextArea Component
const TextArea = React.memo(
  ({ placeholder, required, value, label, name, handleChange, error }) => (
    <div className="mb-0">
      <label
        htmlFor={label}
        className="block mb-1 text-sm font-description text-dark"
      >
        {label}
      </label>
      <textarea
        id={label}
        rows="4"
        name={name}
        className={`block font-description p-2.5 w-full text-sm text-dark rounded-lg placeholder:text-zinc-500 bg-secondary ${
          error ? "border-red-500" : ""
        }`}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        required={required}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
);
