import React, { useCallback, useState } from "react";

const SignIn = () => {
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateField = (name, value) => {
    const validations = {
      email: () => {
        if (!value.trim()) return "Email is Required *";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Enter a valid email address.';
        return '';
      },
      password: () => {
        if (!value.trim()) return "password is Required *";
        if (value.length < 6) return "Password must be at least 6 characters.";
        return '';
      }
    }

    return validations[name] ? validations[name]() : '';
  }

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setSignInData((prevData) => ({ ...prevData, [name]: value }));
    const validate = validateField(name, value);
    setErrors((prevErr) => ({ ...prevErr, [name]: validate }));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(signInData);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-200 py-4">
      {/* Sign In Title */}
      <h2 className="text-3xl font-semibold text-gray-800 mb-4 text-center tracking-wide">PropertyFy</h2>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8 space-y-6 border border-gray-400">
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email Input */}
          <FormInput
            label="Email"
            type="email"
            handleChange={handleChange}
            name="email"
            value={signInData.email}
            placeholder="Enter Email"
            required={false}
            id="email"
            icon="ri-mail-line"
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            handleChange={handleChange}
            value={signInData.password}
            placeholder="Enter Password"
            required={false}
            id="password"
            icon="ri-lock-password-fill"
          />

          {/* Forgot Password */}
          <div className="flex justify-end">
            <a href="/forgot-password" className="text-sm font-description text-black hover:underline">Forgot Password?</a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-dark text-white font-medium rounded-md focus:outline-none focus:ring hover:ring focus:ring-offset-2 hover:ring-offset-2 hover:ring-black focus:ring-black"
          >
            Login
            <i className="ri-login-circle-line ps-2"></i>
          </button>
        </form>
      </div>
    </div>
  );
};

const FormInput = React.memo(({ label, name, type, value, handleChange, placeholder, required, id, icon }) => (
  <div className="mb-2">
    <label htmlFor={label} className="label-style mb-1 font-description">{label}</label>
    <div className="relative">
      <input
        type={type}
        id={id}
        name={name}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
        className="input-style ps-8 py-2 font-description"
        required={required}
      />
      <i className={`${icon} absolute opacity-50 text-dark top-1/2 left-2 transform -translate-y-1/2`}></i>
    </div>
  </div>
))

export default SignIn;