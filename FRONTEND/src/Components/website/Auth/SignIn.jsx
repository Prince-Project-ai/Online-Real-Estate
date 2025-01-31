import React, { useCallback, useState, Suspense, lazy } from "react";
import { signInApi } from "../../../Api/website/HandleUserApi";
import { useMessage } from "../../../Contexts/MessageContext";
import Spinner from "../../core/Spinner";
import { useAuth } from "../../../Contexts/AuthContext";

const SignIn = ({ isAnimating, onClose, onSwitchToSignUp, onSwitchToResetPassword }) => {
  const { showToast } = useMessage();
  const { setIsAuthenticated, setCurrentAuth } = useAuth();

  const [formData, setFromData] = useState({
    email: "",
    password: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  function validateField(name, value) {
    const validations = {
      email: () => {
        if (!value.trim()) return 'Email is required.';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address.';
        return '';
      },
      password: () => {
        if (!value.trim()) return 'Password is required.';
        if (value.length < 6) return 'Password must be at least 6 characters.';
        return '';
      },
    }
    return validations[name] ? validations[name]() : '';
  }

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFromData((prevFormData) => ({ ...prevFormData, [name]: value }));
    const validate = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: validate }));
  }, [formData])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await signInApi(formData);
      if (response.success) {
        setFromData({
          email: '',
          password: '',
        });
        showToast(response?.message, "success");
        setCurrentAuth(response?.data?.currentAuth);
        setIsAuthenticated(true);
        onClose();
      }
    } catch (error) {
      showToast(error?.response?.data?.message || error?.message, "error");
    } finally {
      setIsLoading(false)
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg max-w-md w-full relative ${isAnimating ? 'close' : 'open'}`}>
      {/* Modal Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center">
        <h2 className="text-xl font-bold text-dark">Sign In</h2>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-description font-medium text-gray-700 mb-1">
              Email
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <i className="ri-mail-line text-gray-500"></i>
              </span>
              <input
                type="email"
                value={formData.email}
                name="email"
                onChange={handleChange}
                required
                className={`w-full border-gray-300 font-description pl-10 border px-4 py-2.5 rounded-lg outline-none transition-shadow ${errors.email ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:ring-offset-2' : 'focus:ring-2 focus:ring-dark focus:border-dark focus:ring-offset-2'
                  }`}
              />
            </div>
            {errors.email && <p className="mt-1 text-sm font-description text-red-500">{errors.email}</p>}
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label className="block text-sm font-description font-medium text-gray-700 mb-1">
              Password
              <span className="text-red-500 ml-1">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <i className="ri-lock-password-line text-gray-500"></i>
              </span>
              <input
                type="password"
                value={formData.password}
                name="password"
                onChange={handleChange}
                required
                className={`w-full border-gray-300 font-description pl-10 border px-4 py-2.5 rounded-lg outline-none transition-shadow ${errors.password ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:ring-offset-2' : 'focus:ring-2 focus:ring-dark focus:border-dark focus:ring-offset-2'
                  }`}
              />
            </div>
            {errors.password && <p className="mt-1 text-sm font-description text-red-500">{errors.password}</p>}
          </div>

          {/* Remember Me and Forgot Password */}
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="h-4 w-4 text-dark focus:ring-dark border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 text-sm text-gray-600"
              >
                Remember Me
              </label>
            </div>
            <button onClick={onSwitchToResetPassword} className="text-sm text-dark hover:underline">
              Reset Password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 px-4 tracking-wide bg-dark text-white rounded-md focus:outline-none focus:ring hover:ring-2 focus:ring-offset-2 hover:ring-offset-2 disabled:cursor-not-allowed hover:ring-black focus:ring-black"
          >
            {
              isLoading ? <Spinner /> : "Sign In"
            }
          </button>
        </form>
      </div>

      {/* Modal Footer */}
      <div className="p-4 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={onSwitchToSignUp}
            className="text-dark font-medium hover:underline"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default React.memo(SignIn);