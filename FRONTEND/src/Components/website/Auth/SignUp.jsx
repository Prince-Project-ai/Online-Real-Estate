import React, { useCallback, useEffect, useState } from 'react';
import { signUp } from '../../../Api/website/HandleUserApi';
import { useMessage } from '../../../Contexts/MessageContext';

const ROLES = ['User', 'Seller', 'Agent'];

let i = 0;

const SignUp = ({ isAnimating, onClose, onSwitchToSignIn }) => {
  const { showToast } = useMessage();

  const [role, setRole] = useState('User');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    crmPassword: '',
    phoneNumber: '',
    address: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    password: '',
    crmPassword: '',
    phoneNumber: '',
    address: '',
  });

  useEffect(() => {
    setFormData(prev => ({ ...prev, role }));
  }, [role]);

  function validateField(name, value) {
    switch (name) {
      case "fullName":
        if (!value.trim()) {
          return "Full name is required.";
        } else if (value.length < 3) {
          return "Full name must be at least 3 characters.";
        }
        break;

      case "email":
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          return "Email is required.";
        } else if (!emailRegex.test(value)) {
          return "Enter a valid email address.";
        }
        break;

      case "password":
        if (!value.trim()) {
          return "Password is required.";
        } else if (value.length < 6) {
          return "Password must be at least 6 characters.";
        }
        break;

      case "crmPassword":
        if (!value.trim()) {
          return "CRM Password is required.";
        } else if (value.length < 6) {
          return "CRM Password must be at least 6 characters.";
        } else if (value !== formData.password) {
          return "Password does not same";
        }
        break;

      case "phoneNumber":
        const phoneRegex = /^[0-9]{10}$/;
        if (!value.trim()) {
          return "Phone number is required.";
        } else if (!phoneRegex.test(value)) {
          return "Enter a valid 10-digit phone number.";
        }
        break;

      case "address":
        if (!value.trim()) {
          return "Address is required.";
        } else if (value.length < 10) {
          return "Address must be at least 10 characters.";
        }
        break;

      default:
        return "";
    }
    return "";
  }


  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    // Update form data
    setFormData(prev => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  }, [formData.password]);

  console.info(errors);
  console.info(i++);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signUp(formData, showToast);
      setFormData({
        fullName: "",
        email: "",
        password: "",
        crmPassword: "",
        phoneNumber: "",
        address: "",
      });

    } catch (error) {
      console.error("SignUp Error: ", error);
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg max-w-2xl w-full relative ${isAnimating ? 'close' : 'open'}`}>
      <div className="p-6 py-3 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-dark">Create Account</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="Close">✕</button>
        </div>
      </div>

      <div className="p-2 border-b border-gray-200 bg-gray-50">
        <div className="grid grid-cols-3 gap-2">
          {ROLES.map((roleType) => (
            <button
              key={roleType}
              type="button"
              onClick={() => setRole(roleType)}
              className={`p-4 border-2 hover:border-dark flex flex-col items-center gap-2 rounded-lg transition-all
                ${role === roleType ? "bg-dark text-white shadow-lg" : "bg-white text-gray-600 hover:bg-gray-100"}`}
              aria-pressed={role === roleType}
            >
              <i className={`ri-${roleType === "User" ? "user" : roleType === "Seller" ? "building-2" : "user-settings"}-fill text-2xl`} />
              <span className="capitalize">{roleType}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Full Name"
              name="fullName"
              type="text"
              icon="user"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Email"
              name="email"
              type="email"
              icon="mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Password"
              name="password"
              type="password"
              icon="lock"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Confirm Password"
              name="crmPassword"
              type="password"
              icon="lock"
              value={formData.crmPassword}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              icon="phone"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            <FormInput
              label="Address"
              name="address"
              type="text"
              icon="map-pin"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 tracking-wide bg-dark text-white rounded-md focus:outline-none focus:ring hover:ring-2 focus:ring-offset-2 hover:ring-offset-2 hover:ring-black focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="ri-user-add-line mr-2" />
            Create Account
          </button>
        </form>
      </div>

      <div className="p-4 border-t border-gray-200 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <button onClick={onSwitchToSignIn} className="text-dark font-medium hover:underline">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

const FormInput = React.memo(({
  label,
  type,
  icon,
  required,
  value,
  onChange,
  error,
  name
}) => (
  <div>
    <label className="block text-sm font-description font-medium text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
        <i className={`ri-${icon}-line text-gray-500`} />
      </span>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        required={required}
        className={`w-full border-gray-300 focus:ring-1 focus:ring-dark focus:border-dark focus:ring-offset-2 font-description pl-10 px-4 py-2.5 border rounded-lg outline-none transition-shadow ${error ? 'border-red-500' : ''
          }`}
      />
    </div>
    {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
  </div>
));

export default React.memo(SignUp);