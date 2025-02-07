import React, { useCallback, useState } from "react";
import { useMessage } from "../../../Contexts/MessageContext";
import { resetPasswordApi } from "../../../Api/website/HandleUserApi";
import ButtonSpinner from "../../Loaders/ButtonSpinner";

const ResetPassword = ({ isAnimating, onClose, onSwitchToSignIn }) => {
  const { showToast } = useMessage();
  const [resetPasswordData, setResetPassword] = useState({
    token: "",
    password: "",
    crmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({});

  const handleChangeReset = useCallback((e) => {
    setResetPassword((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));
  }, []);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const errors = validateForm(resetPasswordData);
      if (Object.keys(errors).length === 0) {
        const res = await resetPasswordApi(resetPasswordData);
        if (res?.success) {
          showToast(res?.message, "success");
          setResetPassword({
            token: "",
            password: "",
            crmPassword: "",
          });
          onSwitchToSignIn();
        }
      } else {
        setErrors(errors);
      }
    } catch (error) {
      showToast(error?.response?.data?.message, "error");
    } finally {
      setIsLoading(false);
    }
  }

  const validateForm = (formData) => {
    const errors = {};
    // console.log("Print : ", formData);
    if (!formData.token) {
      errors.token = "Code is required.";
    }
    if (!formData.password) {
      errors.password = "Password is required.";
    }
    if (!formData.crmPassword) {
      errors.crmPassword = "Confirm Password is required.";
    }
    if (formData.password !== formData.crmPassword) {
      errors.same = "Password does not same.";
    }
    return errors;
  }

  return (
    <div className={`bg-white rounded-2xl shadow-lg max-w-lg w-full relative ${isAnimating ? 'close' : 'open'}`}>
      <div className="p-4 py-3 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-inter font-semibold text-dark">Reset Password</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="Close">
            ✕
          </button>
        </div>
      </div>

      <form onSubmit={handleResetPassword}>
        <div className="p-4 border-b border-gray-200 bg-gray-50">

          <div className="mb-4">
            <label className="block text-sm font-description font-medium text-gray-700 mb-1">Vefication Code<span className="text-red-500 ml-1">*</span></label>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center"><i className="ri-shield-flash-line text-gray-500"></i></span>
              <input
                autoFocus={true}
                className="w-full border-gray-300 font-inter pl-10 border px-4 py-2.5 rounded-lg outline-none transition-shadow focus:ring-2 focus:ring-dark focus:border-dark focus:ring-offset-2"
                type="text"
                name="token"
                placeholder="Enter Verification Code"
                onChange={handleChangeReset}
                value={resetPasswordData.token}
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-description font-medium text-gray-700 mb-1">New Password<span className="text-red-500 ml-1">*</span></label>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center"><i className="ri-lock-2-line text-gray-500"></i></span>
              <input
                className="w-full border-gray-300 font-inter pl-10 border px-4 py-2.5 rounded-lg outline-none transition-shadow focus:ring-2 focus:ring-dark focus:border-dark focus:ring-offset-2"
                type="text"
                name="password"
                placeholder="New Password"
                onChange={handleChangeReset}
                value={resetPasswordData.password}
                required
              />
            </div>
          </div>

          <div className="">
            <label className="block text-sm font-description font-medium text-gray-700 mb-1">Confirm Password<span className="text-red-500 ml-1">*</span></label>

            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center"><i className="ri-lock-2-line text-gray-500"></i></span>
              <input
                className="w-full border-gray-300 font-description pl-10 border px-4 py-2.5 rounded-lg outline-none transition-shadow focus:ring-2 focus:ring-dark focus:border-dark focus:ring-offset-2"
                type="password"
                name="crmPassword"
                placeholder="Confirm Password"
                onChange={handleChangeReset}
                value={resetPasswordData.crmPassword}
                required
              />
            </div>
          </div>

        </div>

        <div className="p-4 flex justify-end">
          <button className='bg-dark px-4 py-2 rounded-lg text-white font-inter gap-x-1 items-center tracking-wide flex'>
            {
              isLoading ? <ButtonSpinner /> : "Reset Password"
            }

          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPassword;