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

    // Sync with the latest auth data
    useEffect(() => {
        setFormData(currentAuth);
        setFilePreview(currentAuth.avatar);
    }, [currentAuth]);

    // Handle form field changes
    const handleChange = useCallback((e) => {
        const { name, value, files } = e.target;
        const file = files?.[0];
        if (name === "avatar" && file) {
            console.log("file size in kb : ", (file.size / 1024 / 1024).toFixed(2)); //default file object file size is in bytes if you wanbt ot make the in kb then convert by logic
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
    }, [showToast]);

    // Update button disable state
    useEffect(() => {
        setIsDisabled(Object.keys(changedFields).length === 0);
    }, [changedFields]);

    // Handle form submission
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

    // Memoized form fields to avoid unnecessary renders
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
        <>
            <div className="heading mb-3">
                <h1 className="text-2xl font-semibold font-inter">Personal Information</h1>
            </div>

            <div className="profile-form">
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <div className="profile-photo mb-5 flex space-x-5 items-center">
                        <div className="photo">
                            <img
                                src={filePreview || defaultProfile}
                                alt="Profile"
                                className="w-20 h-20 rounded-full border-2 object-cover"
                                onError={(e) => (e.target.src = defaultProfile)}
                            />
                        </div>
                        <div className="upload-input">
                            <input
                                type="file"
                                name="avatar"
                                className="bg-secondary rounded-lg px-2 py-2 font-inter cursor-pointer"
                                id="avatar"
                                onChange={handleChange}
                                accept={VALID_IMAGE_TYPES.join(", ")}
                            />
                        </div>
                    </div>

                    {memoizedFormFields.map((field) => (
                        <FormField
                            key={field.id}
                            {...field}
                            handleChange={handleChange}
                        />
                    ))}

                    <TextArea
                        placeholder="Enter Address"
                        required
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
                            className={`${isDisabled ? "cursor-not-allowed opacity-50" : ""
                                } px-8 rounded-lg mt-5 text-white font-medium font-inter tracking-wider py-2 bg-dark hover:ring-dark hover:ring-2 hover:ring-offset-1`}
                        >
                            {isLoading ? <ButtonSpinner /> : "Save"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PersonalInfo;

const FormField = React.memo(
    ({ type, placeholder, required, value, handleChange, id, label, name, icon }) => (
        <div className="mb-3">
            <label htmlFor={id} className="block mb-1 font-description text-sm">
                {label}
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

const TextArea = React.memo(({ placeholder, required, id, value, label, name, handleChange }) => (
    <div className="mb-3">
        <label htmlFor={id} className="block mb-1 text-sm font-description text-dark">
            {label}
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
        />
    </div>
));
