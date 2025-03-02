import React, { useCallback, useEffect, useState, useMemo } from "react";
import defaultProfile from "../../../assets/AgentDashboard/default-profile-img.jpg";
import { useAuth } from "../../../Contexts/AuthContext";
import { UpdateAgentProfile } from "../../../Api/website/HandleUserApi";
import { useMessage } from "../../../Contexts/MessageContext";
import ButtonSpinner from "../../Loaders/ButtonSpinner";

const VALID_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

const PersonalInfo = () => {
  const { currentAuth } = useAuth();
  const { showToast } = useMessage();

  const [formData, setFormData] = useState(currentAuth);
  const [changedFields, setChangedFields] = useState({});
  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [filePreview, setFilePreview] = useState(currentAuth.avatar);

  useEffect(() => {
    setFormData(currentAuth);
    setFilePreview(currentAuth.avatar);
  }, [currentAuth]);

  const handleChange = useCallback(
    (e) => {
      const { name, value, files } = e.target;
      const file = files?.[0];

      if (name === "avatar" && file) {
        if (!VALID_IMAGE_TYPES.includes(file.type)) {
          showToast("Please upload a valid image file (JPG, JPEG, PNG)", "error");
          return;
        }

        if ((file.size / 1024 / 1024).toFixed(2) > 5) {
          showToast("Please upload a MAX size of 5MB", "error");
          return;
        }

        const reader = new FileReader();
        reader.onload = () => setFilePreview(reader.result);
        reader.readAsDataURL(file);

        setChangedFields((prev) => ({ ...prev, [name]: file }));
      } else {
        setChangedFields((prev) => ({ ...prev, [name]: value }));
      }

      setFormData((prev) => ({
        ...prev,
        [name]: file || value,
      }));
    },
    [showToast]
  );

  useEffect(() => {
    setIsDisabled(Object.keys(changedFields).length === 0);
  }, [changedFields]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const updatedFormData = new FormData();
    Object.entries(changedFields).forEach(([key, value]) => {
      updatedFormData.append(key, value);
    });

    try {
      const response = await UpdateAgentProfile(updatedFormData);
      if (response?.success) {
        showToast(response.message, "success");
        setFormData(response.data);
        setChangedFields({});
      } else {
        showToast("Failed to update profile", "error");
      }
    } catch (error) {
      showToast(error?.response?.data?.message || error.message, "error");
    } finally {
      setIsLoading(false);
      setIsDisabled(true);
    }
  };

  const memoizedFormFields = useMemo(
    () => [
      {
        type: "text",
        placeholder: "Enter Full Name",
        id: "fullName",
        label: "Full Name",
        name: "fullName",
        icon: "ri-user-3-line",
        value: formData?.fullName || "",
      },
      {
        type: "email",
        placeholder: "Enter Email",
        id: "email",
        label: "Email",
        name: "email",
        icon: "ri-mail-line",
        value: formData?.email || "",
      },
      {
        type: "number",
        placeholder: "Enter Phone Number",
        id: "phoneNumber",
        label: "Phone Number",
        name: "phoneNumber",
        icon: "ri-phone-line",
        value: formData?.phoneNumber || "",
      },
    ],
    [formData]
  );

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white border rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold font-inter text-gray-800 mb-5">
        Edit Personal Information
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col items-center space-y-3 md:flex-row md:space-x-5">
          <div className="w-24 h-24 border-2 rounded-full overflow-hidden">
            <img
              src={filePreview || defaultProfile}
              alt="Profile"
              className="h-full w-full object-cover"
              onError={(e) => (e.target.src = defaultProfile)}
            />
          </div>
          <input
            type="file"
            name="avatar"
            className="mt-2 block w-full md:w-auto px-4 py-2 border rounded-lg cursor-pointer text-gray-600"
            onChange={handleChange}
            accept={VALID_IMAGE_TYPES.join(", ")}
          />
        </div>

        {memoizedFormFields.map((field) => (
          <FormField key={field.id} {...field} handleChange={handleChange} />
        ))}

        <TextArea
          placeholder="Enter Address"
          id="address"
          value={formData?.address || ""}
          handleChange={handleChange}
          label="Address"
          name="address"
        />

        <div className="text-end">
          <button
            type="submit"
            disabled={isDisabled}
            className={`px-8 py-2 text-white font-medium tracking-wider rounded-lg bg-dark hover:bg-dark/90 transition ${isDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {isLoading ? <ButtonSpinner /> : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalInfo;

const FormField = React.memo(
  ({ type, placeholder, value, handleChange, id, label, name, icon }) => (
    <div>
      <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-3 flex items-center text-gray-500">
          <i className={`${icon}`}></i>
        </div>
        <input
          type={type}
          id={id}
          className="w-full pl-10 p-2 border rounded-lg font-description focus:ring-2 focus:ring-dark"
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
        />
      </div>
    </div>
  )
);

const TextArea = React.memo(({ placeholder, id, value, label, name, handleChange }) => (
  <div>
    <label htmlFor={id} className="block mb-1 text-sm font-medium text-gray-700">
      {label}
    </label>
    <textarea
      id={id}
      rows="4"
      name={name}
      className="w-full p-2 border rounded-lg font-description focus:ring-2 focus:ring-dark"
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
    />
  </div>
));