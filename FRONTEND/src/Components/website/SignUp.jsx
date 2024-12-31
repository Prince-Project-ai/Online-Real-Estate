import React, { useCallback, useMemo, useState } from 'react';

const VALIDATION = {
  FULL_NAME: 'Full name must be above 7 characters',
  EMAIL: 'Invalid email address',
  PASSWORD: 'Password must be at least 8 characters',
  CFM_PASSWORD: 'Passwords do not match',
  PHONE: 'Phone number must be 10 digits',
  ADDRESS: 'Address cannot be empty',
};

const ROLES = ['user', 'seller', 'agent'];

const validateField = (name, value, password) => {
  switch (name) {
    case 'fullName':
      return value.trim().length > 7 ? null : VALIDATION.FULL_NAME;
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? null : VALIDATION.EMAIL;
    case 'password':
      return value.length >= 8 ? null : VALIDATION.PASSWORD;
    case 'cfmPassword':
      return value === password ? null : VALIDATION.CFM_PASSWORD;
    case 'phoneNumber':
      return /^\d{10}$/.test(value) ? null : VALIDATION.PHONE;
    case 'address':
      return value.trim() ? null : VALIDATION.ADDRESS;
    default:
      return null;
  }
};

const SignUp = ({ isAnimating, onClose, onSwitchToSignIn, onSubmit }) => {
  const [role, setRole] = useState('user');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    cfmPassword: '',
    phoneNumber: '',
    address: '',
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (touched[name]) {
      const error = validateField(name, value, name === 'cfmPassword' ? formData.password : null);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  }, [touched, formData.password]);

  const handleBlur = useCallback((event) => {
    const { name, value } = event.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value, name === 'cfmPassword' ? formData.password : null);
    setErrors(prev => ({ ...prev, [name]: error }));
  }, [formData.password]);

  const isValid = useMemo(() => {
    return Object.keys(formData).every(key => {
      const error = validateField(key, formData[key], formData.password);
      return !error;
    });
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(formData).forEach(key => {
      newErrors[key] = validateField(key, formData[key], formData.password);
    });

    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));

    if (isValid && onSubmit) {
      setIsSubmitting(true);
      try {
        console.log({ ...formData, role });
      } catch (error) {
        console.error('Submission error:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className={`bg-white rounded-2xl shadow-lg max-w-2xl w-full relative ${isAnimating ? 'close' : 'open'}`}>
      <div className="p-6 py-3 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-dark">Create Account</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">✕</button>
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
            >
              <i className={`ri-${roleType === "user" ? "user" : roleType === "seller" ? "building-2" : "user-settings"}-fill text-2xl`} />
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
              error={errors.fullName}
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <FormInput
              label="Email"
              name="email"
              type="email"
              icon="mail"
              error={errors.email}
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <FormInput
              label="Password"
              name="password"
              type="password"
              icon="lock"
              error={errors.password}
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <FormInput
              label="Confirm Password"
              name="cfmPassword"
              type="password"
              icon="lock"
              error={errors.cfmPassword}
              value={formData.cfmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <FormInput
              label="Phone Number"
              name="phoneNumber"
              type="tel"
              icon="phone"
              error={errors.phoneNumber}
              value={formData.phoneNumber}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
            <FormInput
              label="Address"
              name="address"
              type="text"
              icon="map-pin"
              error={errors.address}
              value={formData.address}
              onChange={handleChange}
              onBlur={handleBlur}
              required
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting || !isValid}
            className="w-full py-2 px-4 tracking-wide bg-dark text-white rounded-md focus:outline-none focus:ring hover:ring-2 focus:ring-offset-2 hover:ring-offset-2 hover:ring-black focus:ring-black disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <i className="ri-user-add-line mr-2" />
            {isSubmitting ? 'Creating Account...' : 'Create Account'}
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
  error,
  onChange,
  onBlur,
  name
}) => (
  <div>
    <label className="block text-sm font-description font-medium text-gray-700 mb-1">
      {label}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
    <div className="relative">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
        <i className={`ri-${icon}-line ${error ? 'text-red-500' : 'text-gray-500'}`} />
      </span>
      <input
        type={type}
        value={value}
        name={name}
        onChange={onChange}
        onBlur={onBlur}
        required={required}
        className={`w-full ${error
            ? 'border-red-500 border-2 focus:ring-1 focus:ring-red-500 focus:border-red-500 focus:ring-offset-2'
            : 'border-gray-300 focus:ring-1 focus:ring-dark focus:border-dark focus:ring-offset-2'
          } font-description pl-10 px-4 py-2.5 border rounded-lg outline-none transition-shadow`}
      />
    </div>
    {error && (
      <p className="mt-1 text-sm text-red-500">{error}</p>
    )}
  </div>
));

export default React.memo(SignUp);