import React, { useCallback, useEffect, useState } from "react";
import { AdminSignIn } from "../../Api/dashboard/HandleAdminApi";
import Spinner from "../../Components/core/Spinner";
import { useMessage } from "../../Contexts/MessageContext";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "../../Contexts/ADMIN/AdminAuthContext";

const SignIn = () => {
  const navigate = useNavigate();
  const { showToast } = useMessage();
  const { setIsAdminAuthenticated,setAdminInfo } = useAdminAuth();
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
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

  const isFormValid = useCallback(() => {
    return Object.values(errors).every(error => error === '') &&
      signInData.email.trim() !== '' &&
      signInData.password.trim() !== '';
  }, [errors, signInData]);

  useEffect(() => {
    setIsDisabled(!isFormValid());
  }, [isFormValid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setIsLoading(true);
    try {
      const signRes = await AdminSignIn(signInData, showToast);
      if (signRes?.data?.success) {
        showToast(signRes?.data?.message, "success");
        setIsAdminAuthenticated(true);
        console.log(signRes?.data);   
        setAdminInfo(signRes?.data?.data);
        navigate("/dashboard");
      }
    } catch (error) {
      showToast(error?.response?.data?.message || error?.message, "error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-4">
      {/* Sign In Title */}
      <h2 className="text-3xl font-heading text-gray-800 mb-4 text-center tracking-wide">PropertyFy</h2>
      <p className="mb-2 text-2xl font-description">Welcome back, Admin</p>

      {/* Card */}
      <div className="w-full max-w-md bg-white rounded-lg p-8 space-y-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2 text-center pb-2 tracking-wider border-b-2 border-dark font-description">Sign In</h2>
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
            error={errors.email}
            id="email"
            icon="ri-mail-line"
          />
          <FormInput
            label="Password"
            type="password"
            name="password"
            handleChange={handleChange}
            value={signInData.password}
            error={errors.password}
            placeholder="Enter Password"
            required={false}
            id="password"
            icon="ri-lock-password-fill"
          />

          {/* Forgot Password */}
          <div className="flex justify-end">
            <a href="/forgot-password" className="text-sm font-description text-black hover:underline">Reset Password ?</a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isDisabled}
            className={`${isDisabled ? 'cursor-not-allowed' : 'cursor-pointer'} w-full py-2 px-4 bg-dark text-white font-medium rounded-lg font-description tracking-wider focus:outline-none focus:ring hover:ring focus:ring-offset-2 hover:ring-offset-2 hover:ring-black focus:ring-black`}
          >
            {isLoading ? <Spinner /> : <>Login
              <i className="ri-login-circle-line ps-2"></i></>}
          </button>
        </form>
      </div>
    </div>
  );
};

const FormInput = React.memo(({ label, name, type, value, error, handleChange, placeholder, required, id, icon }) => (
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
        className={`w-full placeholder-gray-500 focus:bg-white border outline-none rounded-lg bg-secondary ps-8 py-2 ${error ? 'focus:border-red-500 focus:border-2' : 'focus:border-dark focus:border-2'} font-description tracking-wide`}

        required={required}
      />
      <i className={`${icon} absolute opacity-50 text-dark top-1/2 left-2 transform -translate-y-1/2`}></i>
    </div>
    {
      (error) && (<p className="text-xs text-red-500 font-semibold">{error}</p>)
    }
  </div>
))

export default SignIn;