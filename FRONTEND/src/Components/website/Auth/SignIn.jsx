import React from "react";

const SignIn = ({ isAnimating, onClose, onSwitchToSignUp }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // onSwitchToSignUp()
    // Add your sign-in logic here
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

      {/* Modal Body */}
      <div className="p-6">
        <form onSubmit={handleSubmit}>
          {/* Email Field */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-dark focus:border-dark text-gray-700"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Field */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-dark focus:border-dark text-gray-700"
              placeholder="Enter your password"
              required
            />
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
            <a
              href="#"
              className="text-sm text-dark hover:underline"
            >
              Forgot Password?
            </a>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 px-4 tracking-wide bg-dark text-white rounded-md focus:outline-none focus:ring hover:ring-2 focus:ring-offset-2 hover:ring-offset-2 hover:ring-black focus:ring-black"
          >
            Sign In
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

export default SignIn;