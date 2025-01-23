import React, { useCallback, useEffect, useRef, useState } from "react";
import defaultProfile from "../../../assets/AgentDashboard/default-profile-img.jpg";
import { useAuth } from "../../../Contexts/AuthContext";
// import { handleUser Api } from "../../../Api/website/HandleUser Api";

const PersonalInfo = () => {
  const { currentAuth } = useAuth();
  const [formUpdate, setFormUpdate] = useState(currentAuth);
  const [changedFields, setChangedFields] = useState({}); // New state for changed fields
  const [isDisable, setIsDisable] = useState(true);
  const [imageSrc, setImageSrc] = useState(currentAuth?.avatar); // State to hold the image source

  useEffect(() => {
    setFormUpdate(currentAuth);
    setChangedFields({});
  }, [currentAuth]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    console.log(name  );
    setFormUpdate((prevForm) => ({ ...prevForm, [name]: value }));

    setChangedFields((prevChanged) => ({
      ...prevChanged,
      [name]: value,
    }));

  }, []);

  useEffect(() => {
    const isChange = Object.keys(changedFields).length;
    console.log(isChange);
    if (isChange > 0) {
      setIsDisable(false);
    }
  }, [formUpdate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(changedFields);
    console.log(changeIMG.current);
  };



  const changeIMG = useRef();
  const handleFileChange = useCallback((e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result); // Set the image source to the result of FileReader
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  }, []);


  return (
    <>
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
                src={imageSrc}
                alt="Default Image"
                ref={changeIMG}
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
                id="profilePhoto"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <FormField
            type="text"
            placeholder="Enter FullName"
            required={true}
            id="Full Name"
            value={formUpdate?.fullName}
            lable="Full Name"
            handleChange={handleChange}
            name="fullName" // Ensure this matches the state key
            icon="ri-user-3-line"
          />
          <FormField
            type="email"
            placeholder="Enter email"
            required={true}
            value={formUpdate?.email}
            handleChange={handleChange}
            id="Email"
            lable="Email"
            name="email"
            icon="ri-mail-line"
          />
          <FormField
            type="number"
            placeholder="Enter Phone Number"
            required={true}
            value={formUpdate?.phoneNumber}
            handleChange={handleChange}
            id="phone number"
            lable="Phone Number"
            name="phoneNumber"
            icon="ri-phone-line"
          />
          <TextArea
            placeholder="address"
            required={true}
            id="Address"
            value={formUpdate?.address}
            handleChange={handleChange}
            lable="Address"
            name="address"
          />
          <div className="text-end">
            <button type="submit" disabled={isDisable} className={`${isDisable && 'cursor-not-allowed'} px-8 rounded-lg mt-5 text-white font-medium font-inter tracking-wider py-2 bg-dark hover:ring-dark hover:ring-2 hover:ring-offset-1`}>
              Save
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PersonalInfo;

// FormField and TextArea components remain unchanged
const FormField = React.memo(
  ({
    type,
    placeholder,
    required,
    value,
    handleChange,
    id,
    lable,
    name,
    icon,
  }) => (
    <div className="mb-3">
      <label htmlFor={lable} className="block mb-1 font-description text-sm">
        {lable}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
          <i className={`${icon} opacity-50`}></i>
        </div>
        <input
          type={type}
          id={id}
          className="bg-secondary font-description focus:bg-white border-gray-300 text-dark text-sm placeholder:text-zinc-500 rounded-lg block w-full p-2.5 ps-9"
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  )
);

const TextArea = React.memo(
  ({ placeholder, required, id, value, lable, name, handleChange }) => (
    <div className="mb-0">
      <label
        htmlFor={lable}
        className="block mb-1 text-sm font-description text-dark"
      >
        Address
      </label>
      <textarea
        id={id}
        rows="4"
        name={name}
        className="block font-description p-2.5 w-full text-sm text-dark rounded-lg placeholder:text-zinc-500 bg-secondary"
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        required={required}
      >
        {value}
      </textarea>
    </div>
  )
);