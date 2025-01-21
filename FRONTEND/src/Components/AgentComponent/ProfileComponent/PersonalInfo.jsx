import React from "react";
import defaultProfile from "../../../assets/AgentDashboard/default-profile-img.jpg";

const PersonalInfo = () => {
  return (
    <>
      <div className="heading mb-3">
        <h1 className="text-2xl font-semibold font-inter">Personal Information</h1>
      </div>
      <div className="profile-photo mb-5 flex space-x-5 items-center">
        <div className="photo">
          <img
            src="ldsd"
            alt="Default Image"
            className="w-20 rounded-full border-2 h-auto"
            onError={(e) => {
              e.target.src = defaultProfile;
            }}
          />
        </div>
        <div className="upload-input">
          <input type="file" name="profilePhoto" className="bg-secondary rounded-lg px-2 py-2 font-inter cursor-pointer" id="profilePhoto" />
        </div>
      </div>
      <div className="profile-form">
        <form>
          <FormField
            type="text"
            placeholder="Enter FullName"
            required={true}
            id="Full Name"
            lable="Full Name"
            name="FullName"
            icon="ri-user-3-line"
          />
          <FormField
            type="email"
            placeholder="Enter email"
            required={true}
            id="Email"
            lable="Email"
            name="email"
            icon="ri-mail-line"
          />
          <FormField
            type="number"
            placeholder="Enter Phone Number"
            required={true}
            id="phone number"
            lable="Phone Number"
            name="phoneNumber"
            icon="ri-phone-line"
          />
          <TextArea
            placeholder="address"
            required={true}
            id="Address"
            lable="Address"
            name="address"
            icon="ri-map-pin-2-line"
          />
          <div className="text-end">
            <button className="px-8 rounded-lg mt-5 text-white font-medium font-inter tracking-wider py-2 bg-dark hover:ring-dark hover:ring-2 hover:ring-offset-1">Save</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default PersonalInfo;

const FormField = React.memo(({ type,
  placeholder,
  required,
  id,
  lable,
  name, icon }) => (
  <div className="mb-3">
    <label htmlFor={lable} className="block mb-1 font-description text-sm">{lable}</label>
    <div className="relative">
      <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
        <i className={`${icon} opacity-50`}></i>
      </div>
      <input type={type} id={id} className="bg-secondary font-description focus:bg-white border-gray-300 text-dark text-sm placeholder:text-zinc-500 rounded-lg block w-full p-2.5 ps-9" name={name} placeholder={placeholder} required={required} />
    </div>
  </div>
));


const TextArea = React.memo(({ placeholder, required, id, lable, name, icon }) => (
  <div className="mb-0">
    <label htmlFor={lable} className="block mb-1 text-sm font-description text-dark">Your message</label>
    <textarea id={id} rows="4" name={name} className="block font-description p-2.5 w-full text-sm text-dark rounded-lg placeholder:text-zinc-500 bg-secondary" placeholder={placeholder} required={required}></textarea>
  </div>
))