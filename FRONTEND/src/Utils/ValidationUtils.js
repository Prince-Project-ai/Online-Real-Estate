// validationUtils.js

export const validateField = (name, value, formData) => {
  const validations = {
    fullName: () => {
      if (!value.trim()) return 'Full name is required.';
      if (value.length < 3) return 'Full name must be at least 3 characters.';
    },
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
    crmPassword: () => {
      if (!value.trim()) return 'Confirm Password is required.';
      if (value !== formData.password) return 'Password does not match.';
      return '';
    },
    phoneNumber: () => {
      if (!value.trim()) return 'Phone number is required.';
      if (!/^[0-9]{10}$/.test(value)) return 'Enter a valid 10-digit phone number.';
      return '';
    },
    address: () => {
      if (!value.trim()) return 'Address is required.';
      if (value.length < 10) return 'Address must be at least 10 characters.';
      return '';
    },
  };

  return validations[name] ? validations[name]() : '';
};