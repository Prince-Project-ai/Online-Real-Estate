import defaultProfile from "../../../assets/Dashboard/avatars/defaultAvatar.jpg";
import React, { useCallback, useEffect, useState } from "react";
import { useAdminAuth } from "../../../Contexts/ADMIN/AdminAuthContext";
import { useMessage } from "../../../Contexts/MessageContext";
import { UpdateAdminProfile } from "../../../Api/dashboard/HandleAdminApi";

const AdminProfile = () => {
  // const { adminInfo, isLoading, setadminInfo } = useAuth();
  const { adminInfo, setAdminInfo, isLoading } = useAdminAuth();
  const { showToast } = useMessage();
  const [isEditing, setIsEditing] = useState(false);
  const [updateFormData, setUpdateFormData] = useState(adminInfo);
  const [changeFields, setChangeFields] = useState({});
  const [isDisable, setIsDisable] = useState(true);
  const [isBtnLoading, setIsBtnLoading] = useState(false);
  const [filePreview, setfilePreview] = useState(adminInfo?.avatar);

  useEffect(() => {
    setUpdateFormData(adminInfo);
    setfilePreview(adminInfo?.avatar);
    return () => {
      setUpdateFormData(adminInfo);
      setfilePreview(adminInfo?.avatar);
    }
  }, [adminInfo]);

  useEffect(() => {
    setIsDisable(Object.keys(changeFields).length === 0);
    return () => {
      setIsDisable(Object.keys(changeFields).length === 0);
    };
  }, [changeFields]);

  const handleChange = useCallback((e) => {
    const { name, value, files } = e.target;
    const file = files?.[0];
    if (file && name === "avatar") {
      if (!["image/jpg", "image/jpeg", "image/png"].includes(file.type)) {
        alert("please select JPG,JPEG,PNG");
        return;
      }

      if ((file.size / 1024 / 1024).toFixed(2) > 5) {
        showToast("Please upload a MAX size of 5MB", "error");
        return;
      }

      const render = new FileReader();
      render.onloadend = () => {
        setfilePreview(render.result);
      }
      render.readAsDataURL(file);

      setChangeFields((prevField) => ({ ...prevField, [name]: file }));
    } else {
      setChangeFields((prevField) => ({ ...prevField, [name]: value }));
    }
    setUpdateFormData((prevData) => ({ ...prevData, [name]: value || file }));
  }, []);

  // console.log(adminInfo);

  const updateProfile = async (e) => {
    e.preventDefault();
    setIsBtnLoading(true);
    setIsDisable(true);
    try {
      console.log("Changed Field : ", changeFields);
      const res = await UpdateAdminProfile(changeFields);
      console.log(res);
      if (res?.success) {
        setUpdateFormData(res?.data);
        setAdminInfo(res?.data);
        showToast(res?.success, "success");
      }
    } catch (error) {
      console.info(error);
    } finally {
      setIsBtnLoading(false);
      setIsDisable(true);
      setIsEditing(false);
    }
  }

  return (
    <div className="w-full max-w-7xl mx-auto p-6 md:p-6 lg:p-6 ">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-auto lg:auto-rows-auto items-start">
        <div className="md:col-span-3 auto-rows-auto bg-white border border-gray-300 rounded-xl p-6 shadow-sm">
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              {
                isLoading ? <span className="w-24 block h-24 border border-gray-300 rounded-full bg-zinc-300"></span> : (<img
                  src={filePreview || defaultProfile}
                  alt="Profile"
                  className="w-24 h-24 border border-gray-300  rounded-full object-cover"
                />)
              }
              <button className="absolute bottom-2 border-green-500 right-2 bg-green-500 rounded-full">
                <span className='block w-3 h-3'></span>
              </button>
            </div>
            <div className="flex-1 text-center">
              {
                isLoading ? (<>
                  <span className='block h-7 w-32 mb-2 rounded-lg bg-secondary '></span>
                  <span className='block h-5 w-20 rounded-lg bg-secondary '></span>
                </>) : (<>
                  <h1 className="font-heading flex-wrap text-center text-2xl">{adminInfo?.adminName}</h1>
                  <p className="font-description text-center text-gray-600">SUPER-ADMIN</p>
                </>)
              }

            </div>
            <div className="info text-center">
              <h3 className="font-inter font-semibold">Email</h3>
              <p className="font-description mb-4 text-gray-600">{adminInfo?.email}</p>
              <h3 className="font-inter font-semibold">Phone</h3>
              <p className="font-description mb-4 text-gray-600">{adminInfo?.phoneNumber}</p>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 font-inter hover:ring-2 hover:ring-offset-2 hover:ring-dark duration-200"
            // className="bg-black text-white hover:bg-gray-800 focus:ring-black/50 shadow-lg px-6 py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2"
            >
              {/* {isEditing ? <RiCloseLine className="w-4 h-4" /> : <RiEditLine className="w-4 h-4" />} */}
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        {isEditing && (
          <EditForm
            updateFormData={updateFormData}
            handleChange={handleChange}
            updateProfile={updateProfile}
            isDisable={isDisable}
            isBtnLoading={isBtnLoading}
          />
        )}
        <div className="md:col-span-3 bg-white auto-rows-auto w-full border border-gray-300 rounded-xl p-6 shadow-sm">
          <div className="grid grid-cols-1">
            <h1 className='font-inter text-xl mb-3 border-b pb-1 font-semibold'>History</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(AdminProfile);


const EditForm = React.memo(({ updateFormData, isBtnLoading, handleChange, updateProfile, isDisable }) => (
  <div className="md:col-span-6 auto-rows-auto bg-white border-gray-300 border rounded-xl p-6 shadow-sm">
    {/* <form onSubmit={(e) => { e.preventDefault(); setIsEditing(false); }} className="grid grid-cols-1 md:grid-cols-2 gap-6"> */}
    <h1 className='font-inter text-xl font-semibold mb-5'>Edit Personal Info</h1>
    <form onSubmit={updateProfile} className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <FormField
        type="text"
        label="FullName"
        placeholder="Enter Fullname"
        name="adminName"
        handleChange={handleChange}
        value={updateFormData?.adminName || ""}
      />
      <FormField
        type="email"
        label="Email"
        placeholder="Enter Email"
        name="email"
        handleChange={handleChange}
        value={updateFormData?.email || ""}
      />
      <FormField
        type="number"
        label="Phone number"
        placeholder="Enter Phone number"
        name="phoneNumber"
        handleChange={handleChange}
        value={updateFormData?.phoneNumber || ""}
      />
      <div>
        <label htmlFor="chooseFile" className="block font-inter text-sm font-medium mb-2">Select Avatar</label>
        <input
          type="file"
          id="chooseFile"
          name="avatar"
          onChange={handleChange}
          className="w-full px-3 p-2 border rounded-lg bg-secondary"
        />
      </div>

      <div className="md:col-span-2 ms-auto">
        <button disabled={isDisable && isBtnLoading} type="submit" className={`tracking-wider font-description ${isDisable && 'opacity-50 cursor-not-allowed'} bg-dark text-white px-4 py-2 rounded-lg flex items-center gap-2 font-inter hover:ring hover:ring-offset-2 hover:ring-dark duration-200`}>
          {
            isBtnLoading ? "saving..." : "save"
          }
        </button>
      </div>
    </form>
  </div>
));

const FormField = React.memo(({ type, label, handleChange, placeholder, name, value }) => (
  <div>
    <label htmlFor={label} className="block font-inter text-sm font-medium mb-2">{label}</label>
    <input
      type={type}
      id={label}
      placeholder={placeholder}
      name={name}
      onChange={handleChange}
      value={value}
      className="font-inter w-full p-2 px-3 border rounded-lg bg-secondary"
    />
  </div>
));