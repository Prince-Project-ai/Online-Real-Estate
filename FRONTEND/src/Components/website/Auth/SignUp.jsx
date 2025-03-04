import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { signUpApi } from '../../../Api/website/HandleUserApi';
import { useMessage } from '../../../Contexts/MessageContext';
import Spinner from '../../core/Spinner';
import { validateField } from '../../../Utils/ValidationUtils'; // Import the validation utility

const ROLES = ['User', 'Seller'];

const SignUp = ({ isAnimating, onClose, onSwitchToSignIn }) => {
  const { showToast } = useMessage();

  const [role, setRole] = useState('User');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    crmPassword: '',
    phoneNumber: '',
    address: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    setFormData((prev) => ({ ...prev, role }));
  }, [role]);

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
      const error = validateField(name, value, formData); // Use the imported validation function
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
    },
    [formData]
  );

  const isFormValid = useMemo(() => {
    return (
      Object.values(formData).every((value) => value.trim()) &&
      Object.values(errors).every((error) => !error)
    );
  }, [formData, errors]);




  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required.`;
      } else {
        const error = validateField(key, value, formData); // Use the imported validation function
        if (error) newErrors[key] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      Object.values(newErrors).forEach((errorMessage) => showToast(errorMessage, 'error'));
      setIsLoading(false);
      return;
    }

    try {
      const response = await signUpApi(formData);
      console.log(response);
      if (response?.success) {
        showToast(response?.message, "success");
        onSwitchToSignIn();
        setFormData({
          fullName: '',
          email: '',
          password: '',
          crmPassword: '',
          phoneNumber: '',
          address: '',
        });
      }
      setErrors({});

    } catch (error) {
      showToast(error?.response?.data?.message || error?.message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const roleButtons = useMemo(
    () =>
      ROLES.map((roleType) => (
        <button
          key={roleType}
          type="button"
          onClick={() => setRole(roleType)}
          className={`p-4 border-2 hover:border-dark flex flex-col items-center gap-2 rounded-lg transition-all ${role === roleType ? 'bg-dark text-white shadow-lg' : 'bg-white text-gray-600 hover:bg-gray-100'
            }`}
          aria-pressed={role === roleType}
        >
          <i
            className={`ri-${roleType === 'User' ? 'user' : roleType === 'Seller' ? 'building-2' : 'user-settings'
              }-fill text-2xl`}
          />
          <span className="capitalize">{roleType}</span>
        </button>
      )),
    [role]
  );

  return (
    <div className={`bg-white rounded-2xl shadow-lg max-w-2xl w-full relative ${isAnimating ? 'close' : 'open'}`}>
      <div className="p-6 py-3 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-dark">Create Account</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="Close">
            ✕
          </button>
        </div>
      </div>

      <div className="p-2 border-b border-gray-200 bg-gray-50">
        <div className="grid grid-cols-3 gap-2">{roleButtons}</div>
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
              error={errors.fullName}
              required
            />
            <FormInput
              label="Email"
              name="email"
              type="email"
              icon="mail"
              value={formData.email}
              error={errors.email}
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
              error={errors.password}
              required
            />
            <FormInput
              label="Confirm Password"
              name="crmPassword"
              type="password"
              icon="lock"
              value={formData.crmPassword}
              onChange={handleChange}
              error={errors.crmPassword}
              required
            />
            <FormInput
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              icon="phone"
              value={formData.phoneNumber}
              onChange={handleChange}
              error={errors.phoneNumber}
              required
            />
            <FormInput
              label="Address"
              name="address"
              type="text"
              icon="map-pin"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
              required
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="w-full py-2 px-4 tracking-wide justify-center items-center bg-dark text-white rounded-md focus:outline-none flex focus:ring hover:ring-2 focus:ring-offset-2 hover:ring-offset-2 hover:ring-black focus:ring-black disabled:cursor-not-allowed"
          >
            {isLoading ? <Spinner /> : (
              <>
                <i className="ri-user-add-line mr-2" /> Create Account
              </>
            )}
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

const FormInput = React.memo(({ label, type, icon, required, value, onChange, error, name }) => (
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
        className={`w-full border-gray-300 font-description pl-10 border px-4 py-2.5 rounded-lg outline-none transition-shadow ${error ? 'border-red-500 focus:ring-2 focus:ring-red-500 focus:border-red-500 focus:ring-offset-2' : 'focus:ring-2 focus:ring-dark focus:border-dark focus:ring-offset-2'
          }`}
      />
    </div>
    {error && <p className="mt-1 text-sm font-description text-red-500">{error}</p>}
  </div>
));

export default React.memo(SignUp);